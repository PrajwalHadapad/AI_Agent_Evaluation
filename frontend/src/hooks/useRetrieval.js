import { useState, useCallback, useEffect } from 'react';
import { retrievalApi } from '../services/retrievalApi';

/**
 * useRetrieval — Custom React hook for managing the Semantic Retrieval page state.
 *
 * Handles performing similarity search queries, fetching retrieval subsystem status,
 * handling toast notifications, and query loading state transitions.
 */
export function useRetrieval() {
  // Subsystem status
  const [status, setStatus] = useState({
    modelLoaded: false,
    modelName: 'sentence-transformers/all-MiniLM-L6-v2',
    collectionName: 'reference_knowledge_base',
    totalIndexedDocuments: 0,
    embeddingDimension: null,
    topK: 5,
    dbStatus: 'offline', // 'healthy' | 'offline' | 'loading'
  });

  // Query & Results state
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Loading states
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  /** Push a toast notification with automatic dismissal after 5 seconds */
  const addToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  /** Manually dismiss a toast notification */
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /** Fetch current retrieval status from the backend */
  const fetchStatus = useCallback(async () => {
    setIsLoadingStatus(true);
    try {
      const data = await retrievalApi.getStatus();
      setStatus({
        modelLoaded: data.model_loaded,
        modelName: data.model_name || 'sentence-transformers/all-MiniLM-L6-v2',
        collectionName: data.collection_name || 'reference_knowledge_base',
        totalIndexedDocuments: data.total_indexed_documents || 0,
        embeddingDimension: data.embedding_dimension,
        topK: data.top_k || 5,
        dbStatus: 'healthy',
      });
      setIsLoadingStatus(false);
    } catch (err) {
      setStatus((prev) => ({ ...prev, dbStatus: 'offline' }));
      setIsLoadingStatus(false);
      const errorMsg =
        err.response?.data?.detail ||
        err.message ||
        'Failed to connect to retrieval service. Check backend logs.';
      addToast('error', errorMsg);
    }
  }, [addToast]);

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  /** Execute a semantic search query */
  const performSearch = useCallback(
    async (searchQuery) => {
      const trimmed = searchQuery ? searchQuery.trim() : '';
      if (!trimmed) {
        addToast('error', 'Please enter a valid query string.');
        return;
      }

      setIsSearching(true);
      setSearchResults(null);

      try {
        const data = await retrievalApi.search(trimmed);
        
        // Simulating subtle delay for visual premium feel of computation
        setTimeout(() => {
          setSearchResults({
            status: data.status,
            query: data.query,
            totalResults: data.total_results,
            results: data.results || [],
          });
          setIsSearching(false);
          
          if (data.total_results > 0) {
            addToast('success', `Found ${data.total_results} matching chunks.`);
          } else {
            addToast('warning', 'No relevant document chunks found.');
          }
        }, 600);

        // Silent status update to keep metrics in sync
        try {
          const statusUpdate = await retrievalApi.getStatus();
          setStatus({
            modelLoaded: statusUpdate.model_loaded,
            modelName: statusUpdate.model_name || 'sentence-transformers/all-MiniLM-L6-v2',
            collectionName: statusUpdate.collection_name || 'reference_knowledge_base',
            totalIndexedDocuments: statusUpdate.total_indexed_documents || 0,
            embeddingDimension: statusUpdate.embedding_dimension,
            topK: statusUpdate.top_k || 5,
            dbStatus: 'healthy',
          });
        } catch (e) {
          // ignore status update error during active search
        }

      } catch (err) {
        setIsSearching(false);
        const errorMsg =
          err.response?.data?.detail ||
          err.message ||
          'An error occurred during semantic retrieval.';
        addToast('error', errorMsg);
      }
    },
    [addToast]
  );

  /** Clear search results and query */
  const clearSearch = useCallback(() => {
    setQuery('');
    setSearchResults(null);
  }, []);

  return {
    // Status
    status,
    isLoadingStatus,
    fetchStatus,
    // Search
    query,
    setQuery,
    isSearching,
    searchResults,
    performSearch,
    clearSearch,
    // Toasts
    toasts,
    dismissToast,
  };
}

export default useRetrieval;
