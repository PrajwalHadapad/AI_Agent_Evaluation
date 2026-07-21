import apiClient from './api';

/**
 * Vector Store API — methods for ChromaDB vector database operations.
 *
 * Endpoints:
 *   POST   /vector-store/index  — Index embeddings into ChromaDB
 *   GET    /vector-store/status — Get collection status
 *   DELETE /vector-store/clear  — Clear all vectors
 */
export const vectorStoreApi = {
  /**
   * POST /vector-store/index
   * @param {string} source - The text source to index ('truthfulqa' | 'squad' | 'uploaded_document')
   * @returns {Promise<{ status: string, collection: string, indexed_documents: number, total_vectors: number }>}
   */
  async indexEmbeddings(source) {
    const response = await apiClient.post('/vector-store/index', { source });
    return response.data;
  },

  /**
   * GET /vector-store/status
   * @returns {Promise<{ collection_name: string, number_of_vectors: number, embedding_dimension: number|null, database_location: string }>}
   */
  async getStatus() {
    const response = await apiClient.get('/vector-store/status');
    return response.data;
  },

  /**
   * DELETE /vector-store/clear
   * @returns {Promise<{ status: string, message: string }>}
   */
  async clearVectors() {
    const response = await apiClient.delete('/vector-store/clear');
    return response.data;
  },
};

export default vectorStoreApi;
