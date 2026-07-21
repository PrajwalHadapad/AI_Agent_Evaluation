import { useState, useCallback, useRef, useEffect } from 'react';
import { embeddingApi } from '../services/embeddingApi';

/**
 * useEmbedding — Custom React hook for managing the state and operations of the Embedding Generation page.
 */
export function useEmbedding() {
  const [source, setSource] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStep, setProgressStep] = useState('');
  const [results, setResults] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  // Overall system/lifetime statistics
  const [stats, setStats] = useState({
    totalChunks: 0,
    embeddingsGenerated: 0,
    embeddingDimension: 384,
    modelUsed: 'all-MiniLM-L6-v2'
  });

  const progressIntervalRef = useRef(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
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

  /** Reset all generator states and results */
  const resetPipeline = useCallback(() => {
    setResults(null);
    setSource('');
    setProgress(0);
    setProgressStep('');
    addToast('success', 'Embedding pipeline states have been reset.');
  }, [addToast]);

  /** Generate embeddings for the selected source */
  const generateEmbeddings = useCallback(async (selectedSource) => {
    if (!selectedSource) {
      addToast('error', 'Please select a document or dataset source first.');
      return;
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    setIsProcessing(true);
    setProgress(5);
    setProgressStep('Connecting to embedding generation service...');
    setResults(null);

    const steps = [
      { max: 20, msg: 'Initializing text parsing pipeline...' },
      { max: 40, msg: 'Segmenting source content into standardized text chunks...' },
      { max: 60, msg: 'Loading sentence-transformers/all-MiniLM-L6-v2 (Singleton)...' },
      { max: 80, msg: 'Generating dense embedding vectors (384-dimensions)...' },
      { max: 95, msg: 'Formatting vectors and finalizing response payload...' }
    ];

    let currentProgress = 5;
    let stepIndex = 0;
    const startTime = performance.now();

    progressIntervalRef.current = setInterval(() => {
      if (stepIndex < steps.length) {
        const activeStep = steps[stepIndex];
        setProgressStep(activeStep.msg);
        
        const increment = Math.max(1, Math.floor((activeStep.max - currentProgress) / 5));
        currentProgress += increment;
        
        if (currentProgress >= activeStep.max) {
          stepIndex++;
        }
      } else {
        currentProgress = 95;
        setProgressStep('Waiting for backend service response...');
      }
      setProgress(currentProgress);
    }, 180);

    try {
      const data = await embeddingApi.generateEmbeddings(selectedSource);
      const endTime = performance.now();
      const timeTakenSec = ((endTime - startTime) / 1000).toFixed(2);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      setProgressStep('Embedding vectors generated successfully!');
      setProgress(100);

      setTimeout(() => {
        setIsProcessing(false);
        const newResults = {
          totalChunks: data.total_chunks,
          embeddingsGenerated: data.embeddings_generated,
          embeddingDimension: data.embedding_dimension,
          generationTime: `${timeTakenSec}s`,
          source: selectedSource,
          preview: data.preview || []
        };
        
        setResults(newResults);
        
        // Update dashboard statistics cards based on the run
        setStats({
          totalChunks: data.total_chunks,
          embeddingsGenerated: data.embeddings_generated,
          embeddingDimension: data.embedding_dimension,
          modelUsed: 'all-MiniLM-L6-v2'
        });

        addToast(
          'success',
          `Successfully generated ${data.embeddings_generated} semantic embeddings.`
        );
      }, 400);

    } catch (err) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setIsProcessing(false);
      setProgress(0);
      setProgressStep('');
      
      const errorMsg =
        err.response?.data?.detail ||
        err.message ||
        'An error occurred during embedding generation. Please try again.';
      addToast('error', errorMsg);
    }
  }, [addToast]);

  return {
    source,
    setSource,
    isProcessing,
    progress,
    progressStep,
    results,
    stats,
    toasts,
    dismissToast,
    resetPipeline,
    generateEmbeddings
  };
}

export default useEmbedding;
