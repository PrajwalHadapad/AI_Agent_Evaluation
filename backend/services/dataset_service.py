"""
Dataset Service — business-logic layer for dataset operations.

Thin orchestration between the API routes and the underlying
``DatasetLoader``.  All state lives in a module-level loader
singleton so data persists for the lifetime of the process.
"""

from __future__ import annotations

import logging

from dataset_loaders.dataset_loader import DatasetLoader, DatasetLoadError
from schemas.dataset import DatasetLoadResponse, DatasetStatusResponse, NormalizedRecord

logger = logging.getLogger("llm_evaluation")

# Module-level singleton — created once, reused across requests.
_loader = DatasetLoader()


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def get_dataset_status() -> DatasetStatusResponse:
    """Return the current load state of every supported dataset.

    Returns
    -------
    DatasetStatusResponse
        Boolean flags and record counts for TruthfulQA and SQuAD v2.
    """
    return DatasetStatusResponse(
        truthfulqa_loaded=_loader.truthfulqa_loaded,
        squad_loaded=_loader.squad_loaded,
        truthfulqa_records=len(_loader.truthfulqa_records),
        squad_records=len(_loader.squad_records),
    )


def load_datasets() -> DatasetLoadResponse:
    """Download, normalise, and cache both benchmark datasets.

    If a dataset is already cached in memory, it is returned
    immediately without re-downloading.

    Returns
    -------
    DatasetLoadResponse
        Success status and record counts.

    Raises
    ------
    DatasetLoadError
        Propagated from the loader when a download or parse fails.
    """
    logger.info("[SVC] Loading all benchmark datasets …")

    results = _loader.load_all()

    truthfulqa_count = len(results["truthfulqa"])
    squad_count = len(results["squad"])

    logger.info(
        "[SVC] Datasets loaded — TruthfulQA: %d, SQuAD: %d",
        truthfulqa_count,
        squad_count,
    )

    return DatasetLoadResponse(
        status="success",
        message=(
            f"Datasets loaded successfully. "
            f"TruthfulQA: {truthfulqa_count} records, "
            f"SQuAD v2: {squad_count} records."
        ),
        truthfulqa_records=truthfulqa_count,
        squad_records=squad_count,
    )


def get_truthfulqa_records() -> list[NormalizedRecord]:
    """Get TruthfulQA records, loading them if they are not already loaded."""
    if not _loader.truthfulqa_loaded:
        _loader.load_truthfulqa()
    return _loader.truthfulqa_records


def get_squad_records() -> list[NormalizedRecord]:
    """Get SQuAD v2 records, loading them if they are not already loaded."""
    if not _loader.squad_loaded:
        _loader.load_squad()
    return _loader.squad_records

