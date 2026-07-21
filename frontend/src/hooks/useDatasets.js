import { useState, useCallback } from 'react';
import { datasetApi } from '../services/datasetApi';

/**
 * useDatasets — Custom hook encapsulating all dataset state & operations.
 *
 * Provides:
 *  - status        : current dataset availability from the backend
 *  - loading flags : per-action loading states
 *  - notifications : toast-style messages (success / error)
 *  - fetchStatus() : refresh dataset status
 *  - loadDatasets() : trigger download of both datasets
 */
export function useDatasets() {
  const [status, setStatus] = useState({
    truthfulqa_loaded: false,
    squad_loaded: false,
    truthfulqa_records: 0,
    squad_records: 0,
  });

  const [statusLoading, setStatusLoading] = useState(false);
  const [loadingDatasets, setLoadingDatasets] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [notifications, setNotifications] = useState([]);

  /** Push a notification and auto-dismiss after 5 s */
  const notify = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  /** Dismiss a notification manually */
  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /** Fetch current status from backend */
  const fetchStatus = useCallback(async () => {
    setStatusLoading(true);
    try {
      const data = await datasetApi.getStatus();
      setStatus(data);
      setLastUpdated(new Date());
      notify('success', 'Dataset status refreshed successfully.');
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        'Failed to fetch dataset status.';
      notify('error', msg);
    } finally {
      setStatusLoading(false);
    }
  }, [notify]);

  /** Trigger dataset loading */
  const loadDatasets = useCallback(async () => {
    setLoadingDatasets(true);
    try {
      const data = await datasetApi.loadDatasets();
      // Refresh local status
      setStatus({
        truthfulqa_loaded: data.truthfulqa_records > 0,
        squad_loaded: data.squad_records > 0,
        truthfulqa_records: data.truthfulqa_records,
        squad_records: data.squad_records,
      });
      setLastUpdated(new Date());
      notify('success', data.message || 'Datasets loaded successfully.');
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        'Failed to load datasets.';
      notify('error', msg);
    } finally {
      setLoadingDatasets(false);
    }
  }, [notify]);

  return {
    status,
    statusLoading,
    loadingDatasets,
    lastUpdated,
    notifications,
    fetchStatus,
    loadDatasets,
    dismissNotification,
  };
}

export default useDatasets;
