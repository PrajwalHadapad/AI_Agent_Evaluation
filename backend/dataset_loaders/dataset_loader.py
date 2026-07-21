"""
Dataset Loader — download, cache, and normalise benchmark datasets.

Provides a reusable ``DatasetLoader`` class that wraps the Hugging Face
``datasets`` library and produces records in a uniform shape consumed by
the rest of the platform.

Supported datasets
------------------
* **TruthfulQA** — ``truthfulqa/truthful_qa`` (generation split)
* **SQuAD v2**  — ``rajpurkar/squad_v2`` (validation split)
"""

from __future__ import annotations

import hashlib
import logging
from typing import Any

from datasets import load_dataset, Dataset, DatasetDict  # type: ignore[import-untyped]
from datasets.features.features import _FEATURE_TYPES, Sequence
# Workaround: Newer dataset caches serialize List features which are not present in datasets v3.6.0.
# Mapping List to Sequence fixes the serialization error.
_FEATURE_TYPES['List'] = Sequence

from schemas.dataset import NormalizedRecord

logger = logging.getLogger("llm_evaluation")


# ---------------------------------------------------------------------------
# DatasetLoader
# ---------------------------------------------------------------------------

class DatasetLoader:
    """Download, cache, and normalise benchmark datasets.

    The loader keeps an in-memory cache of normalised records so
    repeated access does not re-download or re-process the data.

    Usage
    -----
    >>> loader = DatasetLoader()
    >>> records = loader.load_truthfulqa()
    """

    def __init__(self) -> None:
        self._truthfulqa_records: list[NormalizedRecord] = []
        self._squad_records: list[NormalizedRecord] = []

    # -- public properties ---------------------------------------------------

    @property
    def truthfulqa_loaded(self) -> bool:
        """Return ``True`` if TruthfulQA records are available."""
        return len(self._truthfulqa_records) > 0

    @property
    def squad_loaded(self) -> bool:
        """Return ``True`` if SQuAD v2 records are available."""
        return len(self._squad_records) > 0

    @property
    def truthfulqa_records(self) -> list[NormalizedRecord]:
        """Return the cached list of normalised TruthfulQA records."""
        return self._truthfulqa_records

    @property
    def squad_records(self) -> list[NormalizedRecord]:
        """Return the cached list of normalised SQuAD v2 records."""
        return self._squad_records

    # -- TruthfulQA ----------------------------------------------------------

    def load_truthfulqa(self) -> list[NormalizedRecord]:
        """Load and normalise the TruthfulQA dataset.

        Downloads the *generation* config from Hugging Face on first
        call and caches the normalised records in memory.

        Returns
        -------
        list[NormalizedRecord]
            Every question mapped to its best available answer.

        Raises
        ------
        DatasetLoadError
            If the download or normalisation fails.
        """
        if self._truthfulqa_records:
            logger.info(
                "[CACHE] TruthfulQA already loaded — %d records",
                len(self._truthfulqa_records),
            )
            return self._truthfulqa_records

        logger.info("[LOAD] Downloading TruthfulQA dataset …")
        try:
            raw: Dataset | DatasetDict = load_dataset(
                "truthfulqa/truthful_qa",
                "generation",
                split="validation",
                trust_remote_code=True,
            )
        except Exception as exc:
            raise DatasetLoadError(
                f"Failed to download TruthfulQA: {exc}"
            ) from exc

        logger.info("[NORM] Normalising %d TruthfulQA rows …", len(raw))
        records: list[NormalizedRecord] = []

        for idx, row in enumerate(raw):
            try:
                if not isinstance(row, dict):
                    logger.warning(
                        "[SKIP] TruthfulQA row %d is not a dict: %s", idx, type(row)
                    )
                    continue
                record = self._normalise_truthfulqa_row(row, idx)
                if record is not None:
                    records.append(record)
            except Exception as exc:  # noqa: BLE001
                logger.warning(
                    "[SKIP] TruthfulQA row %d skipped: %s", idx, exc
                )

        self._truthfulqa_records = records
        logger.info(
            "[DONE] TruthfulQA loaded — %d normalised records", len(records)
        )
        return records

    # -- SQuAD v2 ------------------------------------------------------------

    def load_squad(self) -> list[NormalizedRecord]:
        """Load and normalise the SQuAD v2 dataset.

        Downloads the validation split from Hugging Face on first
        call and caches the normalised records in memory.

        Returns
        -------
        list[NormalizedRecord]
            Every answerable question mapped to its first answer.

        Raises
        ------
        DatasetLoadError
            If the download or normalisation fails.
        """
        if self._squad_records:
            logger.info(
                "[CACHE] SQuAD v2 already loaded — %d records",
                len(self._squad_records),
            )
            return self._squad_records

        logger.info("[LOAD] Downloading SQuAD v2 dataset …")
        try:
            raw: Dataset | DatasetDict = load_dataset(
                "rajpurkar/squad_v2",
                split="validation",
                trust_remote_code=True,
            )
        except Exception as exc:
            raise DatasetLoadError(
                f"Failed to download SQuAD v2: {exc}"
            ) from exc

        logger.info("[NORM] Normalising %d SQuAD v2 rows …", len(raw))
        records: list[NormalizedRecord] = []

        for idx, row in enumerate(raw):
            try:
                if not isinstance(row, dict):
                    logger.warning(
                        "[SKIP] SQuAD v2 row %d is not a dict: %s", idx, type(row)
                    )
                    continue
                record = self._normalise_squad_row(row, idx)
                if record is not None:
                    records.append(record)
            except Exception as exc:  # noqa: BLE001
                logger.warning(
                    "[SKIP] SQuAD v2 row %d skipped: %s", idx, exc
                )

        self._squad_records = records
        logger.info(
            "[DONE] SQuAD v2 loaded — %d normalised records", len(records)
        )
        return records

    # -- load all convenience ------------------------------------------------

    def load_all(self) -> dict[str, list[NormalizedRecord]]:
        """Load both TruthfulQA and SQuAD v2.

        Returns
        -------
        dict
            Keys ``"truthfulqa"`` and ``"squad"`` mapped to their
            normalised record lists.
        """
        return {
            "truthfulqa": self.load_truthfulqa(),
            "squad": self.load_squad(),
        }

    # -- private normalisation helpers ---------------------------------------

    @staticmethod
    def _normalise_truthfulqa_row(
        row: dict[str, Any], idx: int
    ) -> NormalizedRecord | None:
        """Convert a single TruthfulQA row into a ``NormalizedRecord``.

        The dataset stores correct answers in ``correct_answers``
        (a list of strings) and the question in ``question``.
        We pick the first correct answer.  If none is available we
        fall back to ``best_answer``.
        """
        question: str = (row.get("question") or "").strip()
        if not question:
            return None

        # Try correct_answers first, then best_answer
        answer = ""
        correct: list[str] = row.get("correct_answers") or []
        if correct:
            answer = correct[0].strip()

        if not answer:
            answer = (row.get("best_answer") or "").strip()

        if not answer:
            return None

        # Deterministic ID derived from content
        record_id = _deterministic_id("truthfulqa", question, idx)

        return NormalizedRecord(
            id=record_id,
            question=question,
            answer=answer,
            source="truthfulqa",
        )

    @staticmethod
    def _normalise_squad_row(
        row: dict[str, Any], idx: int
    ) -> NormalizedRecord | None:
        """Convert a single SQuAD v2 row into a ``NormalizedRecord``.

        SQuAD v2 contains unanswerable questions (empty ``answers``).
        We skip those and only keep rows with at least one answer text.
        """
        question: str = (row.get("question") or "").strip()
        if not question:
            return None

        answers_block: dict[str, Any] = row.get("answers") or {}
        texts: list[str] = answers_block.get("text") or []

        # Filter to the first non-empty answer
        answer = ""
        for text in texts:
            candidate = text.strip()
            if candidate:
                answer = candidate
                break

        if not answer:
            # Unanswerable question — skip
            return None

        # Use the dataset's own ID if present, otherwise generate one
        record_id = row.get("id") or _deterministic_id("squad", question, idx)

        return NormalizedRecord(
            id=str(record_id),
            question=question,
            answer=answer,
            source="squad",
        )


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _deterministic_id(source: str, question: str, idx: int) -> str:
    """Generate a stable, reproducible record ID.

    Uses a SHA-256 hash of the source + question + index so the same
    input always produces the same ID regardless of run order.
    """
    raw = f"{source}::{question}::{idx}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:16]


# ---------------------------------------------------------------------------
# Custom exception
# ---------------------------------------------------------------------------

class DatasetLoadError(Exception):
    """Raised when a dataset cannot be downloaded or normalised."""
