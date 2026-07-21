"""
Evaluation request/response schemas.

Pydantic models for the /evaluation/submit endpoint.
"""

from pydantic import BaseModel


class EvaluationResponse(BaseModel):
    """Response returned after a successful evaluation submission."""

    status: str
    message: str
    request_id: str
