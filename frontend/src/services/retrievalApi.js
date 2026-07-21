import apiClient from './api';

/**
 * Retrieval API — methods for ChromaDB semantic retrieval operations.
 *
 * Endpoints:
 *   POST   /retrieval/search — Perform cosine similarity search on database
 *   GET    /retrieval/status — Get retrieval subsystem status
 */
export const retrievalApi = {
  /**
   * POST /retrieval/search
   * @param {string} query - The query to search for
   * @returns {Promise<{ status: string, query: string, total_results: number, results: Array<any> }>}
   */
  async search(query) {
    const response = await apiClient.post('/retrieval/search', { query });
    return response.data;
  },

  /**
   * GET /retrieval/status
   * @returns {Promise<{ model_loaded: boolean, model_name: string, collection_name: string, total_indexed_documents: number, embedding_dimension: number|null, top_k: number }>}
   */
  async getStatus() {
    const response = await apiClient.get('/retrieval/status');
    return response.data;
  },
};

export default retrievalApi;
