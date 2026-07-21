"""
Dataset management endpoints.

Provides routes for checking dataset availability and triggering
downloads of benchmark datasets (TruthfulQA, SQuAD v2).
"""

from fastapi import APIRouter, HTTPException

from dataset_loaders.dataset_loader import DatasetLoadError
from schemas.dataset import DatasetLoadResponse, DatasetStatusResponse
from services.dataset_service import get_dataset_status, load_datasets

router = APIRouter()


@router.get(
    "/datasets/status",
    response_model=DatasetStatusResponse,
    summary="Check dataset availability",
)
async def dataset_status():
    """
    Return the current load state of benchmark datasets.

    Reports whether each dataset (TruthfulQA, SQuAD v2) has been
    loaded into memory and how many normalised records are available.
    """
    return get_dataset_status()


@router.post(
    "/datasets/load",
    response_model=DatasetLoadResponse,
    summary="Load benchmark datasets",
)
async def dataset_load():
    """
    Download and normalise all benchmark datasets.

    Triggers the download of TruthfulQA and SQuAD v2 from Hugging Face,
    caches them locally, and returns the number of normalised records
    produced for each dataset.

    If datasets are already cached, they are returned immediately.
    """
    try:
        return load_datasets()
    except DatasetLoadError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Dataset loading failed: {exc}",
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error while loading datasets: {exc}",
        ) from exc
