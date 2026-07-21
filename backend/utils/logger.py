"""
Centralized logging configuration.

Provides a pre-configured logger instance for consistent logging
across the entire application.
"""

import logging
import sys


def _create_logger() -> logging.Logger:
    """Create and configure the application logger."""
    _logger = logging.getLogger("llm_evaluation")
    _logger.setLevel(logging.DEBUG)

    # Console handler
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.DEBUG)

    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    handler.setFormatter(formatter)

    if not _logger.handlers:
        _logger.addHandler(handler)

    return _logger


logger = _create_logger()
