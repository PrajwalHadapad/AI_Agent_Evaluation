"""
Vector store schemas.

Defines Pydantic models for the vector store indexing, status,
and clear API endpoints.
"""

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, Field


class VectorStoreIndexRequest(BaseModel):
    """Request payload for POST /vector-store/index."""

    source: str = Field(
        ...,
        description="Input source: 'truthfulqa', 'squad', or 'uploaded_document'",
        examples=["truthfulqa"],
    )


class VectorStoreIndexResponse(BaseModel):
    """Response payload returned by POST /vector-store/index on success."""

    status: str = Field(
        ...,
        description="Overall status of the operation",
        examples=["success"],
    )
    collection: str = Field(
        ...,
        description="Name of the ChromaDB collection used",
        examples=["reference_knowledge_base"],
    )
    indexed_documents: int = Field(
        ...,
        description="Number of documents indexed in this operation",
        examples=[220],
    )
    total_vectors: int = Field(
        ...,
        description="Total number of vectors now stored in the collection",
        examples=[220],
    )


class VectorStoreStatusResponse(BaseModel):
    """Response payload returned by GET /vector-store/status."""

    collection_name: str = Field(
        ...,
        description="Name of the ChromaDB collection",
        examples=["reference_knowledge_base"],
    )
    number_of_vectors: int = Field(
        ...,
        description="Total count of stored embedding vectors",
        examples=[220],
    )
    embedding_dimension: Optional[int] = Field(
        None,
        description="Dimensionality of the stored embedding vectors",
        examples=[384],
    )
    database_location: str = Field(
        ...,
        description="Filesystem path to the persistent ChromaDB storage",
        examples=["./chroma_db"],
    )


class VectorStoreClearResponse(BaseModel):
    """Response payload returned by DELETE /vector-store/clear."""

    status: str = Field(
        ...,
        description="Overall status of the operation",
        examples=["success"],
    )
    message: str = Field(
        ...,
        description="Human-readable confirmation message",
        examples=["All vectors have been deleted from 'reference_knowledge_base'."],
    )
