"""
Relevance Judge Agent Module.

Evaluates user-submitted AI responses against their questions on a 1-5 scale.
Supports dynamic API key routing and safe fallback simulation.
"""

import json
import logging
import os
import re
from typing import Any, Dict

import httpx

logger = logging.getLogger("llm_evaluation")

# ---------------------------------------------------------------------------
# Prompt Template
# ---------------------------------------------------------------------------
PROMPT_TEMPLATE = """You are an expert AI evaluator. Your job is to act as a Relevance Judge.
You must evaluate ONLY whether the given AI response answers the user's question.
Do NOT evaluate the factual correctness of the response. Evaluate ONLY the relevance and completeness of the answer relative to the question.

Score the response from 1 to 5 based on the following scale:
1 = Completely irrelevant (The response has nothing to do with the question)
2 = Slightly relevant (The response mentions some related concepts but does not address the question)
3 = Partially answers (The response addresses part of the question but misses key parts)
4 = Mostly answers (The response addresses most of the question but has minor omissions)
5 = Fully answers (The response completely and directly answers the user's question)

User Question: {user_question}
AI Response: {llm_response}

You must return ONLY a valid JSON object, with no other text, markdown formatting, or HTML. The JSON must have the following keys:
- "agent": "Relevance Judge"
- "score": <an integer from 1 to 5>
- "reason": "<a detailed explanation of the score, analyzing why the response does or does not answer the question>"

JSON:"""

# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------
def _parse_json_response(text: str) -> Dict[str, Any]:
    """Parse the raw text response from the LLM into a structured JSON dict."""
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
        
        # Enforce structural integrity
        if not isinstance(data, dict):
            raise ValueError("Parsed output is not a JSON object/dict")
            
        data["agent"] = "Relevance Judge"
        
        # Validate score key and clamp to 1-5 range
        score_val = data.get("score", 5)
        try:
            clamped_score = max(1, min(5, int(score_val)))
            data["score"] = clamped_score
        except (ValueError, TypeError):
            data["score"] = 5
            
        # Ensure reason exists
        if "reason" not in data or not str(data["reason"]).strip():
            data["reason"] = "No reason provided by evaluator model."
            
        return data
    except Exception as exc:
        logger.error("[JUDGE] Failed to parse LLM JSON response: %s. Raw text: %s", exc, text)
        raise ValueError(f"Invalid JSON format returned by LLM: {exc}") from exc


def _clean_word(w: str) -> str:
    """Helper to clean a word of leading/trailing non-alphanumeric punctuation."""
    return re.sub(r'^\W+|\W+$', '', w).lower()


def _simulate_relevance_evaluation(user_question: str, llm_response: str) -> Dict[str, Any]:
    """
    Fallback simulation mode when no external LLM API key is configured.
    Estimates relevance using keyword overlap and response length.
    """
    logger.info("[JUDGE] Running relevance judge in SIMULATED fallback mode.")
    
    q_text = user_question.strip().lower()
    r_text = llm_response.strip().lower()
    
    # Base validations
    if not q_text or not r_text:
        return {
            "agent": "Relevance Judge",
            "score": 1,
            "reason": "[Simulated] The evaluation failed because either the question or response was empty."
        }
        
    # Standard stopwords to filter
    stopwords = {
        "what", "is", "the", "of", "in", "and", "a", "to", "for", "on", "with", "as", "by", 
        "at", "an", "this", "that", "how", "why", "where", "who", "which", "are", "do", "does"
    }
    
    q_words = [ _clean_word(w) for w in q_text.split() ]
    q_keywords = {w for w in q_words if w and w not in stopwords}
    
    r_words = [ _clean_word(w) for w in r_text.split() ]
    r_word_set = {w for w in r_words if w}
    
    if not q_keywords:
        # Avoid division by zero
        overlap_ratio = 1.0
    else:
        overlap = q_keywords.intersection(r_word_set)
        overlap_ratio = len(overlap) / len(q_keywords)
        
    # Check length details
    response_length = len(llm_response.strip())
    
    # Relevance scoring heuristics
    if response_length < 15:
        score = 1
        reason = "The response is too short to provide any meaningful answer or context to the question."
    elif overlap_ratio == 0:
        score = 2
        reason = "The response does not contain key terms from the question and appears completely off-topic or irrelevant."
    elif overlap_ratio < 0.35:
        score = 3
        reason = "The response touches upon general context but only partially answers the prompt, leaving main parts unaddressed."
    elif overlap_ratio < 0.75:
        score = 4
        reason = "The response is highly relevant, shares significant keyword overlap, and mostly answers the user's question."
    else:
        score = 5
        reason = "The response directly, fully, and comprehensively answers the user's question, addressing all aspects."
        
    return {
        "agent": "Relevance Judge",
        "score": score,
        "reason": f"[Simulated Evaluation] {reason}"
    }

# ---------------------------------------------------------------------------
# Public Async API Entrypoint
# ---------------------------------------------------------------------------
async def evaluate_relevance(user_question: str, llm_response: str) -> Dict[str, Any]:
    """
    Asynchronously evaluates the relevance of an LLM response to a user question.
    
    Uses configured API keys (Gemini, OpenAI, or Hugging Face) in the system 
    or falls back to simulated matching when offline.
    """
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    hf_key = os.getenv("HUGGINGFACE_API_KEY")
    
    prompt = PROMPT_TEMPLATE.format(
        user_question=user_question,
        llm_response=llm_response
    )
    
    # 1. Google Gemini API Call
    if gemini_key:
        try:
            logger.info("[JUDGE] Routing evaluation to Gemini API...")
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
            logger.error("[JUDGE] Gemini API evaluation failed: %s", exc)
            raise RuntimeError(f"Gemini API execution failed: {exc}") from exc
            
    # 2. OpenAI API Call
    elif openai_key:
        try:
            logger.info("[JUDGE] Routing evaluation to OpenAI API...")
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
            logger.error("[JUDGE] OpenAI API evaluation failed: %s", exc)
            raise RuntimeError(f"OpenAI API execution failed: {exc}") from exc
            
    # 3. Hugging Face Inference API Call
    elif hf_key:
        try:
            logger.info("[JUDGE] Routing evaluation to Hugging Face Inference API...")
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
                
                # Hugging Face returns list or dict based on configuration/endpoint
                if isinstance(res_data, list) and len(res_data) > 0:
                    text = res_data[0].get("generated_text", "")
                else:
                    text = res_data.get("generated_text", "")
                    
                return _parse_json_response(text)
        except Exception as exc:
            logger.error("[JUDGE] Hugging Face API evaluation failed: %s", exc)
            raise RuntimeError(f"Hugging Face Inference API execution failed: {exc}") from exc
            
    # 4. Fallback Simulated Judge
    else:
        return _simulate_relevance_evaluation(user_question, llm_response)
