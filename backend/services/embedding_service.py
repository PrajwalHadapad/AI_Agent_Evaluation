"""
Embedding generation service.

Loads the ``sentence-transformers/all-MiniLM-L6-v2`` model once using the
Singleton pattern and generates dense embedding vectors for document chunks
produced by the chunking service.
"""

from __future__ import annotations

import logging
import threading
from typing import Any, Dict, List, Optional

from schemas.chunk import Chunk
from schemas.embedding import EmbeddingResult
from services.chunking_service import ChunkingService

logger = logging.getLogger("llm_evaluation")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"
_EMBEDDING_DIMENSION: int = 384


class EmbeddingService:
    """Generates embeddings from document chunks using Sentence Transformers.

    The underlying model is loaded lazily on first use and shared across all
    subsequent calls (thread-safe Singleton via a class-level lock).
    """

    _instance: Optional["EmbeddingService"] = None
    _lock: threading.Lock = threading.Lock()
    _model: Any = None  # SentenceTransformer instance

    def __new__(cls) -> "EmbeddingService":
        """Ensure only one instance of EmbeddingService exists."""
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance

    # ------------------------------------------------------------------
    # Model loading
    # ------------------------------------------------------------------
    def _load_model(self) -> None:
        """Load the Sentence Transformer model if not already loaded."""
        if self._model is not None:
            return

        with self._lock:
            # Double-checked locking
            if self._model is not None:
                return

            logger.info("[EMBED] Loading embedding model: %s", _MODEL_NAME)
            try:
                from sentence_transformers import SentenceTransformer

                self.__class__._model = SentenceTransformer(_MODEL_NAME)
                logger.info(
                    "[EMBED] Model loaded successfully — dimension: %d",
                    _EMBEDDING_DIMENSION,
                )
            except Exception as exc:
                logger.error(
                    "[EMBED] Failed to load embedding model '%s': %s",
                    _MODEL_NAME,
                    exc,
                )
                raise RuntimeError(
                    f"Could not load embedding model '{_MODEL_NAME}': {exc}"
                ) from exc

    # ------------------------------------------------------------------
    # Core embedding logic
    # ------------------------------------------------------------------
    def generate_embeddings(self, chunks: List[Chunk]) -> List[EmbeddingResult]:
        """Generate one embedding per chunk.

        Parameters
        ----------
        chunks:
            List of ``Chunk`` objects produced by the chunking service.

        Returns
        -------
        List[EmbeddingResult]
            One ``EmbeddingResult`` per non-empty chunk.

        Raises
        ------
        RuntimeError
            If the embedding model cannot be loaded.
        MemoryError
            Propagated when the system runs out of memory during encoding.
        ValueError
            If *all* chunks are empty after filtering.
        """
        self._load_model()

        # --- Filter out empty chunks ---
        valid_chunks: List[Chunk] = [c for c in chunks if c.text and c.text.strip()]
        skipped = len(chunks) - len(valid_chunks)
        if skipped:
            logger.warning(
                "[EMBED] Rejected %d empty chunk(s) out of %d total",
                skipped,
                len(chunks),
            )
        if not valid_chunks:
            raise ValueError("All provided chunks are empty — nothing to embed.")

        # --- Encode texts in a single batch ---
        texts: List[str] = [c.text for c in valid_chunks]
        logger.info(
            "[EMBED] Encoding %d chunk(s) with model '%s'",
            len(texts),
            _MODEL_NAME,
        )

        try:
            vectors = self._model.encode(
                texts,
                show_progress_bar=False,
                batch_size=64,
                normalize_embeddings=True,
            )
        except MemoryError:
            logger.error(
                "[EMBED] MemoryError while encoding %d chunks — "
                "consider reducing batch size or chunk count",
                len(texts),
            )
            raise
        except Exception as exc:
            logger.error("[EMBED] Encoding failed: %s", exc)
            raise RuntimeError(f"Embedding encoding failed: {exc}") from exc

        # --- Build result list ---
        results: List[EmbeddingResult] = []
        for chunk, vector in zip(valid_chunks, vectors):
            result = EmbeddingResult(
                chunk_id=chunk.chunk_id,
                embedding_dimension=_EMBEDDING_DIMENSION,
                embedding=vector.tolist(),
                metadata={
                    "document_id": str(chunk.document_id),
                    "chunk_index": chunk.chunk_index,
                    "source": chunk.source,
                    "document_name": chunk.metadata.document_name,
                    "created_at": chunk.metadata.created_at,
                    "chunk_size": chunk.metadata.chunk_size,
                    "text": chunk.text,
                },
            )
            results.append(result)

        logger.info(
            "[EMBED] Successfully generated %d embedding(s) — dimension: %d",
            len(results),
            _EMBEDDING_DIMENSION,
        )
        return results

    # ------------------------------------------------------------------
    # Orchestrator: chunk → embed
    # ------------------------------------------------------------------
    def process_embeddings(self, source: str) -> Dict[str, Any]:
        """End-to-end pipeline: chunk the source then embed every chunk.

        Parameters
        ----------
        source:
            Data source identifier forwarded to ``ChunkingService.process_chunking``.

        Returns
        -------
        dict
            ``{"results": [...], "total_chunks": int, "embeddings_generated": int,
            "embedding_dimension": int}``
        """
        logger.info("[EMBED] Starting embedding pipeline for source: %s", source)

        # Step 1 — Chunking
        chunking_service = ChunkingService()
        chunks = chunking_service.process_chunking(source)
        logger.info("[EMBED] Received %d chunk(s) from chunking service", len(chunks))

        # Step 2 — Embedding
        results = self.generate_embeddings(chunks)

        return {
            "results": results,
            "total_chunks": len(chunks),
            "embeddings_generated": len(results),
            "embedding_dimension": _EMBEDDING_DIMENSION,
        }
