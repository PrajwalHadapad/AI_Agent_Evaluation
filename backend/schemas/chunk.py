"""
Document chunking schemas.

Defines Pydantic models for chunks, chunk metadata, API requests, and responses.
"""

from __future__ import annotations

from uuid import UUID
from pydantic import BaseModel, Field


class ChunkMetadata(BaseModel):
    """Metadata fields associated with a specific chunk."""

    document_name: str = Field(
        ...,
        description="Name of the document/source file",
        examples=["truthfulqa", "financial_report.pdf"],
    )
    created_at: str = Field(
        ...,
        description="ISO 8601 timestamp indicating when the chunk was created",
        examples=["2026-07-05T20:30:00Z"],
    )
    chunk_size: int = Field(
        ...,
        description="Length of the chunk text in characters",
        examples=[482],
    )


class Chunk(BaseModel):
    """Unified representation of a text chunk with unique identifiers and metadata."""

    chunk_id: UUID = Field(
        ...,
        description="Unique identifier for this specific chunk",
    )
    document_id: UUID = Field(
        ...,
        description="Unique identifier for the parent document or dataset record",
    )
    chunk_index: int = Field(
        ...,
        description="Zero-based index of this chunk within the parent document",
    )
    text: str = Field(
        ...,
        description="Text content of the chunk",
    )
    source: str = Field(
        ...,
        description="Source of the chunk ('truthfulqa', 'squad', or 'uploaded_document')",
        examples=["truthfulqa"],
    )
    metadata: ChunkMetadata = Field(
        ...,
        description="Metadata payload for the chunk",
    )


class ChunkingRequest(BaseModel):
    """Request payload for POST /chunking/process."""

    source: str = Field(
        ...,
        description="Input source: 'truthfulqa', 'squad', or 'uploaded_document'",
        examples=["truthfulqa"],
    )


class ChunkingResponse(BaseModel):
    """Response payload returned by POST /chunking/process on success."""

    status: str = Field(
        ...,
        description="Overall status of the operation (e.g., 'success')",
        examples=["success"],
    )
    total_chunks: int = Field(
        ...,
        description="Total number of chunks generated",
        examples=[245],
    )
    average_chunk_size: float = Field(
        ...,
        description="Average length of chunks in characters",
        examples=[384.5],
    )
    preview: list[Chunk] = Field(
        ...,
        description="Preview of the first three generated chunks",
    )
    document_summary: list[dict] = Field(
        default=[],
        description="Summary of chunking count per parent document",
    )

