"""
Embedding generation schemas.

Defines Pydantic models for embedding requests, individual embedding results,
and the API summary response.
"""

from __future__ import annotations

from typing import Any, Dict, List
from uuid import UUID

from pydantic import BaseModel, Field


class EmbeddingRequest(BaseModel):
    """Request payload for POST /embeddings/generate."""

    source: str = Field(
        ...,
        description="Input source: 'truthfulqa', 'squad', or 'uploaded_document'",
        examples=["truthfulqa"],
    )


class EmbeddingResult(BaseModel):
    """Embedding output for a single chunk."""

    chunk_id: UUID = Field(
        ...,
        description="Unique identifier of the source chunk",
    )
    embedding_dimension: int = Field(
        ...,
        description="Dimensionality of the embedding vector",
        examples=[384],
    )
    embedding: List[float] = Field(
        ...,
        description="Dense embedding vector for the chunk text",
    )
    metadata: Dict[str, Any] = Field(
        ...,
        description="Metadata inherited from the source chunk",
    )


class EmbeddingResponse(BaseModel):
    """Summary response returned by POST /embeddings/generate."""

    status: str = Field(
        ...,
        description="Overall status of the operation",
        examples=["success"],
    )
    total_chunks: int = Field(
        ...,
        description="Total number of chunks received from the chunking service",
        examples=[210],
    )
    embeddings_generated: int = Field(
        ...,
        description="Number of embeddings successfully generated",
        examples=[210],
    )
    embedding_dimension: int = Field(
        ...,
        description="Dimensionality of the embedding vectors",
        examples=[384],
    )
    preview: list[EmbeddingResult] = Field(
        default=[],
        description="Preview of the first three generated embedding vectors",
    )

