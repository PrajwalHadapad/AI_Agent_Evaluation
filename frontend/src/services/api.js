import axios from 'axios';

/**
 * Axios instance pre-configured for the backend API.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API service — centralized methods for all backend communication.
 */
export const api = {
  /**
   * GET / — Root endpoint.
   */
  async getRoot() {
    const response = await apiClient.get('/');
    return response.data;
  },

  /**
   * GET /health — Health check.
   */
  async healthCheck() {
    const response = await apiClient.get('/health');
    return response.data;
  },

  /**
   * POST /evaluation/submit — Submit evaluation input.
   */
  async submitEvaluation({ question, ai_response, reference_answer, document }) {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('ai_response', ai_response);
    if (reference_answer) {
      formData.append('reference_answer', reference_answer);
    }
    if (document) {
      formData.append('document', document);
    }
    const response = await apiClient.post('/evaluation/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * GET /evaluation/history — Retrieve evaluation run history.
   */
  async getEvaluationHistory() {
    const response = await apiClient.get('/evaluation/history');
    return response.data;
  },

  /**
   * DELETE /evaluation/{id} — Delete a single evaluation record by ID.
   */
  async deleteEvaluation(id) {
    const response = await apiClient.delete(`/evaluation/${id}`);
    return response.data;
  },

  /**
   * DELETE /evaluation/clear — Delete all evaluation records.
   */
  async clearEvaluations() {
    const response = await apiClient.delete('/evaluation/clear');
    return response.data;
  },
};

export default apiClient;
