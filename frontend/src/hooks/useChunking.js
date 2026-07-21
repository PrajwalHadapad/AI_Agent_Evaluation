import { useState, useCallback, useRef, useEffect } from 'react';
import { chunkingApi } from '../services/chunkingApi';
import { datasetApi } from '../services/datasetApi';
import { embeddingApi } from '../services/embeddingApi';
import { vectorStoreApi } from '../services/vectorStoreApi';

/**
 * useChunking — Custom React hook for managing the state and operations of the Document Chunking page.
 */
export function useChunking() {
  const [source, setSource] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStep, setProgressStep] = useState('');
  const [results, setResults] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [datasetStatus, setDatasetStatus] = useState({
    truthfulqa_records: 0,
    squad_records: 0,
    truthfulqa_loaded: false,
    squad_loaded: false,
    uploaded_files_count: 0 // Will estimate or count based on state
  });
  const [statusLoading, setStatusLoading] = useState(false);

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

  /** Fetch current dataset status from backend to determine Total Documents */
  const fetchDatasetStatus = useCallback(async () => {
    setStatusLoading(true);
    try {
      const data = await datasetApi.getStatus();
      setDatasetStatus((prev) => ({
        ...prev,
        truthfulqa_records: data.truthfulqa_records || 0,
        squad_records: data.squad_records || 0,
        truthfulqa_loaded: data.truthfulqa_loaded || false,
        squad_loaded: data.squad_loaded || false,
      }));
    } catch (err) {
      console.error('Failed to load dataset status:', err);
      // Suppress toast error on mounting load, just log it
    } finally {
      setStatusLoading(false);
    }
  }, []);

  /** Clear processing results and reset statistics */
  const clearResults = useCallback(() => {
    setResults(null);
    setSource('');
    setProgress(0);
    setProgressStep('');
    addToast('success', 'Chunk processing results have been cleared.');
  }, [addToast]);

  /** Generate chunks for the selected source */
  const generateChunks = useCallback(async (selectedSource, autoPipeline = true) => {
    if (!selectedSource) {
      addToast('error', 'Please select a document or dataset source first.');
      return;
    }

    // Clean up any existing intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    setIsProcessing(true);
    setProgress(5);
    setProgressStep(autoPipeline ? 'Initializing automated ingestion pipeline...' : 'Connecting to AI chunking server...');
    setResults(null);

    let currentProgress = 5;
    let currentPhase = 'chunking'; // 'chunking' | 'embedding' | 'indexing'

    progressIntervalRef.current = setInterval(() => {
      if (autoPipeline) {
        if (currentPhase === 'chunking') {
          if (currentProgress < 30) {
            currentProgress += 2;
            setProgressStep('Parsing document text into semantic chunks...');
          } else {
            currentProgress = 30;
            setProgressStep('Finalizing text chunks...');
          }
        } else if (currentPhase === 'embedding') {
          if (currentProgress < 65) {
            currentProgress += 3;
            setProgressStep('Generating 384-dimension sentence-transformers embeddings...');
          } else {
            currentProgress = 65;
            setProgressStep('Finalizing vector generation...');
          }
        } else if (currentPhase === 'indexing') {
          if (currentProgress < 95) {
            currentProgress += 2;
            setProgressStep('Syncing semantic vectors to ChromaDB collection...');
          } else {
            currentProgress = 95;
            setProgressStep('Verifying vector collection indexes...');
          }
        }
      } else {
        // Manual mode steps
        if (currentProgress < 95) {
          currentProgress += 4;
          setProgressStep('Segmenting text source into chunks...');
        } else {
          currentProgress = 95;
          setProgressStep('Verifying chunks...');
        }
      }
      setProgress(currentProgress);
    }, 100);

    try {
      // Step 1: Chunking
      currentPhase = 'chunking';
      const chunkData = await chunkingApi.processChunking(selectedSource);
      
      if (autoPipeline) {
        // Step 2: Embedding
        currentProgress = 35;
        currentPhase = 'embedding';
        const embedData = await embeddingApi.generateEmbeddings(selectedSource);

        // Step 3: Indexing
        currentProgress = 70;
        currentPhase = 'indexing';
        const indexData = await vectorStoreApi.indexEmbeddings(selectedSource);

        // Complete
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        setProgressStep('Pipeline Complete! Chunks, Embeddings, & Database indexed successfully.');
        setProgress(100);

        setTimeout(() => {
          setIsProcessing(false);
          setResults({
            totalChunks: chunkData.total_chunks,
            averageChunkSize: chunkData.average_chunk_size,
            preview: chunkData.preview,
            source: selectedSource,
            documentSummary: chunkData.document_summary || [],
            embeddingsGenerated: embedData.embeddings_generated,
            indexedDocuments: indexData.indexed_documents,
            totalVectors: indexData.total_vectors,
            collection: indexData.collection,
            pipelineChained: true
          });

          // Refresh total document and chunk counts
          fetchDatasetStatus();

          addToast(
            'success',
            `Automated pipeline completed! Generated ${chunkData.total_chunks} chunks & stored into ChromaDB.`
          );
        }, 300);

      } else {
        // Manual Mode (Only Chunking)
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        setProgressStep('Verification complete. Chunks generated!');
        setProgress(100);

        setTimeout(() => {
          setIsProcessing(false);
          setResults({
            totalChunks: chunkData.total_chunks,
            averageChunkSize: chunkData.average_chunk_size,
            preview: chunkData.preview,
            source: selectedSource,
            documentSummary: chunkData.document_summary || [],
            pipelineChained: false
          });

          fetchDatasetStatus();

          addToast(
            'success',
            `Successfully partitioned source into ${chunkData.total_chunks} text segments.`
          );
        }, 300);
      }

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
        'An error occurred during pipeline execution. Please try again.';
      addToast('error', errorMsg);
    }
  }, [addToast, fetchDatasetStatus]);

  return {
    source,
    setSource,
    isProcessing,
    progress,
    progressStep,
    results,
    toasts,
    datasetStatus,
    statusLoading,
    addToast,
    dismissToast,
    fetchDatasetStatus,
    clearResults,
    generateChunks
  };
}

export default useChunking;
