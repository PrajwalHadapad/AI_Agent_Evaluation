import { useState } from 'react';
import { useVectorStore } from '../hooks/useVectorStore';

// ---------------------------------------------------------------------------
// Premium Inline Icons
// ---------------------------------------------------------------------------

function DatabaseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function CubeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

function DimensionIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5m0-16.5h16.5m-16.5 0L19.5 20.25M19.5 3.75v16.5m0-16.5H3.75" />
    </svg>
  );
}

function SignalIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

function PlayIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>
  );
}

function ArrowPathIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function TrashIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function SpinnerIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function CheckIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ExclamationIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function CloseIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function ClockIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ServerIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
    </svg>
  );
}

function DocumentIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function ArchiveIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Status Badge Component
// ---------------------------------------------------------------------------

function StatusBadge({ status }) {
  const config = {
    healthy: {
      label: 'Healthy',
      dotClass: 'bg-emerald-400',
      bgClass: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    },
    offline: {
      label: 'Offline',
      dotClass: 'bg-red-400',
      bgClass: 'bg-red-500/10 border-red-500/20 text-red-400',
    },
    indexing: {
      label: 'Indexing',
      dotClass: 'bg-amber-400 animate-pulse',
      bgClass: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    },
  };

  const cfg = config[status] || config.offline;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${cfg.bgClass}`} id="db-status-badge">
      <span className={`w-2 h-2 rounded-full ${cfg.dotClass}`} />
      {cfg.label}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stats Card Component (Theme compatible, hover effects, larger fonts)
// ---------------------------------------------------------------------------

function StatCard({ icon, title, value, subtext, highlight = false, loading = false }) {
  return (
    <div className={`rounded-2xl border border-theme-border/40 p-5 bg-theme-sidebar/40 backdrop-blur-md hover:border-theme-accent/50 hover:bg-theme-sidebar/60 hover-lift shadow-md hover:shadow-lg hover:shadow-theme-accent/5 theme-transition-all flex items-start gap-4`} id={`stat-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
        highlight
          ? 'bg-gradient-to-br from-theme-accent to-theme-accent/70 text-white shadow-md shadow-theme-accent/15'
          : 'bg-theme-card border border-theme-border/25 text-theme-text-muted'
      }`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">{title}</p>
        {loading ? (
          <div className="h-7 w-24 mt-1.5 rounded-md bg-theme-border/20 animate-pulse" />
        ) : (
          <p className="text-2xl font-extrabold text-white mt-1 tracking-tight truncate">{value}</p>
        )}
        {subtext && <p className="text-xs text-theme-text-muted mt-1 truncate">{subtext}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toast Component
// ---------------------------------------------------------------------------

function Toast({ toast, onClose }) {
  const isSuccess = toast.type === 'success';

  return (
    <div className={`animate-slide-in-right flex items-start gap-3.5 px-5 py-4 rounded-xl border shadow-xl backdrop-blur-md max-w-sm w-full transition-all duration-300 ${
      isSuccess
        ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100'
        : 'bg-red-950/90 border-red-500/30 text-red-100'
    }`}>
      <div className="flex-shrink-0 mt-0.5">
        {isSuccess ? <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0" /> : <ExclamationIcon className="w-5 h-5 text-red-400 shrink-0" />}
      </div>
      <div className="flex-1 min-w-0 font-sans">
        <p className="text-sm font-bold tracking-tight text-white">{isSuccess ? 'Success' : 'Error'}</p>
        <p className="text-xs sm:text-sm mt-0.5 opacity-90 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className={`flex-shrink-0 p-1 rounded-lg transition-colors duration-150 cursor-pointer ${
          isSuccess ? 'hover:bg-emerald-800/40 text-emerald-400' : 'hover:bg-red-800/40 text-red-400'
        }`}
        aria-label="Dismiss toast"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Confirmation Dialog
// ---------------------------------------------------------------------------

function ConfirmDialog({ isOpen, onConfirm, onCancel, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="confirm-clear-dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      {/* Modal */}
      <div className="relative bg-theme-sidebar border border-theme-border/60 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
        {/* Decorative top bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-t-2xl" />

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400">
            <TrashIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Clear Vector Database</h3>
            <p className="text-sm text-theme-text-muted mt-1 leading-relaxed">
              This will permanently delete <span className="font-semibold text-white">all vectors</span> from the <span className="font-mono text-xs text-theme-accent">reference_knowledge_base</span> collection. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-theme-text bg-theme-card border border-theme-border/80 hover:bg-theme-card-hover hover:border-theme-accent/50 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id="btn-cancel-clear"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-md shadow-red-600/15 hover:shadow-lg hover:shadow-red-600/25 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
            id="btn-confirm-clear"
          >
            {isLoading ? (
              <>
                <SpinnerIcon className="w-4 h-4 text-white" />
                Clearing...
              </>
            ) : (
              <>
                <TrashIcon className="w-4 h-4" />
                Clear All Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export function VectorDatabasePage() {
  const {
    status,
    isLoadingStatus,
    fetchStatus,
    source,
    setSource,
    isIndexing,
    progress,
    progressStep,
    indexResult,
    lastIndexedTime,
    indexEmbeddings,
    isClearing,
    clearDatabase,
    toasts,
    dismissToast,
  } = useVectorStore();

  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleIndex = (e) => {
    e.preventDefault();
    indexEmbeddings(source);
  };

  const handleClearConfirm = async () => {
    await clearDatabase();
    setShowClearDialog(false);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" id="vector-database-page">
      {/* Background Mesh styling */}
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-theme-accent/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-8 animate-fade-in">

        {/* ── Page Header ── */}
        <div className="backdrop-blur-md bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 theme-transition-all" id="vector-store-header">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-theme-accent bg-theme-accent/10 border border-theme-accent/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Module 6 Service
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Vector Database
            </h1>
            <p className="text-sm text-theme-text-muted mt-1.5 leading-relaxed max-w-xl">
              Manage semantic vector storage using ChromaDB. Load embedding coordinates into indexing schemas.
            </p>
          </div>
          <StatusBadge status={status.dbStatus} />
        </div>

        {/* ── Dashboard Statistics Cards (2x2 Matrix Grid with Hover Effects) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="vector-stats-cards">
          <StatCard
            icon={<DatabaseIcon />}
            title="Collection Name"
            value={status.collectionName}
            subtext="ChromaDB collection"
            highlight
            loading={isLoadingStatus}
          />
          <StatCard
            icon={<CubeIcon />}
            title="Stored Vectors"
            value={status.numberOfVectors > 0 ? status.numberOfVectors.toLocaleString() : '0'}
            subtext="Indexed embeddings"
            loading={isLoadingStatus}
          />
          <StatCard
            icon={<DimensionIcon />}
            title="Embedding Dimension"
            value={status.embeddingDimension || '—'}
            subtext="Vector feature space"
            loading={isLoadingStatus}
          />
          <StatCard
            icon={<SignalIcon />}
            title="Database Status"
            value={status.dbStatus === 'healthy' ? 'Online' : status.dbStatus === 'indexing' ? 'Indexing' : 'Offline'}
            subtext={status.databaseLocation}
            loading={isLoadingStatus}
          />
        </div>

        {/* ── Main Controls & Details ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Panel: Collection Details + Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Collection Details Card */}
            <div className="bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in" id="collection-details-card">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Collection Details</h3>
                <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
                  ChromaDB persistent vector collection configuration and controls.
                </p>
              </div>

              {/* Collection Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-theme-border/30 bg-theme-card/30 hover:border-theme-accent/40 hover:bg-theme-card/45 transition-all duration-200 cursor-pointer">
                  <span className="text-xs font-medium text-theme-text-muted">Collection Name</span>
                  <span className="text-xs font-mono font-semibold text-theme-accent">{status.collectionName}</span>
                </div>
              </div>

              {/* Source Select & Index */}
              <form onSubmit={handleIndex} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="vs-source-select" className="text-xs font-semibold text-theme-text">
                    Data Source
                  </label>
                  <div className="relative">
                    <select
                      id="vs-source-select"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      disabled={isIndexing}
                      className="w-full rounded-xl border border-theme-border/50 bg-theme-card/30 px-4 py-3 pr-10 text-sm text-theme-text hover:border-theme-accent/40 hover:bg-theme-card/45 focus:outline-none focus:ring-2 focus:ring-theme-accent/15 focus:border-theme-accent focus:bg-theme-card/65 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                    >
                      <option value="">Select source...</option>
                      <option value="truthfulqa">TruthfulQA</option>
                      <option value="squad">SQuAD</option>
                      <option value="uploaded_document">Uploaded Documents</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-theme-text-muted">
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={!source || isIndexing}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-theme-accent hover:brightness-110 shadow-sm shadow-theme-accent/15 hover:shadow-md hover:shadow-theme-accent/30 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
                    id="btn-index-embeddings"
                  >
                    {isIndexing ? (
                      <>
                        <SpinnerIcon className="w-4.5 h-4.5 text-white" />
                        Indexing...
                      </>
                    ) : (
                      <>
                        <PlayIcon />
                        Index Embeddings
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={fetchStatus}
                    disabled={isIndexing || isLoadingStatus}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-theme-text bg-theme-card border border-theme-border/50 hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-155 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm cursor-pointer"
                    id="btn-refresh-status"
                  >
                    {isLoadingStatus ? (
                      <>
                        <SpinnerIcon className="w-4 h-4" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <ArrowPathIcon />
                        Refresh Status
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowClearDialog(true)}
                    disabled={isIndexing || isClearing || status.numberOfVectors === 0}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-red-400 bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-155 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-sm cursor-pointer"
                    id="btn-clear-database"
                  >
                    <TrashIcon />
                    Clear Database
                  </button>
                </div>
              </form>
            </div>

            {/* Statistics Info Panel */}
            <div className="backdrop-blur-md bg-theme-sidebar/45 border border-theme-border/40 rounded-2xl p-5 shadow-sm space-y-3" id="statistics-panel">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Statistics</h4>
              <ul className="text-xs text-theme-text-muted space-y-2.5">
                <li className="flex justify-between border-b border-theme-border/20 pb-1.5 hover:text-white transition-colors duration-150">
                  <span className="flex items-center gap-1.5">
                    <DocumentIcon className="w-3.5 h-3.5" />
                    Indexed Documents
                  </span>
                  <span className="font-semibold text-theme-text">
                    {indexResult ? indexResult.indexedDocuments.toLocaleString() : '—'}
                  </span>
                </li>
                <li className="flex justify-between border-b border-theme-border/20 pb-1.5 hover:text-white transition-colors duration-150">
                  <span className="flex items-center gap-1.5">
                    <ArchiveIcon className="w-3.5 h-3.5" />
                    Total Storage
                  </span>
                  <span className="font-semibold text-theme-text">
                    {status.numberOfVectors > 0 ? `${status.numberOfVectors} vectors` : '—'}
                  </span>
                </li>
                <li className="flex justify-between hover:text-white transition-colors duration-150">
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5" />
                    Last Indexed
                  </span>
                  <span className="font-semibold text-theme-text text-right max-w-[55%] truncate">
                    {lastIndexedTime || '—'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel: Progress / Results / Empty State */}
          <div className="lg:col-span-2 space-y-6">

            {/* ── Progress Bar & Active State ── */}
            {isIndexing && (
              <div className="bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden transition-all duration-300" id="indexing-progress">
                {/* Decorative glowing gradient border */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-theme-accent via-purple-500 to-theme-accent animate-pulse" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-theme-card border border-theme-border/25 flex items-center justify-center text-theme-accent shrink-0 animate-pulse">
                        <SpinnerIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Indexing Pipeline Active</h4>
                        <p className="text-xs text-theme-text-muted mt-0.5">Storing vectors in ChromaDB...</p>
                      </div>
                    </div>
                    <span className="text-lg font-extrabold text-theme-accent font-mono">{progress}%</span>
                  </div>

                  {/* Horizontal progress bar */}
                  <div className="w-full bg-theme-card border border-theme-border/30 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-theme-accent h-full rounded-full transition-all duration-300 ease-out shadow-sm shadow-theme-accent/35"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Active Step */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-theme-accent font-medium animate-pulse">{progressStep}</span>
                    <span className="text-theme-text-muted font-mono uppercase tracking-wider">ChromaDB</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Results Panel ── */}
            {!isIndexing && indexResult && (
              <div className="bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6" id="indexing-results">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Indexing Results</h3>
                  <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
                    Summary of the last vector indexing operation into ChromaDB.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-theme-card/30 border border-theme-border/30 rounded-xl p-4.5 text-center hover:border-theme-accent/40 transition-all duration-200 cursor-pointer">
                    <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Indexed Documents</p>
                    <p className="text-2xl font-extrabold text-theme-accent mt-1">{indexResult.indexedDocuments.toLocaleString()}</p>
                  </div>

                  <div className="bg-theme-card/30 border border-theme-border/30 rounded-xl p-4.5 text-center hover:border-theme-accent/40 transition-all duration-200 cursor-pointer">
                    <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Total Vectors</p>
                    <p className="text-2xl font-extrabold text-theme-accent mt-1">{indexResult.totalVectors.toLocaleString()}</p>
                  </div>

                  <div className="bg-theme-card/30 border border-theme-border/30 rounded-xl p-4.5 text-center hover:border-theme-accent/40 transition-all duration-200 cursor-pointer">
                    <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Indexing Time</p>
                    <div className="flex items-center justify-center gap-1.5 mt-1 text-theme-accent">
                      <ClockIcon className="w-5 h-5 shrink-0" />
                      <p className="text-2xl font-extrabold">{indexResult.indexingTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-theme-border/30 bg-emerald-500/5 text-xs text-emerald-400 leading-relaxed flex gap-3">
                  <div className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block mb-0.5 text-white">Indexing Complete</span>
                    {indexResult.indexedDocuments} embedding vector(s) have been stored in the <span className="font-mono text-theme-accent">{indexResult.collection}</span> collection. Duplicate chunk IDs were automatically skipped.
                  </div>
                </div>
              </div>
            )}

            {/* ── Collection Overview (when idle and has vectors with Hover Effects) ── */}
            {!isIndexing && !indexResult && status.numberOfVectors > 0 && (
              <div className="bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6" id="collection-overview">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Collection Overview</h3>
                    <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
                      Current state of the <span className="font-mono text-theme-accent">{status.collectionName}</span> collection.
                    </p>
                  </div>
                  <StatusBadge status={status.dbStatus} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-theme-card/30 border border-theme-border/30 hover:border-theme-accent/40 hover:bg-theme-card/45 transition-all duration-200 cursor-pointer shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center text-theme-accent shrink-0">
                      <ServerIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Storage Engine</p>
                      <p className="text-sm font-bold text-white mt-0.5">ChromaDB Persistent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-theme-card/30 border border-theme-border/30 hover:border-theme-accent/40 hover:bg-theme-card/45 transition-all duration-200 cursor-pointer shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center text-theme-accent shrink-0">
                      <ShieldCheckIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Similarity Metric</p>
                      <p className="text-sm font-bold text-white mt-0.5">Cosine Distance</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-theme-border/30 bg-theme-accent/5 text-xs text-theme-text-muted leading-relaxed flex gap-3">
                  <div className="w-5 h-5 rounded-md bg-theme-accent/10 flex items-center justify-center shrink-0 text-theme-accent">
                    <DatabaseIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block mb-0.5 text-white">Database Active</span>
                    {status.numberOfVectors.toLocaleString()} vector(s) stored at <span className="font-mono text-theme-accent">{status.databaseLocation}</span>. Select a source and click "Index Embeddings" to add more data.
                  </div>
                </div>
              </div>
            )}

            {/* ── Empty State (no vectors, no result, not indexing) ── */}
            {!isIndexing && !indexResult && status.numberOfVectors === 0 && (
              <div className="bg-theme-sidebar/35 border border-theme-border/40 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4" id="vector-store-empty">
                <div className="w-16 h-16 rounded-full bg-theme-card/40 flex items-center justify-center text-theme-text-muted border border-theme-border/50 shadow-inner">
                  <DatabaseIcon className="w-8 h-8 opacity-65 text-theme-accent" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h4 className="text-sm font-semibold text-white">No Vectors Indexed</h4>
                  <p className="text-xs text-theme-text-muted leading-relaxed">
                    Select a data source in the left panel and click "Index Embeddings" to store semantic vectors into ChromaDB. Collection status and metrics will appear here.
                  </p>
                </div>
              </div>
            )}

            {/* ── Database Architecture Info (with Hover effects) ── */}
            <div className="backdrop-blur-md bg-theme-sidebar/45 border border-theme-border/40 rounded-2xl p-5 shadow-sm space-y-3" id="db-architecture-info">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Database Configuration</h4>
              <ul className="text-xs text-theme-text-muted space-y-2.5">
                <li className="flex justify-between border-b border-theme-border/20 pb-1.5 hover:text-white transition-colors duration-150">
                  <span className="text-theme-text-muted font-medium">Engine</span>
                  <span className="font-semibold text-white">ChromaDB (Persistent)</span>
                </li>
                <li className="flex justify-between border-b border-theme-border/20 pb-1.5 hover:text-white transition-colors duration-150">
                  <span className="text-theme-text-muted font-medium">Index Type</span>
                  <span className="font-semibold text-white">HNSW</span>
                </li>
                <li className="flex justify-between border-b border-theme-border/20 pb-1.5 hover:text-white transition-colors duration-150">
                  <span className="text-theme-text-muted font-medium">Distance Metric</span>
                  <span className="font-semibold text-white">Cosine</span>
                </li>
                <li className="flex justify-between hover:text-white transition-colors duration-150">
                  <span className="text-theme-text-muted font-medium">Persist Path</span>
                  <span className="font-semibold text-white font-mono text-right max-w-[55%] truncate">{status.databaseLocation}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Confirmation Dialog ── */}
      <ConfirmDialog
        isOpen={showClearDialog}
        onConfirm={handleClearConfirm}
        onCancel={() => setShowClearDialog(false)}
        isLoading={isClearing}
      />

      {/* ── Notification Toasts ── */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0" id="vector-store-toasts">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismissToast} />
          ))}
        </div>
      )}
    </section>
  );
}

export default VectorDatabasePage;
