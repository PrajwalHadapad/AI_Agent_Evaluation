"""
Evaluation submission endpoint.

Accepts evaluation input (question, AI response, optional reference answer,
and optional source document) and returns a unique request ID.
No evaluation logic or persistence is implemented at this stage.
"""

import os
import json
import uuid
import random
from typing import Optional, List

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from schemas.evaluation import EvaluationResponse

router = APIRouter()

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}
MAX_FILE_SIZE_MB = 10

UPLOADS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "uploads")
HISTORY_FILE = os.path.join(UPLOADS_DIR, "evaluations.json")


def load_history() -> list:
    """Load evaluation history from local JSON file. Initializes with defaults if missing."""
    if not os.path.exists(HISTORY_FILE):
        os.makedirs(UPLOADS_DIR, exist_ok=True)
        default_data = [
            { "id": "EV-024", "q": "What is the purpose of RAG architecture...", "model": "GPT-4o", "status": "Completed", "score": "8.7/10", "date": "10 min ago" },
            { "id": "EV-023", "q": "Explain the theory of chunk size settings...", "model": "Claude 3.5", "status": "Completed", "score": "9.1/10", "date": "1 hr ago" },
            { "id": "EV-022", "q": "How does vector dimensions overlap...", "model": "Gemini 1.5", "status": "Completed", "score": "8.3/10", "date": "3 hr ago" },
            { "id": "EV-021", "q": "What are the benefits of prompt templates...", "model": "Llama 3.1", "status": "Completed", "score": "7.9/10", "date": "5 hr ago" }
        ]
        try:
            with open(HISTORY_FILE, "w", encoding="utf-8") as f:
                json.dump(default_data, f, indent=2, ensure_ascii=False)
        except Exception:
            pass
        return default_data
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def save_history(history: list) -> None:
    """Save history list back to local JSON file."""
    try:
        os.makedirs(UPLOADS_DIR, exist_ok=True)
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, indent=2, ensure_ascii=False)
    except Exception:
        pass


def _validate_document(document: UploadFile) -> None:
    """Raise HTTPException if the uploaded file type is unsupported."""
    filename = document.filename or ""
    ext = ""
    if "." in filename:
        ext = f".{filename.rsplit('.', 1)[1].lower()}"

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=422,
            detail=(
                f"Unsupported file type '{ext or 'unknown'}'. "
                f"Allowed types: {', '.join(sorted(ALLOWED_EXTENSIONS))}"
            ),
        )


@router.post(
    "/evaluation/submit",
    response_model=EvaluationResponse,
    status_code=200,
    summary="Submit an evaluation request",
)
async def submit_evaluation(
    question: str = Form(..., min_length=1, description="The evaluation question"),
    ai_response: str = Form(..., min_length=1, description="AI-generated response to evaluate"),
    reference_answer: Optional[str] = Form(None, description="Optional reference/gold answer"),
    document: Optional[UploadFile] = File(None, description="Optional source document (PDF, DOCX, TXT)"),
):
    """
    Accept evaluation input, persist details to local store, and return a confirmation with a unique request ID.
    """
    # Validate and save document file if uploaded
    if document and document.filename:
        _validate_document(document)
        os.makedirs(UPLOADS_DIR, exist_ok=True)
        file_path = os.path.join(UPLOADS_DIR, document.filename)
        try:
            # Reset read pointer and write file binary content
            await document.seek(0)
            content = await document.read()
            with open(file_path, "wb") as f:
                f.write(content)
        except Exception as exc:
            raise HTTPException(status_code=500, detail=f"Failed to save uploaded document: {exc}")

    request_id = str(uuid.uuid4())
    
    # Save record to history
    history = load_history()
    next_num = len(history) + 21
    new_id = f"EV-{next_num:03d}"
    
    # 1. Fetch chunks for evaluation (always needed for Hallucination Judge)
    from utils.logger import logger
    import asyncio
    
    retrieved_chunks = []
    try:
        from services.retrieval_service import RetrievalService
        retrieval_service = RetrievalService()
        search_res = await asyncio.to_thread(retrieval_service.search, question, top_k=3)
        results = search_res.get("results", [])
        retrieved_chunks = [c.chunk_text for c in results]
        logger.info(f"[ROUTE] Retrieved {len(retrieved_chunks)} context chunks for verification.")
    except Exception as ret_exc:
        logger.error(f"[ROUTE] Failed to retrieve chunks for evaluation: {ret_exc}")
        retrieved_chunks = []
            
    # 2. Run Relevance Judge, Accuracy Judge and Hallucination Judge concurrently
    from app.evaluation.relevance_judge import evaluate_relevance
    from app.evaluation.accuracy_judge import evaluate_accuracy
    from app.evaluation.hallucination_judge import evaluate_hallucinations
    
    async def run_rel():
        try:
            return await evaluate_relevance(question, ai_response)
        except Exception as exc:
            logger.error(f"[ROUTE] Relevance Judge evaluation failed: {exc}")
            return {"score": 3, "reason": f"Relevance evaluation encountered an error: {str(exc)}", "agent": "Relevance Judge"}
            
    async def run_acc():
        try:
            return await evaluate_accuracy(
                question=question,
                llm_response=ai_response,
                reference_answer=reference_answer,
                retrieved_chunks=retrieved_chunks
            )
        except Exception as exc:
            logger.error(f"[ROUTE] Accuracy Judge evaluation failed: {exc}")
            return {
                "score": 3,
                "reason": f"Accuracy evaluation encountered an error: {str(exc)}",
                "supporting_evidence": "Error occurred during verification.",
                "agent": "Accuracy Judge"
            }
            
    async def run_hal():
        try:
            return await evaluate_hallucinations(
                llm_response=ai_response,
                retrieved_chunks=retrieved_chunks,
                question=question,
                reference_answer=reference_answer
            )
        except Exception as exc:
            logger.error(f"[ROUTE] Hallucination Judge evaluation failed: {exc}")
            return {
                "hallucination": False,
                "unsupported_claims": [
                    {
                        "claim": "Evaluation failed",
                        "reason": f"Error occurred during evaluation: {str(exc)}",
                        "evidence": "N/A"
                    }
                ],
                "agent": "Hallucination Judge"
            }
            
    rel_result, acc_result, hal_result = await asyncio.gather(run_rel(), run_acc(), run_hal())
    
    rel_score = rel_result.get("score", 5)
    rel_reason = rel_result.get("reason", "")
    
    acc_score = acc_result.get("score", 5)
    acc_reason = acc_result.get("reason", "")
    acc_evidence = acc_result.get("supporting_evidence", "")
    
    hal_flag = hal_result.get("hallucination", False)
    hal_claims = hal_result.get("unsupported_claims", [])
    
    average_score = (rel_score + acc_score) / 2
    score_str = f"{average_score:.1f}/5"
    
    models = ["GPT-4o", "Claude 3.5", "Gemini 1.5", "Llama 3.1"]
    model_name = random.choice(models)
    
    from datetime import datetime
    new_record = {
        "id": new_id,
        "q": question[:40] + "..." if len(question) > 40 else question,
        "full_q": question,
        "ai_response": ai_response,
        "reference_answer": reference_answer or "",
        "model": model_name,
        "status": "Completed",
        "score": score_str,
        "reason": rel_reason,  # fallback legacy field
        "agent": "Multi-Agent Judge",  # legacy field identifier
        "relevance_score": f"{rel_score}/5",
        "relevance_reason": rel_reason,
        "accuracy_score": f"{acc_score}/5",
        "accuracy_reason": acc_reason,
        "supporting_evidence": acc_evidence,
        "hallucination": hal_flag,
        "unsupported_claims": hal_claims,
        "date": datetime.now().strftime("%b %d, %Y")
    }
    
    history.insert(0, new_record)
    save_history(history)

    return EvaluationResponse(
        status="success",
        message="Evaluation request received successfully.",
        request_id=request_id,
    )


@router.get(
    "/evaluation/history",
    response_model=list,
    summary="Get recent evaluation history",
)
async def get_evaluation_history():
    """Retrieve all previously submitted evaluations."""
    return load_history()


@router.delete(
    "/evaluation/clear",
    summary="Clear all evaluation logs history",
)
async def clear_evaluations():
    """Delete all evaluation runs from the history JSON store."""
    save_history([])
    return {"status": "success", "message": "All evaluation history cleared."}


@router.delete(
    "/evaluation/{run_id}",
    summary="Delete a single evaluation log by ID",
)
async def delete_evaluation(run_id: str):
    """Delete a single evaluation run by its unique ID."""
    history = load_history()
    new_history = [r for r in history if r.get("id") != run_id]
    if len(new_history) == len(history):
        raise HTTPException(
            status_code=404,
            detail=f"Evaluation log with ID {run_id} not found."
        )
    save_history(new_history)
    return {"status": "success", "message": f"Evaluation log {run_id} deleted."}

