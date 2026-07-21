import { useState, useEffect } from 'react';
import { useChunking } from '../hooks/useChunking';

// ---------------------------------------------------------------------------
// Inline Premium Icons
// ---------------------------------------------------------------------------

function DatabaseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function LayersIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-1.756c.235-.083.487-.128.75-.128H18c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 12v.878m13.5-1.756c.235-.083.487-.128.75-.128H18c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 15v.878m13.5-1.756c.235-.083.487-.128.75-.128H18c.263 0 .515.045.75.128M4.5 18a2.25 2.25 0 0 0 2.25 2.25h10.5A2.25 2.25 0 0 0 19.5 18v-.878" />
    </svg>
  );
}

function BarChartIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function StatusIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 0 1 0-5.303m5.304 0a3.75 3.75 0 0 1 0 5.303m-7.425 2.122a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894a9.75 9.75 0 0 1 0-13.788m13.788 0a9.75 9.75 0 0 1 0 13.788" />
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

function PlayIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>
  );
}

function TrashIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

function DocumentTextIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
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

// ---------------------------------------------------------------------------
// Stats Card Sub-Component (Theme compatible, hover effects)
// ---------------------------------------------------------------------------

function MetricCard({ icon, title, value, subtext, accent = false }) {
  return (
    <div className="rounded-2xl border border-theme-border/40 p-5 bg-theme-sidebar/40 backdrop-blur-md hover:border-theme-accent/50 hover:bg-theme-sidebar/60 hover-lift shadow-md hover:shadow-lg hover:shadow-theme-accent/5 theme-transition-all flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
        accent
          ? 'bg-gradient-to-br from-theme-accent to-theme-accent/70 text-white shadow-md shadow-theme-accent/15'
          : 'bg-theme-card border border-theme-border/25 text-theme-text-muted'
      }`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-white mt-1 tracking-tight truncate">{value}</p>
        {subtext && <p className="text-xs text-theme-text-muted mt-1 truncate">{subtext}</p>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toast Notification Sub-Component
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
// Main Page Component
// ---------------------------------------------------------------------------

export function DocumentChunkingPage() {
  const {
    source,
    setSource,
    isProcessing,
    progress,
    progressStep,
    results,
    toasts,
    datasetStatus,
    statusLoading,
    dismissToast,
    fetchDatasetStatus,
    clearResults,
    generateChunks
  } = useChunking();

  // Collapsed states for the first 3 chunks preview: {0: false/true, 1: false/true, 2: false/true}
  const [collapsedChunks, setCollapsedChunks] = useState({ 0: false, 1: false, 2: false });
  const [isAutomated, setIsAutomated] = useState(true);

  // Fetch baseline dataset status on component load
  useEffect(() => {
    fetchDatasetStatus();
  }, [fetchDatasetStatus]);

  // Expand all previews if results load
  useEffect(() => {
    if (results?.preview) {
      setCollapsedChunks({ 0: false, 1: false, 2: false });
    }
  }, [results]);

  const toggleCollapse = (idx) => {
    setCollapsedChunks((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Determine dynamic stats values
  const getDocCount = () => {
    if (statusLoading) return '...';
    if (source === 'truthfulqa') return datasetStatus.truthfulqa_records.toLocaleString();
    if (source === 'squad') return datasetStatus.squad_records.toLocaleString();
    if (source === 'uploaded_document') return '1'; // sample_document.txt
    
    // Default: Return loaded benchmark + uploaded documents total
    const total = datasetStatus.truthfulqa_records + datasetStatus.squad_records + (datasetStatus.uploaded_files_count || 1);
    return total.toLocaleString();
  };

  const getDocSubtext = () => {
    if (source === 'truthfulqa') return 'TruthfulQA Benchmark questions';
    if (source === 'squad') return 'SQuAD v2 Q&A pairs';
    if (source === 'uploaded_document') return 'Uploaded text files';
    return 'Combined documents database';
  };

  const getStatusText = () => {
    if (isProcessing) return 'Processing...';
    if (results) return 'Completed';
    return 'Idle';
  };

  const getStatusColorClass = () => {
    if (isProcessing) return 'bg-blue-500 dot-pulse';
    if (results) return 'bg-emerald-500';
    return 'bg-slate-400';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateChunks(source, isAutomated);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" id="document-chunking-page">
      {/* Background patterns matching enterprise AI style */}
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-theme-accent/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* ── Page Header (Centered) ── */}
        <div className="backdrop-blur-md bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 theme-transition-all">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-theme-accent bg-theme-accent/10 border border-theme-accent/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pipeline Ingestion
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Document Chunking
            </h1>
            <p className="text-sm text-theme-text-muted mt-1.5 leading-relaxed max-w-xl">
              Prepare benchmark datasets and uploaded documents for embedding generation. Split large documents into standardized context blocks.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-theme-text-muted bg-theme-card/30 px-3 py-1.5 rounded-lg border border-theme-border/20 self-start md:self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-pulse"></span>
            Embedding Pre-processor
          </div>
        </div>

        {/* ── Dashboard Metrics Row (2x2 Matrix Layout) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="chunking-dashboard-metrics">
          <MetricCard
            icon={<DocumentTextIcon />}
            title="Total Documents"
            value={getDocCount()}
            subtext={getDocSubtext()}
            accent={!!source}
          />
          <MetricCard
            icon={<LayersIcon />}
            title="Total Chunks"
            value={results ? results.totalChunks.toLocaleString() : '—'}
            subtext={results ? 'Generated in last run' : 'Awaiting execution'}
          />
          <MetricCard
            icon={<BarChartIcon />}
            title="Average Chunk Size"
            value={results ? `${results.averageChunkSize} chars` : '—'}
            subtext={results ? 'Average length' : 'Awaiting execution'}
          />
          <MetricCard
            icon={<StatusIcon />}
            title="Processing Status"
            value={getStatusText()}
            subtext={
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${getStatusColorClass()}`} />
                System ready
              </span>
            }
          />
        </div>

        {/* ── Main controls & Processing ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Chunk Processing</h3>
                <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
                  Select a registered benchmark dataset or choose local uploaded folders to run the text parsing pipeline.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="source-select" className="text-xs font-semibold text-theme-text">
                    Select Data Source
                  </label>
                  <div className="relative">
                    <select
                      id="source-select"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      disabled={isProcessing}
                      className="w-full rounded-xl border border-theme-border/50 bg-theme-card/30 px-4 py-3 pr-10 text-sm text-theme-text hover:border-theme-accent/40 hover:bg-theme-card/45 focus:outline-none focus:ring-2 focus:ring-theme-accent/15 focus:border-theme-accent focus:bg-theme-card/65 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                    >
                      <option value="">Select source...</option>
                      <option value="truthfulqa">TruthfulQA Benchmark</option>
                      <option value="squad">SQuAD v2 Dataset</option>
                      <option value="uploaded_document">Uploaded Documents</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-theme-text-muted">
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* ── AUTOMATED PIPELINE CHAIN INGESTION TOGGLE ── */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-theme-border/30 bg-theme-card/30 hover:border-theme-accent/40 hover:bg-theme-card/45 transition-all duration-205 cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white">Automated Pipeline</p>
                    <p className="text-[10px] text-theme-text-muted">Auto-embed & index into ChromaDB</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAutomated}
                      onChange={(e) => setIsAutomated(e.target.checked)}
                      disabled={isProcessing}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-theme-card peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-theme-text-muted after:border-theme-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-theme-accent peer-checked:after:bg-white"></div>
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    type="submit"
                    disabled={!source || isProcessing}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-theme-accent hover:brightness-110 shadow-sm shadow-theme-accent/15 hover:shadow-md hover:shadow-theme-accent/30 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
                    id="btn-generate-chunks"
                  >
                    {isProcessing ? (
                      <>
                        <SpinnerIcon className="w-4.5 h-4.5 text-white" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PlayIcon />
                        Generate Chunks
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={clearResults}
                    disabled={isProcessing || (!results && !source)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-theme-text bg-theme-card border border-theme-border/50 hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-155 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm cursor-pointer"
                    id="btn-clear-results"
                  >
                    <TrashIcon />
                    Clear Results
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Details / Preview / Progress Column (Right) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ── Processing Animation and Progress Indicator ── */}
            {isProcessing && (
              <div className="bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden transition-all duration-300">
                {/* Decorative glowing gradient border */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-theme-accent via-blue-500 to-theme-accent animate-pulse" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-theme-card border border-theme-border/25 flex items-center justify-center text-theme-accent animate-pulse shrink-0">
                        <SpinnerIcon className="w-5 h-5 text-theme-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Ingestion Pipeline Active</h4>
                        <p className="text-xs text-theme-text-muted mt-0.5">Running automated sequence...</p>
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
                    <span className="text-theme-text-muted font-mono uppercase tracking-wider">RecursiveCharacterSplitter</span>
                  </div>
                  
                  {/* Micro Node network background design */}
                  <div className="border-t border-theme-border/20 pt-4 flex items-center justify-around gap-1.5">
                    {[
                      { num: 1, label: 'Ingest & Chunk' },
                      { num: 2, label: 'Vector Embed' },
                      { num: 3, label: 'DB Index' }
                    ].map((step) => {
                      const isActive = progress >= (step.num === 1 ? 5 : step.num === 2 ? 35 : 70);
                      return (
                        <div key={step.num} className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive
                              ? 'bg-theme-accent text-white shadow-sm'
                              : 'bg-theme-card text-theme-text-muted border border-theme-border/30'
                          }`}>
                            {step.num}
                          </span>
                          <span className={`text-xs ${isActive ? 'font-semibold text-white' : 'text-theme-text-muted'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Results preview panel ── */}
            {!isProcessing && results && (
              <div className="space-y-6">
                
                {/* Stats recap header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl p-5 shadow-sm">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Partition Results</h3>
                    <p className="text-xs text-theme-text-muted mt-1">
                      Showing metrics and first 3 chunk previews generated.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-theme-card/30 border border-theme-border/20 rounded-xl px-4 py-2 text-center min-w-[90px]">
                      <p className="text-[10px] uppercase font-bold text-theme-text-muted">Total Chunks</p>
                      <p className="text-base font-extrabold text-white mt-0.5">{results.totalChunks.toLocaleString()}</p>
                    </div>
                    <div className="bg-theme-card/30 border border-theme-border/20 rounded-xl px-4 py-2 text-center min-w-[90px]">
                      <p className="text-[10px] uppercase font-bold text-theme-text-muted">Avg Size</p>
                      <p className="text-base font-extrabold text-white mt-0.5">{results.averageChunkSize}ch</p>
                    </div>
                  </div>
                </div>

                {/* Documents Processed Summary */}
                {results.documentSummary && results.documentSummary.length > 0 && (
                  <div className="bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl p-5 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Documents Ingestion Breakdown</h4>
                    <div className="max-h-[180px] overflow-y-auto scrollbar-thin border border-theme-border/20 rounded-xl divide-y divide-theme-border/20">
                      {results.documentSummary.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between px-4 py-2.5 text-xs hover:bg-theme-card/20 transition-colors">
                          <span className="font-semibold text-theme-text truncate max-w-[320px]" title={doc.document_name}>
                            {doc.document_name}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-[10px] font-bold text-theme-accent">
                            {doc.chunk_count} {doc.chunk_count === 1 ? 'chunk' : 'chunks'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chunks List */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-theme-text-muted uppercase tracking-wider">First Three Chunks Preview</h4>
                  
                  {results.preview && results.preview.length > 0 ? (
                    results.preview.map((chunk, idx) => {
                      const isCollapsed = collapsedChunks[idx] ?? false;
                      return (
                        <div
                          key={chunk.chunk_id}
                          className="bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          {/* Collapsible Header */}
                          <div
                            onClick={() => toggleCollapse(idx)}
                            className="bg-theme-card/25 hover:bg-theme-card/45 px-5 py-4 border-b border-theme-border/20 flex items-center justify-between cursor-pointer select-none transition-colors duration-150"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-theme-accent/10 text-theme-accent font-mono text-xs font-bold shrink-0">
                                #{idx + 1}
                              </span>
                              <div className="min-w-0">
                                <h4 className="text-sm font-semibold text-white truncate">
                                  Chunk Index {chunk.chunk_index}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-theme-text-muted">
                                  <span className="font-mono bg-theme-card px-1.5 py-0.2 rounded font-medium border border-theme-border/20">
                                    {chunk.metadata.chunk_size} chars
                                  </span>
                                  <span>•</span>
                                  <span className="truncate">Source: <span className="font-medium text-theme-text">{chunk.metadata.document_name}</span></span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-theme-text-muted uppercase tracking-wider shrink-0 bg-theme-card px-2 py-0.5 rounded border border-theme-border/20">
                                {chunk.source}
                              </span>
                              <div className={`text-theme-text-muted transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}>
                                <ChevronDownIcon className="w-4.5 h-4.5" />
                              </div>
                            </div>
                          </div>

                          {/* Collapsible Body */}
                          {!isCollapsed && (
                            <div className="p-5 space-y-4 bg-transparent animate-fade-in">
                              <div className="bg-theme-card/20 rounded-xl p-4 border border-theme-border/20">
                                <p className="text-xs font-mono text-theme-text-muted uppercase tracking-wider mb-2">Chunk Text Content</p>
                                <p className="text-sm text-theme-text leading-relaxed font-sans whitespace-pre-wrap selection:bg-theme-accent/20">
                                  {chunk.text}
                                </p>
                              </div>

                              {/* Chunk Metadata Details */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-theme-border/20 pt-4 text-xs">
                                <div>
                                  <span className="text-theme-text-muted block mb-0.5">Parent Document ID</span>
                                  <span className="font-mono text-theme-text/80 select-all">{chunk.document_id}</span>
                                </div>
                                <div>
                                  <span className="text-theme-text-muted block mb-0.5">Chunk ID</span>
                                  <span className="font-mono text-theme-text/80 select-all">{chunk.chunk_id}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-theme-sidebar/40 border border-theme-border/30 border-dashed rounded-2xl p-8 text-center">
                      <p className="text-sm text-theme-text-muted">Zero chunks generated. Verify dataset loaders are operational.</p>
                    </div>
                  )}
                </div>

                {/* ── Automated Ingestion Status Banner ── */}
                {results.pipelineChained && (
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-400 leading-relaxed flex gap-3 shadow-md">
                    <div className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold block mb-0.5 text-white">Automated Ingestion Pipeline Success</span>
                      Ingested {results.totalChunks} chunks, vectorized via SentenceTransformer model, and indexed {results.embeddingsGenerated} embeddings inside ChromaDB vector store collection <span className="font-mono text-white font-semibold">&ldquo;{results.collection}&rdquo;</span>.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty state (when idle and no results) */}
            {!isProcessing && !results && (
              <div className="bg-theme-sidebar/40 border border-theme-border/30 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-theme-card flex items-center justify-center text-theme-text-muted border border-theme-border/20 shadow-inner">
                  <LayersIcon className="w-8 h-8 opacity-65 text-theme-text-muted" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="text-sm font-semibold text-white">Awaiting Chunking Command</h4>
                  <p className="text-xs text-theme-text-muted leading-relaxed">
                    Select a source data pipeline in the Left panel and trigger the ingestion pipeline. Previews will display here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Info panel (Centered & Bottom) ── */}
        <div className="backdrop-blur-md bg-theme-sidebar/45 border border-theme-border/40 rounded-2xl p-6 shadow-sm text-center flex flex-col items-center justify-center space-y-3 mt-8 max-w-2xl mx-auto hover-lift theme-transition-all">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Chunking Protocol</h4>
          <p className="text-xs text-theme-text-muted leading-relaxed max-w-lg">
            Text is split recursively using parameters:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-theme-text-muted">
            <span><span className="font-semibold text-white/95">Chunk Size:</span> 500 characters max</span>
            <span>•</span>
            <span><span className="font-semibold text-white/95">Chunk Overlap:</span> 100 characters</span>
            <span>•</span>
            <span><span className="font-semibold text-white/95">Separators:</span> Paragraphs, sentences, spaces</span>
          </div>
        </div>

      </div>

      {/* ── Notification Toasts ── */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0" id="chunking-toasts">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismissToast} />
          ))}
        </div>
      )}
    </section>
  );
}

export default DocumentChunkingPage;
