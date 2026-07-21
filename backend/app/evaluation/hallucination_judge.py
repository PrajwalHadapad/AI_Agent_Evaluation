"""
Hallucination Detection Judge Agent Module.

Segments the generated AI response into discrete factual claims and compares
each claim against the retrieved knowledge context chunks.
"""

import json
import logging
import os
import re
from typing import Any, Dict, List, Optional

import httpx

logger = logging.getLogger("llm_evaluation")

# ---------------------------------------------------------------------------
# Prompt Templates
# ---------------------------------------------------------------------------
HALLUCINATION_PROMPT_TEMPLATE = """You are an expert AI evaluator. Your job is to act as a Hallucination Judge.
You must analyze the generated AI response, split it into distinct factual claims, and verify if each claim is supported by the provided context chunks.

Retrieved Context Chunks:
{context}

AI Response to evaluate:
{llm_response}

Instructions:
1. Split the AI Response into discrete, atomic factual claims.
2. For each claim, check if it is supported by the Retrieved Context Chunks.
3. If a claim is supported by the context, mark it as Supported.
4. If a claim is NOT supported by the context (either because it is not mentioned or because it is contradicted by the context), mark it as Unsupported.
5. Set the overall "hallucination" flag to true if there is AT LEAST ONE Unsupported claim, otherwise set it to false.
6. List all Unsupported claims in the "unsupported_claims" array. If all claims are supported, this array should be empty.
7. For each unsupported claim, provide:
   - "claim": The specific sentence or statement that is unsupported.
   - "reason": A detailed explanation of why it is unsupported (e.g., missing facts, contradictory numbers, general hallucination).
   - "evidence": Excerpts or reference points searched in the context, or "No matching reference context found."
8. Never invent evidence. Only rely on the supplied Retrieved Context Chunks.

You must return ONLY a valid JSON object, with no other text, markdown formatting, or HTML. The JSON must have the following keys:
- "agent": "Hallucination Judge"
- "hallucination": <true or false>
- "unsupported_claims": [
      {{
         "claim": "<the unsupported claim>",
         "reason": "<why it is unsupported>",
         "evidence": "<context search result or contradiction detail>"
      }}
  ]

JSON:"""

# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------
def _parse_json_response(text: str) -> Dict[str, Any]:
    """Parse the raw text response from the LLM into structured JSON."""
    text = text.strip()
    
    # Strip markdown code blocks if present
    if text.startswith("```"):
        lines = text.splitlines()
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
        
    try:
        data = json.loads(text)
        if not isinstance(data, dict):
            raise ValueError("Parsed output is not a JSON object")
            
        data["agent"] = "Hallucination Judge"
        
        # Ensure hallucination is a boolean
        if "hallucination" not in data:
            data["hallucination"] = False
        else:
            data["hallucination"] = bool(data["hallucination"])
            
        # Ensure unsupported_claims is a list
        if "unsupported_claims" not in data:
            data["unsupported_claims"] = []
        elif not isinstance(data["unsupported_claims"], list):
            data["unsupported_claims"] = []
            
        # Standardize claims structure
        for claim_obj in data["unsupported_claims"]:
            if not isinstance(claim_obj, dict):
                continue
            if "claim" not in claim_obj:
                claim_obj["claim"] = "Unknown claim"
            if "reason" not in claim_obj:
                claim_obj["reason"] = "No reason provided by evaluator model."
            if "evidence" not in claim_obj:
                claim_obj["evidence"] = "No matching context found."
                
        return data
    except Exception as exc:
        logger.error("[HALLUCINATION_JUDGE] Failed to parse LLM JSON response: %s. Raw text: %s", exc, text)
        raise ValueError(f"Invalid JSON format returned by LLM: {exc}") from exc


def _clean_word(w: str) -> str:
    """Helper to clean a word of leading/trailing non-alphanumeric punctuation."""
    return re.sub(r'^\W+|\W+$', '', w).lower()


def _simulate_hallucination_evaluation(
    llm_response: str,
    retrieved_chunks: List[str],
    question: Optional[str] = None,
    reference_answer: Optional[str] = None
) -> Dict[str, Any]:
    """
    Fallback simulation mode when no external LLM API keys are configured.
    Checks each sentence of the response for keyword overlap against the combined chunks,
    ignoring keywords that are part of the user's question.
    """
    logger.info("[HALLUCINATION_JUDGE] Running hallucination judge in SIMULATED fallback mode.")
    
    resp_text = llm_response.strip()
    
    if not resp_text:
        return {
            "agent": "Hallucination Judge",
            "hallucination": False,
            "unsupported_claims": []
        }
        
    # Aggregate retrieved chunks and reference answer
    context_sources = list(retrieved_chunks)
    if reference_answer and reference_answer.strip():
        context_sources.append(reference_answer)
    context_text = "\n".join(context_sources).lower().strip()
    
    # Split response into sentences (factual claims)
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', resp_text) if s.strip()]
    
    # Standard stopwords
    stopwords = {
        "what", "is", "the", "of", "in", "and", "a", "to", "for", "on", "with", "as", "by", 
        "at", "an", "this", "that", "how", "why", "where", "who", "which", "are", "do", "does", "it"
    }
    
    q_words = { _clean_word(w) for w in (question or "").split() }
    q_words = { w for w in q_words if w and w not in stopwords }
    
    unsupported_claims = []
    
    for idx, sentence in enumerate(sentences):
        # Extract keywords
        s_words = { _clean_word(w) for w in sentence.split() }
        s_words = { w for w in s_words if w and w not in stopwords }
        if not s_words:
            continue
            
        # Ignore keywords that are already part of the user's question, as repeating the question 
        # is not a hallucinated assertion. Any new assertions must be backed by retrieved context.
        new_assertions = {w for w in s_words if w not in q_words}
        if not new_assertions:
            continue
            
        missing_keywords = [w for w in new_assertions if w not in context_text]
        
        # Heuristic: if any new keyword assertions are missing from the retrieved context, mark as unsupported
        if missing_keywords and len(sentence) > 10:
            unsupported_claims.append({
                "claim": sentence,
                "reason": f"[Simulated] Fails support check. Factual assertion term(s) ({', '.join(missing_keywords[:3])}) were not found in the retrieved context.",
                "evidence": "No matching text found in retrieved chunks."
            })
            
    has_hallucinations = len(unsupported_claims) > 0
    
    return {
        "agent": "Hallucination Judge",
        "hallucination": has_hallucinations,
        "unsupported_claims": unsupported_claims
    }

# ---------------------------------------------------------------------------
# Public Async API Entrypoint
# ---------------------------------------------------------------------------
async def evaluate_hallucinations(
    llm_response: str,
    retrieved_chunks: List[str],
    question: Optional[str] = None,
    reference_answer: Optional[str] = None
) -> Dict[str, Any]:
    """
    Asynchronously evaluates if the AI response contains hallucinated claims.
    
    Compares factual statements against retrieved context chunks using LLM
    or local keyword simulation if offline.
    """
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    hf_key = os.getenv("HUGGINGFACE_API_KEY")
    
    # 1. Format context chunks
    cleaned_chunks = []
    if reference_answer and reference_answer.strip():
        cleaned_chunks.append(f"Reference Answer (Gold Standard):\n{reference_answer.strip()}")

    for c in retrieved_chunks:
        if not c or not c.strip():
            continue
        # Extract the Answer part if present
        match = re.search(r'Answer:\s*(.*)', c, re.IGNORECASE | re.DOTALL)
        if match:
            cleaned_chunks.append(match.group(1).strip())
        else:
            cleaned_chunks.append(c.strip())
            
    if cleaned_chunks:
        context = "\n\n".join([f"Chunk {i+1}:\n{chunk}" for i, chunk in enumerate(cleaned_chunks)])
        # Update retrieved_chunks list for simulated fallback routing
        retrieved_chunks = cleaned_chunks
    else:
        context = "No retrieved context documents available."
        
    prompt = HALLUCINATION_PROMPT_TEMPLATE.format(
        context=context,
        llm_response=llm_response
    )
    
    # 2. Google Gemini API Call
    if gemini_key:
        try:
            logger.info("[HALLUCINATION_JUDGE] Routing evaluation to Gemini API...")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"responseMimeType": "application/json"}
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(url, json=payload, headers=headers)
                res.raise_for_status()
                res_data = res.json()
                text = res_data["candidates"][0]["content"]["parts"][0]["text"]
                return _parse_json_response(text)
        except Exception as exc:
            logger.error("[HALLUCINATION_JUDGE] Gemini API evaluation failed: %s", exc)
            raise RuntimeError(f"Gemini API execution failed: {exc}") from exc
            
    # 3. OpenAI API Call
    elif openai_key:
        try:
            logger.info("[HALLUCINATION_JUDGE] Routing evaluation to OpenAI API...")
            url = "https://api.openai.com/v1/chat/completions"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {openai_key}"
            }
            payload = {
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"},
                "temperature": 0.0
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(url, json=payload, headers=headers)
                res.raise_for_status()
                res_data = res.json()
                text = res_data["choices"][0]["message"]["content"]
                return _parse_json_response(text)
        except Exception as exc:
            logger.error("[HALLUCINATION_JUDGE] OpenAI API evaluation failed: %s", exc)
            raise RuntimeError(f"OpenAI API execution failed: {exc}") from exc
            
    # 4. Hugging Face Inference API Call
    elif hf_key:
        try:
            logger.info("[HALLUCINATION_JUDGE] Routing evaluation to Hugging Face Inference API...")
            model_id = os.getenv("HUGGINGFACE_MODEL_ID", "mistralai/Mistral-7B-Instruct-v0.3")
            url = f"https://api-inference.huggingface.co/models/{model_id}"
            headers = {
                "Authorization": f"Bearer {hf_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_new_tokens": 512,
                    "return_full_text": False
                }
            }
            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(url, json=payload, headers=headers)
                res.raise_for_status()
                res_data = res.json()
                
                if isinstance(res_data, list) and len(res_data) > 0:
                    text = res_data[0].get("generated_text", "")
                else:
                    text = res_data.get("generated_text", "")
                    
                return _parse_json_response(text)
        except Exception as exc:
            logger.error("[HALLUCINATION_JUDGE] Hugging Face API evaluation failed: %s", exc)
            raise RuntimeError(f"Hugging Face Inference API execution failed: {exc}") from exc
            
    # 5. Fallback Simulated Hallucination Judge
    else:
        return _simulate_hallucination_evaluation(llm_response, retrieved_chunks, question, reference_answer)
