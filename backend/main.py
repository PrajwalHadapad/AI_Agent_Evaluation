"""
AI-Powered Multi-Agent LLM Response Evaluation Platform

FastAPI application entry point.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# Ensure backend directory is in PYTHONPATH for correct module resolution
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.config import settings
from api.routes.health import router as health_router
from api.routes.evaluation import router as evaluation_router
from api.routes.datasets import router as datasets_router
from api.routes.chunking import router as chunking_router
from api.routes.embeddings import router as embeddings_router
from api.routes.vector_store import router as vector_store_router
from api.routes.retrieval import router as retrieval_router
from utils.logger import logger


async def initialize_datasets_and_vectors():
    """Automatically download and index benchmark datasets if the collection is empty."""
    try:
        import asyncio
        from services.vector_store_service import VectorStoreService
        from services.dataset_service import load_datasets
        
        # Wait briefly for FastAPI server to start
        await asyncio.sleep(2.0)
        
        vs = VectorStoreService()
        logger.info("[STARTUP] Checking if vector database is empty...")
        status = vs.get_status()
        if status.get("number_of_vectors", 0) == 0:
            logger.info("[STARTUP] ChromaDB collection is empty. Auto-loading TruthfulQA & SQuAD...")
            await asyncio.to_thread(load_datasets)
            
            logger.info("[STARTUP] Indexing TruthfulQA dataset...")
            await asyncio.to_thread(vs.index_embeddings, "truthfulqa")
            
            logger.info("[STARTUP] Indexing SQuAD dataset...")
            await asyncio.to_thread(vs.index_embeddings, "squad")
            
            logger.info("[STARTUP] Auto-indexing completed successfully.")
        else:
            logger.info("[STARTUP] ChromaDB already populated with %d vectors. Skipping auto-indexing.", status.get("number_of_vectors"))
    except Exception as exc:
        logger.error("[STARTUP] Auto-initialization failed: %s", exc)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager for startup and shutdown events."""
    logger.info("[START] Starting %s v%s", settings.APP_NAME, settings.APP_VERSION)
    logger.info("[DEBUG] Debug mode: %s", settings.DEBUG)
    logger.info("[DOCS] API docs available at /docs")
    
    import asyncio
    asyncio.create_task(initialize_datasets_and_vectors())
    
    yield
    logger.info("[STOP] Shutting down %s", settings.APP_NAME)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "AI-Powered Multi-Agent LLM Response Evaluation Platform. "
        "Evaluate LLM-generated responses using multiple autonomous judge agents."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS Middleware
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Route Registration
# ---------------------------------------------------------------------------
app.include_router(health_router, tags=["Health"])
app.include_router(evaluation_router, tags=["Evaluation"])
app.include_router(datasets_router, tags=["Datasets"])
app.include_router(chunking_router, tags=["Chunking"])
app.include_router(embeddings_router, tags=["Embeddings"])
app.include_router(vector_store_router, tags=["Vector Store"])
app.include_router(retrieval_router, tags=["Retrieval"])


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint — returns platform identity."""
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "message": "Welcome to the AI-Powered Multi-Agent LLM Response Evaluation Platform",
    }
