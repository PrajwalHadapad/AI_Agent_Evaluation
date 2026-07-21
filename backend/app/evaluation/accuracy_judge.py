"""
Accuracy Judge Agent Module.

Evaluates the accuracy of an LLM-generated response against provided evidence
(either a reference answer or retrieved chunks) on a 1-5 scale.
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
ACCURACY_PROMPT_TEMPLATE = """You are an expert AI evaluator. Your job is to act as an Accuracy Judge.
You must evaluate the accuracy of the generated AI response solely based on the provided evidence.

Provided Evidence:
{evidence}

User Question: {question}
AI Response: {llm_response}

Instructions:
1. Compare the AI response against the provided evidence.
2. Determine if the AI response contains any hallucinations, contradictions, or unverified claims relative to the evidence.
3. Never invent or assume facts. Only verify claims directly using the provided evidence.
4. Score the response from 1 to 5 based on the following scale:
   - 1 = Completely inaccurate (The response directly contradicts the provided evidence or is completely unsupported/hallucinated).
   - 2 = Mostly inaccurate (The response is largely unsupported by the evidence and contains severe hallucinations).
   - 3 = Partially accurate (The response contains some correct facts from the evidence but also contains unverified details or minor contradictions).
   - 4 = Mostly accurate (The response is mostly supported by the evidence with only minor unverified details).
   - 5 = Fully accurate (The response is completely supported by the provided evidence, with zero invented information or contradictions).

You must return ONLY a valid JSON object, with no other text, markdown formatting, or HTML. The JSON must have the following keys:
- "agent": "Accuracy Judge"
- "score": <an integer from 1 to 5>
- "reason": "<a detailed explanation of the score, analyzing which parts of the response are accurate or inaccurate relative to the evidence>"
- "supporting_evidence": "<sentences or excerpts from the provided evidence that support or contradict the AI response>"

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
            
        data["agent"] = "Accuracy Judge"
        
        # Validate score and clamp to 1-5
        score_val = data.get("score", 5)
        try:
            clamped_score = max(1, min(5, int(score_val)))
            data["score"] = clamped_score
        except (ValueError, TypeError):
            data["score"] = 5
            
        # Ensure other fields exist
        if "reason" not in data or not str(data["reason"]).strip():
            data["reason"] = "No reason provided by evaluator model."
        if "supporting_evidence" not in data or not str(data["supporting_evidence"]).strip():
            data["supporting_evidence"] = "No supporting evidence extracted by evaluator model."
            
        return data
    except Exception as exc:
        logger.error("[ACCURACY_JUDGE] Failed to parse LLM JSON response: %s. Raw text: %s", exc, text)
        raise ValueError(f"Invalid JSON format returned by LLM: {exc}") from exc


def _clean_word(w: str) -> str:
    """Helper to clean a word of leading/trailing non-alphanumeric punctuation."""
    return re.sub(r'^\W+|\W+$', '', w).lower()


def _simulate_accuracy_evaluation(
    question: str,
    llm_response: str,
    evidence: str
) -> Dict[str, Any]:
    """
    Fallback simulation mode when no external LLM API keys are configured.
    Evaluates response accuracy using keyword overlap and sentence-level similarity heuristics,
    taking into account repeating terms from the user's question.
    """
    logger.info("[ACCURACY_JUDGE] Running accuracy judge in SIMULATED fallback mode.")
    
    resp_text = llm_response.strip().lower()
    ev_text = evidence.strip().lower()
    
    if not resp_text or not ev_text:
        return {
            "agent": "Accuracy Judge",
            "score": 1,
            "reason": "[Simulated] The evaluation failed because either the response or the provided evidence was empty.",
            "supporting_evidence": "None (No evidence provided)"
        }
        
    # Segment evidence into sentences to extract supporting claims
    evidence_sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', evidence) if s.strip()]
    
    # Calculate word overlap
    stopwords = {
        "what", "is", "the", "of", "in", "and", "a", "to", "for", "on", "with", "as", "by", 
        "at", "an", "this", "that", "how", "why", "where", "who", "which", "are", "do", "does", "it"
    }
    
    resp_words = { _clean_word(w) for w in resp_text.split() }
    resp_words = { w for w in resp_words if w and w not in stopwords }
    
    q_words = { _clean_word(w) for w in question.split() }
    q_words = { w for w in q_words if w and w not in stopwords }
    
    # Extract only new factual assertions in the response that were not part of the question
    new_assertions = {w for w in resp_words if w not in q_words}
    
    # Heuristics for score and supporting sentences
    matching_sentences = []
    
    for sentence in evidence_sentences:
        s_words = { _clean_word(w) for w in sentence.split() }
        s_words = { w for w in s_words if w and w not in stopwords }
        if not s_words or not resp_words:
            continue
        overlap = resp_words.intersection(s_words)
        ratio = len(overlap) / len(resp_words)
        
        # If there's overlap, keep it as potential evidence
        if len(overlap) > 0:
            matching_sentences.append((sentence, ratio))
            
    # Sort matching sentences by their overlap ratio descending
    matching_sentences.sort(key=lambda x: x[1], reverse=True)
    
    # Calculate overall keyword overlap ratio against entire evidence
    ev_words = { _clean_word(w) for w in ev_text.split() }
    ev_words = { w for w in ev_words if w and w not in stopwords }
    
    if not resp_words:
        overall_overlap_ratio = 1.0
    elif not new_assertions:
        # If there are no new assertions, the response only repeats the question
        overall_overlap_ratio = 0.0
    else:
        overall_overlap_ratio = len(new_assertions.intersection(ev_words)) / len(new_assertions)
        
    # Heuristic scoring based on overall overlap
    if len(llm_response.strip()) < 15:
        if overall_overlap_ratio == 1.0:
            score = 5
            reason = "The brief response is fully accurate and supported by the reference evidence."
            supporting_evidence = ". ".join([s[0] for s in matching_sentences[:1]]) if matching_sentences else "Evidence matched."
        else:
            score = 2
            reason = "The response is too brief and lacks sufficient factual overlap with the evidence."
            supporting_evidence = "Insufficient text for mapping."
    elif resp_words and not new_assertions:
        score = 2
        reason = "The response only repeats the question without introducing any new factual details."
        supporting_evidence = "No new facts introduced."
    elif overall_overlap_ratio == 0:
        score = 1
        reason = "The generated response has absolutely no factual overlap with the provided evidence, suggesting a complete hallucination."
        supporting_evidence = "None (No matching facts found in the reference evidence)"
    elif overall_overlap_ratio < 0.35:
        score = 2
        reason = "The response contains critical unsupported assertions or has very low factual alignment with the reference evidence."
        supporting_evidence = "None (Low keyword matching)"
    elif overall_overlap_ratio < 0.70:
        score = 3
        reason = "The response is partially accurate, containing some details supported by the evidence, but some claims remain unverified."
        supporting_evidence = ". ".join([s[0] for s in matching_sentences[:2]])
    elif overall_overlap_ratio < 1.0:
        score = 4
        reason = "The response is mostly accurate and aligns closely with the provided evidence, with minor details omitted or unverified."
        supporting_evidence = ". ".join([s[0] for s in matching_sentences[:3]])
    else:
        score = 5
        reason = "The response is fully accurate, factual, and strictly supported by the provided reference evidence with no hallucinations."
        supporting_evidence = ". ".join([s[0] for s in matching_sentences[:3]])
        
    # Final cleanup of supporting evidence if empty
    if not supporting_evidence.strip():
        supporting_evidence = "No specific matching sentences could be extracted, though general topic terms match."
        
    return {
        "agent": "Accuracy Judge",
        "score": score,
        "reason": f"[Simulated Evaluation] {reason}",
        "supporting_evidence": f"[Simulated Evidence] {supporting_evidence}"
    }

# ---------------------------------------------------------------------------
# Public Async API Entrypoint
# ---------------------------------------------------------------------------
async def evaluate_accuracy(
    question: str,
    llm_response: str,
    reference_answer: Optional[str] = None,
    retrieved_chunks: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Asynchronously evaluates the accuracy of an LLM response relative to provided evidence.
    
    Uses reference_answer if provided, otherwise aggregates retrieved_chunks.
    Queries active LLM APIs (Gemini, OpenAI, Hugging Face) or falls back to simulation.
    """
    # 1. Format the provided evidence
    if reference_answer and reference_answer.strip():
        evidence = f"Reference Answer (Gold Standard):\n{reference_answer.strip()}"
    elif retrieved_chunks:
        # Filter empty chunks and extract answer text if structured as Question/Answer
        cleaned_chunks = []
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
            evidence = "Retrieved Context Documents:\n" + "\n\n".join(
                [f"Chunk {i+1}: {chunk}" for i, chunk in enumerate(cleaned_chunks)]
            )
        else:
            evidence = "No matching reference answer or knowledge documents retrieved."
    else:
        evidence = "No reference answer or knowledge documents provided."
        
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    hf_key = os.getenv("HUGGINGFACE_API_KEY")
    
    prompt = ACCURACY_PROMPT_TEMPLATE.format(
        evidence=evidence,
        question=question,
        llm_response=llm_response
    )
    
    # 2. Google Gemini API Call
    if gemini_key:
        try:
            logger.info("[ACCURACY_JUDGE] Routing evaluation to Gemini API...")
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
            logger.error("[ACCURACY_JUDGE] Gemini API evaluation failed: %s", exc)
            raise RuntimeError(f"Gemini API execution failed: {exc}") from exc
            
    # 3. OpenAI API Call
    elif openai_key:
        try:
            logger.info("[ACCURACY_JUDGE] Routing evaluation to OpenAI API...")
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
            logger.error("[ACCURACY_JUDGE] OpenAI API evaluation failed: %s", exc)
            raise RuntimeError(f"OpenAI API execution failed: {exc}") from exc
            
    # 4. Hugging Face Inference API Call
    elif hf_key:
        try:
            logger.info("[ACCURACY_JUDGE] Routing evaluation to Hugging Face Inference API...")
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
            logger.error("[ACCURACY_JUDGE] Hugging Face API evaluation failed: %s", exc)
            raise RuntimeError(f"Hugging Face Inference API execution failed: {exc}") from exc
            
    # 5. Fallback Simulated Accuracy Judge
    else:
        return _simulate_accuracy_evaluation(question, llm_response, evidence)
