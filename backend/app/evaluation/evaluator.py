"""
Core RAG Evaluation Pipeline Orchestrator.

Combines retrieval, response generation, and multi-agent grading
(Relevance, Accuracy, and Hallucination) into an automated, async pipeline.
"""

import asyncio
import logging
import os
from typing import Any, Dict, List, Optional

import httpx

from services.retrieval_service import RetrievalService
from app.evaluation.relevance_judge import evaluate_relevance
from app.evaluation.accuracy_judge import evaluate_accuracy
from app.evaluation.hallucination_judge import evaluate_hallucinations

logger = logging.getLogger("llm_evaluation")

# ---------------------------------------------------------------------------
# Generation Prompt Template
# ---------------------------------------------------------------------------
RAG_GENERATION_PROMPT = """You are a helpful and precise assistant. Use the provided context documents to answer the user question.
If the answer is not supported by the context, respond that you do not know. Do not invent any facts.

Context:
{context}

Question:
{question}

Answer:"""

# ---------------------------------------------------------------------------
# Helper: Simulated Local Answer Generator
# ---------------------------------------------------------------------------
def _simulate_answer_generation(question: str, retrieved_chunks: List[str]) -> str:
    """
    Fallback local simulator to generate responses based on retrieved context chunks.
    Finds the sentences in the context chunks that contain keywords from the question.
    """
    logger.info("[EVALUATOR] Running simulated local RAG answer generation fallback.")
    
    if not retrieved_chunks:
        return "I do not know the answer as no context chunks were retrieved."
        
    q_words = {w.lower() for w in question.split() if len(w) > 3 and w.isalnum()}
    
    # Extract sentences from chunks
    sentences = []
    for chunk in retrieved_chunks:
        for sent in chunk.split("."):
            s_clean = sent.strip()
            if len(s_clean) > 10:
                sentences.append(s_clean)
                
    # Rank sentences by keyword match
    matching_sentences = []
    for sent in sentences:
        matches = sum(1 for w in q_words if w in sent.lower())
        if matches > 0:
            matching_sentences.append((matches, sent))
            
    matching_sentences.sort(key=lambda x: x[0], reverse=True)
    
    if matching_sentences:
        # Take the top matching sentences and join them
        selected = [item[1] for item in matching_sentences[:2]]
        return ". ".join(selected) + "."
        
    # If no specific matches, return the first part of the first chunk
    return retrieved_chunks[0].split(".")[0] + "."

# ---------------------------------------------------------------------------
# Async Answer Generation
# ---------------------------------------------------------------------------
async def generate_rag_answer(question: str, retrieved_chunks: List[str]) -> str:
    """
    Generate an answer using retrieved chunks and LLM, falling back to local simulation.
    """
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    hf_key = os.getenv("HUGGINGFACE_API_KEY")
    
    valid_chunks = [c.strip() for c in retrieved_chunks if c and c.strip()]
    if valid_chunks:
        context = "\n\n".join([f"Document chunk {i+1}:\n{chunk}" for i, chunk in enumerate(valid_chunks)])
    else:
        context = "No context available."
        
    prompt = RAG_GENERATION_PROMPT.format(context=context, question=question)
    
    # Google Gemini API Call
    if gemini_key:
        try:
            logger.info("[EVALUATOR] Generating answer via Gemini API...")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{"parts": [{"text": prompt}]}]
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(url, json=payload, headers=headers)
                res.raise_for_status()
                res_data = res.json()
                return res_data["candidates"][0]["content"]["parts"][0]["text"].strip()
        except Exception as exc:
            logger.error("[EVALUATOR] Gemini API generation failed: %s", exc)
            
    # OpenAI API Call
    elif openai_key:
        try:
            logger.info("[EVALUATOR] Generating answer via OpenAI API...")
            url = "https://api.openai.com/v1/chat/completions"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {openai_key}"
            }
            payload = {
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.2
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(url, json=payload, headers=headers)
                res.raise_for_status()
                res_data = res.json()
                return res_data["choices"][0]["message"]["content"].strip()
        except Exception as exc:
            logger.error("[EVALUATOR] OpenAI API generation failed: %s", exc)
            
    # Hugging Face Inference API Call
    elif hf_key:
        try:
            logger.info("[EVALUATOR] Generating answer via Hugging Face Inference API...")
            model_id = os.getenv("HUGGINGFACE_MODEL_ID", "mistralai/Mistral-7B-Instruct-v0.3")
            url = f"https://api-inference.huggingface.co/models/{model_id}"
            headers = {
                "Authorization": f"Bearer {hf_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "inputs": prompt,
                "parameters": {"max_new_tokens": 256, "return_full_text": False}
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(url, json=payload, headers=headers)
                res.raise_for_status()
                res_data = res.json()
                
                if isinstance(res_data, list) and len(res_data) > 0:
                    return res_data[0].get("generated_text", "").strip()
                else:
                    return res_data.get("generated_text", "").strip()
        except Exception as exc:
            logger.error("[EVALUATOR] Hugging Face API generation failed: %s", exc)
            
    # Fallback Simulated Generator
    return _simulate_answer_generation(question, retrieved_chunks)

# ---------------------------------------------------------------------------
# Core Pipeline Execution
# ---------------------------------------------------------------------------
async def evaluate_rag_pipeline(
    question: str,
    reference_answer: Optional[str] = None
) -> Dict[str, Any]:
    """
    Orchestrate full evaluation pipeline.
    
    1. Retrieve chunks from ChromaDB.
    2. Generate RAG response answer.
    3. Concurrently evaluate Relevance, Accuracy, and Hallucinations.
    4. Combine all outputs and return a unified dictionary.
    """
    logger.info("[EVALUATOR] Starting evaluation pipeline execution for query: %s", question)
    
    # 1. Retrieve chunks from ChromaDB
    retrieved_chunks = []
    try:
        retret = RetrievalService()
        # search is a synchronous call in RetrievalService, run in executor thread
        search_res = await asyncio.to_thread(retret.search, question, top_k=3)
        results = search_res.get("results", [])
        retrieved_chunks = [c.chunk_text for c in results]
        logger.info("[EVALUATOR] Successfully retrieved %d context chunks", len(retrieved_chunks))
    except Exception as exc:
        logger.error("[EVALUATOR] Retrieval step failed: %s", exc)
        retrieved_chunks = []
        
    # 2. Generate RAG answer response
    try:
        response_answer = await generate_rag_answer(question, retrieved_chunks)
        logger.info("[EVALUATOR] Response generated: %.80s...", response_answer)
    except Exception as exc:
        logger.error("[EVALUATOR] Generation step failed: %s", exc)
        response_answer = "Error generating response answer."
        
    # 3. Setup parallel judge evaluations
    async def run_relevance():
        try:
            return await evaluate_relevance(question, response_answer)
        except Exception as e:
            logger.error("[EVALUATOR] Relevance Agent run failed: %s", e)
            return {"agent": "Relevance Judge", "score": 3, "reason": f"Evaluation error: {str(e)}"}
            
    async def run_accuracy():
        try:
            return await evaluate_accuracy(
                question=question,
                llm_response=response_answer,
                reference_answer=reference_answer,
                retrieved_chunks=retrieved_chunks
            )
        except Exception as e:
            logger.error("[EVALUATOR] Accuracy Agent run failed: %s", e)
            return {"agent": "Accuracy Judge", "score": 3, "reason": f"Evaluation error: {str(e)}", "supporting_evidence": "N/A"}
            
    async def run_hallucination():
        try:
            return await evaluate_hallucinations(
                llm_response=response_answer,
                retrieved_chunks=retrieved_chunks,
                question=question,
                reference_answer=reference_answer
            )
        except Exception as e:
            logger.error("[EVALUATOR] Hallucination Agent run failed: %s", e)
            return {"agent": "Hallucination Judge", "hallucination": False, "unsupported_claims": []}
            
    # 4. Gather evaluations concurrently
    relevance_res, accuracy_res, hallucination_res = await asyncio.gather(
        run_relevance(),
        run_accuracy(),
        run_hallucination()
    )
    
    # 5. Build combined response payload
    combined_result = {
        "question": question,
        "response": response_answer,
        "relevance": relevance_res,
        "accuracy": accuracy_res,
        "hallucination": hallucination_res
    }
    
    logger.info("[EVALUATOR] Pipeline evaluation complete.")
    return combined_result
