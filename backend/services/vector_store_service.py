"""
Vector store service — ChromaDB indexing and management.

Manages a persistent ChromaDB collection (``reference_knowledge_base``) and
provides methods for inserting embeddings produced by the embedding service,
querying collection status, and clearing stored vectors.
"""

from __future__ import annotations

import logging
import os
import threading
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

import chromadb
from chromadb.api.models.Collection import Collection

from core.config import settings
from schemas.embedding import EmbeddingResult
from services.embedding_service import EmbeddingService

logger = logging.getLogger("llm_evaluation")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
_COLLECTION_NAME: str = "reference_knowledge_base"


class VectorStoreService:
    """Manages ChromaDB storage for document-chunk embeddings.

    Uses a persistent ChromaDB client so data survives application restarts.
    Thread-safe Singleton — only one instance exists per process.
    """

    _instance: Optional["VectorStoreService"] = None
    _lock: threading.Lock = threading.Lock()
    _client: Optional[chromadb.ClientAPI] = None
    _collection: Optional[Collection] = None

    def __new__(cls) -> "VectorStoreService":
        """Ensure only one instance of VectorStoreService exists."""
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance

    # ------------------------------------------------------------------
    # Client / Collection initialisation
    # ------------------------------------------------------------------
    def _get_persist_directory(self) -> str:
        """Return the absolute path to the ChromaDB persist directory."""
        return os.path.abspath(
            getattr(settings, "CHROMA_PERSIST_DIR", "./chroma_db")
        )

    def _init_client(self) -> None:
        """Create the persistent ChromaDB client if not already initialised."""
        if self._client is not None:
            return

        with self._lock:
            if self._client is not None:
                return

            persist_dir = self._get_persist_directory()
            logger.info(
                "[VECTOR] Initialising persistent ChromaDB client at: %s",
                persist_dir,
            )
            try:
                self.__class__._client = chromadb.PersistentClient(
                    path=persist_dir,
                )
                logger.info("[VECTOR] ChromaDB client ready")
            except Exception as exc:
                logger.error(
                    "[VECTOR] Failed to initialise ChromaDB client: %s", exc
                )
                raise RuntimeError(
                    f"ChromaDB connection failure: {exc}"
                ) from exc

    def _get_collection(self) -> Collection:
        """Return (or create) the target ChromaDB collection."""
        self._init_client()

        if self._collection is not None:
            return self._collection

        with self._lock:
            if self._collection is not None:
                return self._collection

            logger.info(
                "[VECTOR] Getting or creating collection: %s", _COLLECTION_NAME
            )
            try:
                self.__class__._collection = self._client.get_or_create_collection(
                    name=_COLLECTION_NAME,
                    metadata={"hnsw:space": "cosine"},
                )
                logger.info(
                    "[VECTOR] Collection '%s' ready — current count: %d",
                    _COLLECTION_NAME,
                    self._collection.count(),
                )
            except Exception as exc:
                logger.error(
                    "[VECTOR] Failed to access collection '%s': %s",
                    _COLLECTION_NAME,
                    exc,
                )
                raise RuntimeError(
                    f"ChromaDB collection error: {exc}"
                ) from exc

        return self._collection

    # ------------------------------------------------------------------
    # Duplicate detection helpers
    # ------------------------------------------------------------------
    def _get_existing_ids(self, ids: List[str]) -> set:
        """Return the subset of *ids* that already exist in the collection."""
        collection = self._get_collection()
        try:
            result = collection.get(ids=ids, include=[])
            return set(result["ids"])
        except Exception:
            # If the lookup fails treat all IDs as new (best effort)
            return set()

    # ------------------------------------------------------------------
    # Core indexing
    # ------------------------------------------------------------------
    def index_embeddings(self, source: str) -> Dict[str, Any]:
        """Generate embeddings for *source* and insert them into ChromaDB.

        Parameters
        ----------
        source:
            Data-source identifier forwarded to
            ``EmbeddingService.process_embeddings``.

        Returns
        -------
        dict
            ``{"collection": str, "indexed_documents": int,
            "total_vectors": int}``
        """
        logger.info(
            "[VECTOR] Starting indexing pipeline for source: %s", source
        )

        # Step 1 — Generate embeddings via Module 5
        embedding_service = EmbeddingService()
        embedding_output = embedding_service.process_embeddings(source)
        results: List[EmbeddingResult] = embedding_output["results"]
        logger.info(
            "[VECTOR] Received %d embedding(s) from embedding service",
            len(results),
        )

        if not results:
            logger.warning("[VECTOR] No embeddings to index — aborting")
            collection = self._get_collection()
            return {
                "collection": _COLLECTION_NAME,
                "indexed_documents": 0,
                "total_vectors": collection.count(),
            }

        # Step 2 — Prepare ChromaDB payloads
        ids: List[str] = []
        embeddings: List[List[float]] = []
        documents: List[str] = []
        metadatas: List[Dict[str, Any]] = []

        now = datetime.now(timezone.utc).isoformat()

        for result in results:
            chunk_id_str = str(result.chunk_id)
            ids.append(chunk_id_str)
            embeddings.append(result.embedding)
            # The chunk text is stored in result.metadata["text"] by the embedding service
            documents.append(result.metadata.get("text", ""))
            metadatas.append(
                {
                    "chunk_id": chunk_id_str,
                    "document_id": result.metadata.get("document_id", ""),
                    "source": result.metadata.get("source", source),
                    "document_name": result.metadata.get("document_name", ""),
                    "chunk_index": result.metadata.get("chunk_index", 0),
                    "created_at": result.metadata.get("created_at", now),
                }
            )

        # Step 3 — Deduplicate: skip IDs already in the collection
        existing_ids = self._get_existing_ids(ids)
        if existing_ids:
            logger.info(
                "[VECTOR] Skipping %d duplicate chunk(s)", len(existing_ids)
            )
            filtered = [
                (i, e, d, m)
                for i, e, d, m in zip(ids, embeddings, documents, metadatas)
                if i not in existing_ids
            ]
            if not filtered:
                logger.info("[VECTOR] All chunks already indexed — nothing new")
                collection = self._get_collection()
                return {
                    "collection": _COLLECTION_NAME,
                    "indexed_documents": 0,
                    "total_vectors": collection.count(),
                }
            ids, embeddings, documents, metadatas = map(list, zip(*filtered))

        # Step 4 — Upsert into ChromaDB (batch-safe)
        collection = self._get_collection()
        batch_size = 500
        for start in range(0, len(ids), batch_size):
            end = start + batch_size
            logger.info(
                "[VECTOR] Upserting batch %d–%d of %d",
                start,
                min(end, len(ids)),
                len(ids),
            )
            collection.add(
                ids=ids[start:end],
                embeddings=embeddings[start:end],
                documents=documents[start:end],
                metadatas=metadatas[start:end],
            )

        total_vectors = collection.count()
        logger.info(
            "[VECTOR] Indexing complete — %d new vector(s), %d total in '%s'",
            len(ids),
            total_vectors,
            _COLLECTION_NAME,
        )

        return {
            "collection": _COLLECTION_NAME,
            "indexed_documents": len(ids),
            "total_vectors": total_vectors,
        }

    # ------------------------------------------------------------------
    # Status
    # ------------------------------------------------------------------
    def get_status(self) -> Dict[str, Any]:
        """Return collection statistics.

        Returns
        -------
        dict
            ``{"collection_name": str, "number_of_vectors": int,
            "embedding_dimension": int | None, "database_location": str}``
        """
        collection = self._get_collection()
        count = collection.count()

        # Attempt to read the dimension from the first stored vector
        embedding_dimension: Optional[int] = None
        if count > 0:
            try:
                sample = collection.peek(limit=1)
                if sample.get("embeddings") is not None and len(sample["embeddings"]) > 0:
                    embedding_dimension = len(sample["embeddings"][0])
            except Exception as exc:
                logger.warning(
                    "[VECTOR] Could not determine embedding dimension: %s", exc
                )

        return {
            "collection_name": _COLLECTION_NAME,
            "number_of_vectors": count,
            "embedding_dimension": embedding_dimension,
            "database_location": self._get_persist_directory(),
        }

    # ------------------------------------------------------------------
    # Clear
    # ------------------------------------------------------------------
    def clear_collection(self) -> Dict[str, str]:
        """Delete **all** vectors from the collection.

        The collection itself is dropped and re-created so the name persists.

        Returns
        -------
        dict
            ``{"status": "success", "message": str}``
        """
        self._init_client()

        logger.info("[VECTOR] Clearing collection: %s", _COLLECTION_NAME)
        try:
            self._client.delete_collection(name=_COLLECTION_NAME)
            # Re-create so the collection is immediately usable again
            self.__class__._collection = self._client.get_or_create_collection(
                name=_COLLECTION_NAME,
                metadata={"hnsw:space": "cosine"},
            )
            logger.info("[VECTOR] Collection '%s' cleared", _COLLECTION_NAME)
        except Exception as exc:
            logger.error(
                "[VECTOR] Failed to clear collection '%s': %s",
                _COLLECTION_NAME,
                exc,
            )
            raise RuntimeError(
                f"Failed to clear ChromaDB collection: {exc}"
            ) from exc

        return {
            "status": "success",
            "message": (
                f"All vectors have been deleted from '{_COLLECTION_NAME}'."
            ),
        }
