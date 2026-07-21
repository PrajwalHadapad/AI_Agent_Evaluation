"""
MongoDB connection manager.

Provides async MongoDB client initialization and database access
using the Motor async driver.
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from core.config import settings
from utils.logger import logger


class MongoDB:
    """Manages the MongoDB async client lifecycle."""

    client: AsyncIOMotorClient | None = None
    database: AsyncIOMotorDatabase | None = None

    @classmethod
    async def connect(cls) -> None:
        """Establish connection to MongoDB."""
        logger.info("🔌 Connecting to MongoDB at %s", settings.MONGODB_URL)
        cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
        cls.database = cls.client[settings.MONGODB_DB_NAME]
        logger.info("✅ Connected to database: %s", settings.MONGODB_DB_NAME)

    @classmethod
    async def disconnect(cls) -> None:
        """Close the MongoDB connection."""
        if cls.client:
            cls.client.close()
            logger.info("🔒 MongoDB connection closed")

    @classmethod
    def get_database(cls) -> AsyncIOMotorDatabase:
        """Return the active database instance."""
        if cls.database is None:
            raise RuntimeError("Database not initialized. Call MongoDB.connect() first.")
        return cls.database


# Convenience accessor
def get_db() -> AsyncIOMotorDatabase:
    """FastAPI dependency — returns the active MongoDB database."""
    return MongoDB.get_database()
