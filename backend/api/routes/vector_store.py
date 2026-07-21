"""
Vector store API endpoints.

Provides routes for indexing embeddings into ChromaDB, querying collection
status, and clearing stored vectors.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from schemas.vector_store import (
    VectorStoreClearResponse,
    VectorStoreIndexRequest,
    VectorStoreIndexResponse,
    VectorStoreStatusResponse,
)
from services.vector_store_service import VectorStoreService

router = APIRouter()
vector_store_service = VectorStoreService()


@router.post(
    "/vector-store/index",
    response_model=VectorStoreIndexResponse,
    summary="Index embeddings into ChromaDB",
)
async def index_embeddings(request: VectorStoreIndexRequest) -> VectorStoreIndexResponse:
    """Generate embeddings for the given source and persist them in ChromaDB.

    Runs the full pipeline: dataset → chunking → embedding → ChromaDB storage.
    Duplicate chunk IDs are automatically skipped.
    """
    try:
        output = vector_store_service.index_embeddings(request.source)

        return VectorStoreIndexResponse(
            status="success",
            collection=output["collection"],
            indexed_documents=output["indexed_documents"],
            total_vectors=output["total_vectors"],
        )

    except ValueError as val_err:
        raise HTTPException(
            status_code=422,
            detail=str(val_err),
        ) from val_err

    except RuntimeError as rt_err:
        raise HTTPException(
            status_code=503,
            detail=f"Vector store error: {rt_err}",
        ) from rt_err

    except MemoryError as mem_err:
        raise HTTPException(
            status_code=507,
            detail=(
                "Insufficient memory to index embeddings. "
                "Try reducing the number of documents or chunks."
            ),
        ) from mem_err

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error during vector indexing: {exc}",
        ) from exc


@router.get(
    "/vector-store/status",
    response_model=VectorStoreStatusResponse,
    summary="Get ChromaDB collection status",
)
async def get_status() -> VectorStoreStatusResponse:
    """Return metadata about the ``reference_knowledge_base`` collection.

    Includes collection name, vector count, embedding dimension, and
    the filesystem location of the persistent database.
    """
    try:
        status = vector_store_service.get_status()
        return VectorStoreStatusResponse(**status)

    except RuntimeError as rt_err:
        raise HTTPException(
            status_code=503,
            detail=f"Vector store error: {rt_err}",
        ) from rt_err

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error while fetching status: {exc}",
        ) from exc


@router.delete(
    "/vector-store/clear",
    response_model=VectorStoreClearResponse,
    summary="Clear all vectors from ChromaDB",
)
async def clear_vectors() -> VectorStoreClearResponse:
    """Delete every vector from the ``reference_knowledge_base`` collection.

    The collection is dropped and immediately re-created so it remains
    available for subsequent inserts.
    """
    try:
        result = vector_store_service.clear_collection()
        return VectorStoreClearResponse(**result)

    except RuntimeError as rt_err:
        raise HTTPException(
            status_code=503,
            detail=f"Vector store error: {rt_err}",
        ) from rt_err

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error while clearing vectors: {exc}",
        ) from exc
