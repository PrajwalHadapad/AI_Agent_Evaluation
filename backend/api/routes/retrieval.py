"""
Semantic retrieval API endpoints.

Provides routes for searching the ChromaDB ``reference_knowledge_base``
collection by natural-language query and for querying retrieval subsystem
status.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from schemas.retrieval import (
    RetrievalSearchRequest,
    RetrievalSearchResponse,
    RetrievalStatusResponse,
)
from services.retrieval_service import RetrievalService

router = APIRouter()
retrieval_service = RetrievalService()


@router.post(
    "/retrieval/search",
    response_model=RetrievalSearchResponse,
    summary="Semantic search over indexed documents",
)
async def search(request: RetrievalSearchRequest) -> RetrievalSearchResponse:
    """Encode the user query and retrieve the top-5 most relevant chunks.

    Performs cosine-similarity search against stored embeddings in ChromaDB.
    Returns chunk text, source metadata, and similarity scores.
    """
    try:
        output = retrieval_service.search(request.query)

        return RetrievalSearchResponse(
            status=output["status"],
            query=output["query"],
            total_results=output["total_results"],
            results=output["results"],
        )

    except ValueError as val_err:
        raise HTTPException(
            status_code=422,
            detail=str(val_err),
        ) from val_err

    except RuntimeError as rt_err:
        raise HTTPException(
            status_code=503,
            detail=f"Retrieval error: {rt_err}",
        ) from rt_err

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error during retrieval: {exc}",
        ) from exc


@router.get(
    "/retrieval/status",
    response_model=RetrievalStatusResponse,
    summary="Get retrieval subsystem status",
)
async def get_status() -> RetrievalStatusResponse:
    """Return metadata about the retrieval subsystem.

    Includes model status, collection name, document count, embedding
    dimension, and the default top-K value.
    """
    try:
        status = retrieval_service.get_status()
        return RetrievalStatusResponse(**status)

    except RuntimeError as rt_err:
        raise HTTPException(
            status_code=503,
            detail=f"Retrieval status error: {rt_err}",
        ) from rt_err

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error while fetching retrieval status: {exc}",
        ) from exc
