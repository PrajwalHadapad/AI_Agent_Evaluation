"""
Application configuration loaded from environment variables.

Uses pydantic-settings for type-safe, validated configuration management.
"""

from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


# Resolve the .env file relative to this file's parent directory (backend/)
_ENV_FILE = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    """Global application settings sourced from environment variables."""

    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # Application
    APP_NAME: str = "LLM Evaluation Platform"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "llm_evaluation"

    # ChromaDB
    CHROMA_HOST: str = "localhost"
    CHROMA_PORT: int = 8001
    CHROMA_COLLECTION_NAME: str = "reference_knowledge_base"
    CHROMA_PERSIST_DIR: str = "./chroma_db"

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse comma-separated CORS origins into a list."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


# Singleton settings instance
settings = Settings()
