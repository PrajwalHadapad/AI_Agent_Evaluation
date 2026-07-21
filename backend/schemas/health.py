"""
Health check response schema.
"""

from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Response model for the /health endpoint."""

    status: str
    application: str
    version: str
    timestamp: str
