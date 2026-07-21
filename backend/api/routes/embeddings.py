"""
Embedding generation API endpoints.

Provides the route handler for generating embeddings from document chunks.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from schemas.embedding import EmbeddingRequest, EmbeddingResponse
from services.embedding_service import EmbeddingService

router = APIRouter()
embedding_service = EmbeddingService()


@router.post(
    "/embeddings/generate",
    response_model=EmbeddingResponse,
    summary="Generate embeddings from document chunks",
)
async def generate_embeddings(request: EmbeddingRequest) -> EmbeddingResponse:
    """Generate embedding vectors for every chunk derived from the given source.

    Accepts a source (truthfulqa, squad, or uploaded_document), runs the
    chunking pipeline internally, encodes each chunk with
    ``sentence-transformers/all-MiniLM-L6-v2``, and returns a summary of the
    operation.  Embeddings are **not** persisted — storage is handled by a
    separate module.
    """
    try:
        output = embedding_service.process_embeddings(request.source)

        return EmbeddingResponse(
            status="success",
            total_chunks=output["total_chunks"],
            embeddings_generated=output["embeddings_generated"],
            embedding_dimension=output["embedding_dimension"],
            preview=output["results"][:3],
        )

    except ValueError as val_err:
        raise HTTPException(
            status_code=422,
            detail=str(val_err),
        ) from val_err

    except RuntimeError as rt_err:
        raise HTTPException(
            status_code=503,
            detail=f"Embedding model error: {rt_err}",
        ) from rt_err

    except MemoryError as mem_err:
        raise HTTPException(
            status_code=507,
            detail=(
                "Insufficient memory to generate embeddings. "
                "Try reducing the number of documents or chunks."
            ),
        ) from mem_err

    except HTTPException:
        # Let upstream HTTP exceptions (from chunking) pass through unchanged
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error during embedding generation: {exc}",
        ) from exc
