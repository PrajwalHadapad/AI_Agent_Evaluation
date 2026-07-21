"""
Health check endpoint.

Provides a lightweight endpoint for monitoring application
availability and readiness.
"""

from datetime import datetime, timezone

from fastapi import APIRouter

from core.config import settings
from schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.

    Returns the current application health status, useful for
    load balancers, container orchestrators, and monitoring systems.
    """
    return HealthResponse(
        status="healthy",
        application=settings.APP_NAME,
        version=settings.APP_VERSION,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
