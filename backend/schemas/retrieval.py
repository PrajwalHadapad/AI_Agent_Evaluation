"""
Semantic retrieval schemas.

Defines Pydantic models for the retrieval search request, individual
retrieved results, the search response, and the retrieval status response.
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, field_validator


class RetrievalSearchRequest(BaseModel):
    """Request payload for POST /retrieval/search."""

    query: str = Field(
        ...,
        description="User query to search against the knowledge base",
        examples=["Explain Python."],
    )

    @field_validator("query")
    @classmethod
    def query_must_not_be_blank(cls, v: str) -> str:
        """Reject empty or whitespace-only queries."""
        if not v or not v.strip():
            raise ValueError("Query must not be empty or whitespace-only.")
        return v.strip()


class RetrievedChunk(BaseModel):
    """A single chunk returned by a semantic search."""

    chunk_id: str = Field(
        ...,
        description="Unique identifier of the retrieved chunk",
    )
    document_name: str = Field(
        ...,
        description="Name of the source document",
        examples=["TruthfulQA"],
    )
    source: str = Field(
        ...,
        description="Data-source identifier",
        examples=["truthfulqa"],
    )
    similarity_score: float = Field(
        ...,
        description="Cosine similarity score (higher is more relevant)",
        examples=[0.91],
    )
    chunk_text: str = Field(
        ...,
        description="Full text content of the retrieved chunk",
    )
    metadata: Dict[str, Any] = Field(
        default_factory=dict,
        description="Additional metadata associated with the chunk",
    )


class RetrievalSearchResponse(BaseModel):
    """Response payload returned by POST /retrieval/search on success."""

    status: str = Field(
        ...,
        description="Overall status of the operation",
        examples=["success"],
    )
    query: str = Field(
        ...,
        description="The original user query",
        examples=["Explain Python."],
    )
    total_results: int = Field(
        ...,
        description="Number of results returned",
        examples=[5],
    )
    results: List[RetrievedChunk] = Field(
        ...,
        description="Top-K retrieved chunks ranked by similarity",
    )


class RetrievalStatusResponse(BaseModel):
    """Response payload returned by GET /retrieval/status."""

    model_loaded: bool = Field(
        ...,
        description="Whether the embedding model is currently loaded",
    )
    model_name: str = Field(
        ...,
        description="Name of the sentence-transformer model in use",
        examples=["sentence-transformers/all-MiniLM-L6-v2"],
    )
    collection_name: str = Field(
        ...,
        description="Name of the ChromaDB collection being searched",
        examples=["reference_knowledge_base"],
    )
    total_indexed_documents: int = Field(
        ...,
        description="Total number of vectors stored in the collection",
        examples=[220],
    )
    embedding_dimension: Optional[int] = Field(
        None,
        description="Dimensionality of the stored embedding vectors",
        examples=[384],
    )
    top_k: int = Field(
        ...,
        description="Number of results returned per query",
        examples=[5],
    )
