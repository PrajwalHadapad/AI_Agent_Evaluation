import apiClient from './api';

/**
 * Dataset API — methods for managing benchmark datasets.
 *
 * Endpoints:
 *   GET  /datasets/status — Check availability of TruthfulQA & SQuAD v2
 *   POST /datasets/load   — Trigger download & normalisation of both datasets
 */
export const datasetApi = {
  /**
   * GET /datasets/status
   * @returns {{ truthfulqa_loaded, squad_loaded, truthfulqa_records, squad_records }}
   */
  async getStatus() {
    const response = await apiClient.get('/datasets/status');
    return response.data;
  },

  /**
   * POST /datasets/load
   * @returns {{ status, message, truthfulqa_records, squad_records }}
   */
  async loadDatasets() {
    // Dataset downloads can be slow — generous 120 s timeout
    const response = await apiClient.post('/datasets/load', null, {
      timeout: 120_000,
    });
    return response.data;
  },
};

export default datasetApi;
