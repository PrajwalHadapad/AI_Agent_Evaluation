import { useState, useCallback, useRef, useEffect } from 'react';
import { vectorStoreApi } from '../services/vectorStoreApi';

/**
 * useVectorStore — Custom React hook for managing the Vector Database page state.
 *
 * Handles indexing embeddings into ChromaDB, fetching collection status,
 * clearing vectors, toast notifications, and animated progress tracking.
 */
export function useVectorStore() {
  // Database status
  const [status, setStatus] = useState({
    collectionName: 'reference_knowledge_base',
    numberOfVectors: 0,
    embeddingDimension: null,
    databaseLocation: './chroma_db',
    dbStatus: 'offline', // 'healthy' | 'offline' | 'indexing'
  });

  // Indexing state
  const [source, setSource] = useState('');
  const [isIndexing, setIsIndexing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStep, setProgressStep] = useState('');
  const [indexResult, setIndexResult] = useState(null);
  const [lastIndexedTime, setLastIndexedTime] = useState(null);

  // Loading states
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const progressIntervalRef = useRef(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
  }, []);

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

  /** Fetch current collection status from the backend */
  const fetchStatus = useCallback(async () => {
    setIsLoadingStatus(true);
    try {
      const data = await vectorStoreApi.getStatus();
      setStatus({
        collectionName: data.collection_name || 'reference_knowledge_base',
        numberOfVectors: data.number_of_vectors || 0,
        embeddingDimension: data.embedding_dimension,
        databaseLocation: data.database_location || './chroma_db',
        dbStatus: 'healthy',
      });
      setIsLoadingStatus(false);
    } catch (err) {
      setStatus((prev) => ({ ...prev, dbStatus: 'offline' }));
      setIsLoadingStatus(false);
      const errorMsg =
        err.response?.data?.detail ||
        err.message ||
        'Failed to connect to ChromaDB. Check the backend service.';
      addToast('error', errorMsg);
    }
  }, [addToast]);

  /** Index embeddings for the selected source into ChromaDB */
  const indexEmbeddings = useCallback(
    async (selectedSource) => {
      if (!selectedSource) {
        addToast('error', 'Please select a data source before indexing.');
        return;
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      setIsIndexing(true);
      setProgress(5);
      setProgressStep('Connecting to vector store service...');
      setIndexResult(null);
      setStatus((prev) => ({ ...prev, dbStatus: 'indexing' }));

      const steps = [
        { max: 15, msg: 'Initializing document chunking pipeline...' },
        { max: 30, msg: 'Segmenting source data into text chunks...' },
        { max: 50, msg: 'Loading embedding model (all-MiniLM-L6-v2)...' },
        { max: 65, msg: 'Generating dense embedding vectors (384-dim)...' },
        { max: 80, msg: 'Inserting vectors into ChromaDB collection...' },
        { max: 92, msg: 'Verifying indexed records & deduplicating...' },
      ];

      let currentProgress = 5;
      let stepIndex = 0;
      const startTime = performance.now();

      progressIntervalRef.current = setInterval(() => {
        if (stepIndex < steps.length) {
          const activeStep = steps[stepIndex];
          setProgressStep(activeStep.msg);

          const increment = Math.max(
            1,
            Math.floor((activeStep.max - currentProgress) / 5)
          );
          currentProgress += increment;

          if (currentProgress >= activeStep.max) {
            stepIndex++;
          }
        } else {
          currentProgress = 92;
          setProgressStep('Waiting for backend confirmation...');
        }
        setProgress(currentProgress);
      }, 200);

      try {
        const data = await vectorStoreApi.indexEmbeddings(selectedSource);
        const endTime = performance.now();
        const timeTakenSec = ((endTime - startTime) / 1000).toFixed(2);

        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }

        setProgressStep('Vectors indexed successfully!');
        setProgress(100);

        setTimeout(() => {
          setIsIndexing(false);
          const result = {
            collection: data.collection,
            indexedDocuments: data.indexed_documents,
            totalVectors: data.total_vectors,
            indexingTime: `${timeTakenSec}s`,
            source: selectedSource,
          };

          setIndexResult(result);
          setLastIndexedTime(new Date().toLocaleString());

          // Refresh status
          setStatus((prev) => ({
            ...prev,
            numberOfVectors: data.total_vectors,
            dbStatus: 'healthy',
          }));

          addToast(
            'success',
            `Successfully indexed ${data.indexed_documents} document(s) into ChromaDB.`
          );
        }, 400);
      } catch (err) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        setIsIndexing(false);
        setProgress(0);
        setProgressStep('');
        setStatus((prev) => ({ ...prev, dbStatus: 'healthy' }));

        const errorMsg =
          err.response?.data?.detail ||
          err.message ||
          'An error occurred during vector indexing. Please try again.';
        addToast('error', errorMsg);
      }
    },
    [addToast]
  );

  /** Clear all vectors from the collection */
  const clearDatabase = useCallback(async () => {
    setIsClearing(true);
    try {
      await vectorStoreApi.clearVectors();
      setStatus((prev) => ({
        ...prev,
        numberOfVectors: 0,
        embeddingDimension: null,
        dbStatus: 'healthy',
      }));
      setIndexResult(null);
      setLastIndexedTime(null);
      setIsClearing(false);
      addToast('success', 'All vectors have been cleared from the collection.');
    } catch (err) {
      setIsClearing(false);
      const errorMsg =
        err.response?.data?.detail ||
        err.message ||
        'Failed to clear vectors. Please try again.';
      addToast('error', errorMsg);
    }
  }, [addToast]);

  return {
    // Status
    status,
    isLoadingStatus,
    fetchStatus,
    // Indexing
    source,
    setSource,
    isIndexing,
    progress,
    progressStep,
    indexResult,
    lastIndexedTime,
    indexEmbeddings,
    // Clear
    isClearing,
    clearDatabase,
    // Toasts
    toasts,
    dismissToast,
  };
}

export default useVectorStore;
