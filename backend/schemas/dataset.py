"""
Dataset schemas.

Pydantic models for the /datasets endpoints — status checks and
dataset loading responses.
"""

from pydantic import BaseModel, Field


class NormalizedRecord(BaseModel):
    """A single benchmark record normalised into a common shape."""

    id: str = Field(..., description="Unique identifier for the record")
    question: str = Field(..., description="The evaluation question")
    answer: str = Field(..., description="The reference/gold answer")
    source: str = Field(
        ...,
        description="Origin dataset name (e.g. 'truthfulqa', 'squad')",
    )


class DatasetStatusResponse(BaseModel):
    """Response model for GET /datasets/status."""

    truthfulqa_loaded: bool = Field(
        ..., description="Whether TruthfulQA has been loaded"
    )
    squad_loaded: bool = Field(
        ..., description="Whether SQuAD v2 has been loaded"
    )
    truthfulqa_records: int = Field(
        ..., description="Number of normalised TruthfulQA records"
    )
    squad_records: int = Field(
        ..., description="Number of normalised SQuAD v2 records"
    )


class DatasetLoadResponse(BaseModel):
    """Response model for POST /datasets/load."""

    status: str = Field(..., description="Outcome of the load operation")
    message: str = Field(..., description="Human-readable summary")
    truthfulqa_records: int = Field(
        ..., description="Number of TruthfulQA records loaded"
    )
    squad_records: int = Field(
        ..., description="Number of SQuAD v2 records loaded"
    )
