import apiClient from './api';

/**
 * Embedding API — methods for processing embedding generation.
 *
 * Endpoints:
 *   POST /embeddings/generate — Generate semantic embeddings from chunked documents.
 */
export const embeddingApi = {
  /**
   * POST /embeddings/generate
   * @param {string} source - The text source to embed ('truthfulqa' | 'squad' | 'uploaded_document')
   * @returns {Promise<{ status: string, total_chunks: number, embeddings_generated: number, embedding_dimension: number }>}
   */
  async generateEmbeddings(source) {
    const response = await apiClient.post('/embeddings/generate', { source });
    return response.data;
  },
};

export default embeddingApi;
