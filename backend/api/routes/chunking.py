"""
Document chunking API endpoints.

Provides the route handler for triggering document and dataset text chunking.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from schemas.chunk import ChunkingRequest, ChunkingResponse
from services.chunking_service import ChunkingService

router = APIRouter()
chunking_service = ChunkingService()


@router.post(
    "/chunking/process",
    response_model=ChunkingResponse,
    summary="Process document chunking",
)
async def process_chunking(request: ChunkingRequest) -> ChunkingResponse:
    """Split text/documents from benchmark datasets or uploads into smaller segments.

    Accepts a source (truthfulqa, squad, or uploaded_document) and returns the count,
    average size, and a preview of the first three generated chunks.
    """
    try:
        chunks = chunking_service.process_chunking(request.source)

        total_chunks = len(chunks)
        if total_chunks > 0:
            avg_size = sum(c.metadata.chunk_size for c in chunks) / total_chunks
        else:
            avg_size = 0.0

        preview = chunks[:3]

        # Calculate chunk counts per document
        doc_counts = {}
        for c in chunks:
            name = c.metadata.document_name
            doc_counts[name] = doc_counts.get(name, 0) + 1

        document_summary = [
            {"document_name": name, "chunk_count": count}
            for name, count in doc_counts.items()
        ]

        return ChunkingResponse(
            status="success",
            total_chunks=total_chunks,
            average_chunk_size=round(avg_size, 2),
            preview=preview,
            document_summary=document_summary,
        )
    except HTTPException as http_exc:
        raise http_exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error during chunking process: {exc}",
        ) from exc
