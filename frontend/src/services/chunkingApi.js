import apiClient from './api';

/**
 * Chunking API — methods for processing document chunking.
 *
 * Endpoints:
 *   POST /chunking/process — Partition a dataset or local document uploads into semantic text chunks.
 */
export const chunkingApi = {
  /**
   * POST /chunking/process
   * @param {string} source - The text source to chunk ('truthfulqa' | 'squad' | 'uploaded_document')
   * @returns {Promise<{ status: string, total_chunks: number, average_chunk_size: number, preview: Array }>}
   */
  async processChunking(source) {
    const response = await apiClient.post('/chunking/process', { source });
    return response.data;
  },
};

export default chunkingApi;
