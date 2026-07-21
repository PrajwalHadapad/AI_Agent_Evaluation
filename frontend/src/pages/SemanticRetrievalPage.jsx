import { useState } from 'react';
import { useRetrieval } from '../hooks/useRetrieval';

// ---------------------------------------------------------------------------
// Premium Inline Icons
// ---------------------------------------------------------------------------

function SearchIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function DatabaseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function CPUChipIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m10.5-5.25v1.5M3 12h1.5m15 0h-1.5m-15 3.75H3m16.5 0h-1.5M8.25 19.5V21m5.25-1.5V21m-9-15h12a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5.25A1.5 1.5 0 0 1 3.75 18V7.5A1.5 1.5 0 0 1 5.25 6ZM9 9h6v6H9V9Z" />
    </svg>
  );
}

function ModelIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21m0 0-.813-5.096M9 21h8m-1.813-5.096L16 21m0 0h.812m-6.425-9.351a3.75 3.75 0 1 1-5.3 5.3 3.75 3.75 0 0 1 5.3-5.3Zm10.596 0a3.75 3.75 0 1 1-5.3 5.3 3.75 3.75 0 0 1 5.3-5.3Z" />
    </svg>
  );
}

function ListBulletIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-3.75 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

function SparklesIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096L9 21h8m-1.813-5.096L16 21m0 0h.812m-6.425-9.351a3.75 3.75 0 115.3 5.3L9 16.5m-3 0a3.75 3.75 0 110-7.5l3 3.75M9 16.5l3-3.75m4.5-6a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0ZM6 9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0Z" />
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

function DocumentIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function TagIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.16 3.659A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.007v.008H6V7.5z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function RefreshIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Stat Card Component
// ---------------------------------------------------------------------------

function StatCard({ icon, title, value, subtext, highlight = false, loading = false }) {
  return (
    <div className="bg-theme-sidebar/45 border border-theme-border/40 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover-lift theme-transition-all duration-200">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        highlight
          ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20'
          : 'bg-theme-sidebar border border-theme-border text-theme-accent'
      }`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider">{title}</p>
        {loading ? (
          <div className="h-7 w-24 mt-1.5 rounded-md skeleton-shimmer bg-theme-card" />
        ) : (
          <p className="text-xl sm:text-2xl font-bold text-theme-text mt-1 tracking-tight truncate">{value}</p>
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
  const isWarning = toast.type === 'warning';

  let iconBg = 'bg-emerald-500/10 text-emerald-400';
  let icon = <CheckIcon className="w-4.5 h-4.5" />;
  
  if (isWarning) {
    iconBg = 'bg-amber-500/10 text-amber-400';
    icon = <ExclamationIcon className="w-4.5 h-4.5" />;
  } else if (!isSuccess) {
    iconBg = 'bg-red-500/10 text-red-400';
    icon = <ExclamationIcon className="w-4.5 h-4.5" />;
  }

  return (
    <div className="animate-slide-in-right flex items-start gap-3.5 px-5 py-4 rounded-xl shadow-xl border bg-theme-sidebar/95 backdrop-blur-md max-w-sm w-full border-theme-border/60">
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-theme-text">
          {isSuccess ? 'Success' : isWarning ? 'Notice' : 'Error'}
        </p>
        <p className="text-xs text-theme-text-muted mt-0.5 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 p-1 rounded-lg text-theme-text-muted hover:bg-theme-card-hover hover:text-theme-text transition-colors cursor-pointer"
        aria-label="Dismiss toast"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ripple Hook / Button Component
// ---------------------------------------------------------------------------

function ButtonRipple({ children, onClick, disabled, className = '', id }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      style: {
        width: size,
        height: size,
        left: x - size / 2,
        top: y - size / 2,
      },
    };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      disabled={disabled}
      className={`btn-ripple-container select-none ${className}`}
    >
      {ripples.map((ripple) => (
        <span key={ripple.id} className="btn-ripple-span" style={ripple.style} />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Result Card Component
// ---------------------------------------------------------------------------

function ResultCard({ chunk, index }) {
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);

  // Cosine similarity coloring configuration
  const similarityPercent = Math.min(100, Math.max(0, Math.round(chunk.similarity_score * 100)));
  
  let scoreColorClass = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
  let barGradient = 'from-cyan-500 to-indigo-500';

  if (chunk.similarity_score > 0.85) {
    scoreColorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    barGradient = 'from-emerald-500 to-indigo-500';
  } else if (chunk.similarity_score < 0.65) {
    scoreColorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    barGradient = 'from-amber-500 to-indigo-500';
  }

  // Format chunk number cleanly from ID or index
  const chunkIndex = chunk.metadata?.chunk_index ?? index;

  return (
    <div className="bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 flex flex-col gap-5 hover:border-theme-accent/50 hover:bg-theme-sidebar/60 hover-lift shadow-md hover:shadow-lg hover:shadow-theme-accent/5 theme-transition-all transition-all duration-200">
      
      {/* Upper header segment */}
      <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white bg-indigo-500/20 border border-indigo-500/30 uppercase tracking-wide">
              {chunk.source || 'Knowledge'}
            </span>
            <span className="text-[11px] text-theme-text-muted font-mono bg-theme-bg/40 px-2 py-0.5 rounded border border-theme-border/20">
              Chunk #{chunkIndex}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-theme-text tracking-tight flex items-center gap-1.5 mt-1 truncate max-w-sm sm:max-w-md">
            <DocumentIcon className="w-4 h-4 text-theme-text-muted flex-shrink-0" />
            {chunk.document_name || 'Knowledge Resource'}
          </h4>
        </div>

        {/* Similarity score progress display */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold tracking-wider ${scoreColorClass}`}>
            Score: {chunk.similarity_score.toFixed(4)}
          </div>
          <span className="text-[10px] text-theme-text-muted tracking-wide uppercase">Rank #{index + 1}</span>
        </div>
      </div>

      {/* Score micro-chart bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-theme-text-muted">
          <span>Similarity alignment</span>
          <span className="font-semibold">{similarityPercent}%</span>
        </div>
        <div className="w-full bg-theme-bg/60 rounded-full h-1.5 overflow-hidden border border-theme-border/20">
          <div
            className={`bg-gradient-to-r ${barGradient} h-full rounded-full transition-all duration-500`}
            style={{ width: `${similarityPercent}%` }}
          />
        </div>
      </div>

      {/* Main Preview text body */}
      <div className="relative">
        <p className="text-xs sm:text-sm text-theme-text/90 leading-relaxed bg-theme-bg/25 border border-theme-border/20 rounded-xl p-4.5 font-sans select-all selection:bg-theme-accent/30 break-words max-h-56 overflow-y-auto whitespace-pre-wrap scrollbar-thin">
          {chunk.chunk_text}
        </p>
      </div>

      {/* Metadata Accordion Panel */}
      <div className="border-t border-theme-border/30 pt-4 mt-auto">
        <button
          onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
          className="flex items-center justify-between w-full text-xs font-semibold text-theme-text-muted hover:text-theme-text transition-colors cursor-pointer group"
        >
          <span className="flex items-center gap-1.5">
            <TagIcon className="w-3.5 h-3.5 text-theme-accent" />
            System Metadata Fields
          </span>
          <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${isMetadataExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isMetadataExpanded && (
          <div className="mt-3 bg-theme-bg/50 border border-theme-border/30 rounded-xl p-3.5 text-[11px] font-mono text-theme-text-muted overflow-x-auto space-y-2 max-h-48 overflow-y-auto">
            {chunk.chunk_id && (
              <div className="flex items-start justify-between gap-4 border-b border-theme-border/10 pb-1.5">
                <span className="text-theme-text/75 font-semibold">chunk_id</span>
                <span className="text-right text-theme-accent select-all">{chunk.chunk_id}</span>
              </div>
            )}
            {Object.entries(chunk.metadata || {}).map(([key, val]) => (
              <div key={key} className="flex items-start justify-between gap-4 border-b border-theme-border/10 last:border-0 pb-1.5 last:pb-0">
                <span className="text-theme-text/75 font-semibold">{key}</span>
                <span className="text-right truncate max-w-[70%]" title={typeof val === 'object' ? JSON.stringify(val) : String(val)}>
                  {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ---------------------------------------------------------------------------
// Main SemanticRetrievalPage Component
// ---------------------------------------------------------------------------

export function SemanticRetrievalPage() {
  const {
    status,
    isLoadingStatus,
    fetchStatus,
    query,
    setQuery,
    isSearching,
    searchResults,
    performSearch,
    clearSearch,
    toasts,
    dismissToast,
  } = useRetrieval();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" id="semantic-retrieval-page">
      
      {/* Aurora Neon Background Meshes */}
      <div className="absolute inset-0 hero-mesh pointer-events-none z-0" />
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/5 via-cyan-500/3 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-500/4 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-cyan-500/4 blur-[100px] pointer-events-none z-0" />

      <div className="relative max-w-6xl mx-auto space-y-8 animate-fade-in z-10">
        
        {/* ── Page Header ── */}
        <div className="backdrop-blur-md bg-theme-sidebar/45 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold text-theme-accent bg-theme-accent/10 border border-theme-accent/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Module 7 Pipeline
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-text tracking-tight">
              Semantic Retrieval
            </h1>
            <p className="text-sm text-theme-text-muted mt-1.5 leading-relaxed max-w-xl">
              Retrieve the most relevant knowledge chunks using semantic similarity search.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchStatus}
              disabled={isLoadingStatus || isSearching}
              className="p-2.5 rounded-xl bg-theme-card border border-theme-border/80 text-theme-text-muted hover:text-theme-text hover:border-theme-accent/40 hover:bg-theme-card-hover transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Refresh engine status"
            >
              <RefreshIcon className={`w-4 h-4 ${isLoadingStatus ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold text-theme-text bg-theme-card/55 px-3.5 py-2 rounded-xl border border-theme-border/40 shrink-0">
              <span className={`w-2 h-2 rounded-full ${status.dbStatus === 'healthy' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
              ChromaDB Core
            </div>
          </div>
        </div>

        {/* ── Statistics Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="retrieval-stats-cards">
          <StatCard
            icon={<DatabaseIcon />}
            title="Indexed Documents"
            value={status.totalIndexedDocuments > 0 ? status.totalIndexedDocuments.toLocaleString() : '0'}
            subtext="ChromaDB vector collection"
            highlight
            loading={isLoadingStatus}
          />
          <StatCard
            icon={<CPUChipIcon />}
            title="Collection Name"
            value={status.collectionName}
            subtext="ChromaDB schema"
            loading={isLoadingStatus}
          />
          <StatCard
            icon={<ModelIcon />}
            title="Embedding Model"
            value={status.modelName.split('/').pop()}
            subtext="MiniLM-L6 v2 engine"
            loading={isLoadingStatus}
          />
          <StatCard
            icon={<ListBulletIcon />}
            title="Top K Results"
            value={`${status.topK} items`}
            subtext="Cosine nearest neighbors"
            loading={isLoadingStatus}
          />
        </div>

        {/* ── Search Command Bar Card ── */}
        <div className="bg-theme-sidebar/55 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-md">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="space-y-2.5">
              <label htmlFor="search-input" className="text-xs font-bold text-theme-text/80 tracking-wide uppercase">
                Natural Language Query
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 flex items-center">
                  {/* Search Box */}
                  <input
                    id="search-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isSearching}
                    placeholder="Ask any question..."
                    className="w-full rounded-2xl border border-theme-border bg-theme-bg/40 py-4 pl-12 pr-12 text-base text-theme-text placeholder-theme-text-muted focus:outline-none focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:bg-theme-card-hover transition-all duration-200 custom-search-input"
                  />
                  
                  {/* Embedded left search icon */}
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-theme-text-muted">
                    <SearchIcon className="w-5 h-5 opacity-60" />
                  </div>

                  {/* Clear input button */}
                  {query && !isSearching && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-4 p-1.5 rounded-lg text-theme-text-muted hover:bg-theme-card-hover hover:text-theme-text transition-colors cursor-pointer"
                      aria-label="Clear query search"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Submit Action button outside input box */}
                <ButtonRipple
                  id="btn-retrieval-search"
                  type="submit"
                  disabled={!query.trim() || isSearching}
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-2xl cursor-pointer shadow-md disabled:opacity-55 disabled:cursor-not-allowed select-none shrink-0 custom-query-button"
                >
                  {isSearching ? (
                    <SpinnerIcon className="w-5 h-5 text-white" />
                  ) : (
                    <>
                      <span>Query</span>
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </>
                  )}
                </ButtonRipple>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-theme-text-muted pt-1">
              <span className="flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5 text-theme-accent" />
                Retrieving from <span className="font-mono text-[11px] text-theme-accent font-semibold">{status.collectionName}</span>
              </span>
              <span className="font-medium text-[11px]">Engine: sentence-transformers/all-MiniLM-L6-v2 (Cosine space)</span>
            </div>
          </form>
        </div>

        {/* ── Results Container Panel ── */}
        <div className="space-y-6">
          
          {/* Active query status header */}
          {searchResults && (
            <div className="flex items-center justify-between border-b border-theme-border/20 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-theme-text tracking-tight">
                  Search Results for "{searchResults.query}"
                </h3>
                <p className="text-xs text-theme-text-muted mt-0.5">
                  Showing top {searchResults.totalResults} matching chunks matching embedding query.
                </p>
              </div>
              <ButtonRipple
                onClick={clearSearch}
                className="px-3.5 py-1.5 bg-theme-card border border-theme-border text-xs text-theme-text rounded-xl hover:bg-theme-card-hover transition-colors font-semibold"
              >
                Clear Results
              </ButtonRipple>
            </div>
          )}

          {/* Loading Skeletons */}
          {isSearching && (
            <div className="max-h-[640px] overflow-y-auto pr-2 scrollbar-thin">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="retrieval-skeletons">
                {[...Array(status.topK)].map((_, i) => (
                  <div key={i} className="bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 space-y-4 animate-pulse">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-2 w-2/3">
                        <div className="h-3 bg-theme-card rounded w-1/4 skeleton-shimmer" />
                        <div className="h-4 bg-theme-card rounded w-3/4 skeleton-shimmer" />
                      </div>
                      <div className="h-6 bg-theme-card rounded w-1/5 skeleton-shimmer" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-theme-card rounded w-full skeleton-shimmer" />
                      <div className="h-3 bg-theme-card rounded w-full skeleton-shimmer" />
                      <div className="h-3 bg-theme-card rounded w-5/6 skeleton-shimmer" />
                    </div>
                    <div className="pt-4 border-t border-theme-border/20 h-4 bg-theme-card rounded w-1/3 skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results grid */}
          {!isSearching && searchResults && searchResults.results.length > 0 && (
            <div className="max-h-[640px] overflow-y-auto pr-2 scrollbar-thin animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="retrieval-results-grid">
                {searchResults.results.map((chunk, i) => (
                  <ResultCard key={chunk.chunk_id || i} chunk={chunk} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Zero results view */}
          {!isSearching && searchResults && searchResults.results.length === 0 && (
            <div className="bg-theme-sidebar/35 border border-theme-border/40 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-theme-card/40 flex items-center justify-center text-theme-text-muted border border-theme-border/50 shadow-inner">
                <SearchIcon className="w-8 h-8 opacity-65 text-theme-accent" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="text-sm font-semibold text-theme-text">No Semantic Matches Found</h4>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Your query didn't align with any chunked database embeddings. Try writing different keywords or indexing more sources first.
                </p>
              </div>
            </div>
          )}

          {/* Idle Empty State */}
          {!isSearching && !searchResults && (
            <div className="bg-theme-sidebar/35 border border-theme-border/40 border-dashed rounded-2xl p-16 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-theme-card/40 flex items-center justify-center text-theme-text-muted border border-theme-border/50 shadow-inner">
                <SearchIcon className="w-8 h-8 opacity-65 text-theme-accent animate-pulse" />
              </div>
              <div className="space-y-2 max-w-md">
                <h4 className="text-sm sm:text-base font-semibold text-theme-text">Semantic Search Ready</h4>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Submit a natural language question above. The MiniLM transformer model will convert it into a 384-dimension vector to retrieve the nearest neighbor knowledge records from ChromaDB.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ── Notification Toasts ── */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0" id="retrieval-toasts">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismissToast} />
          ))}
        </div>
      )}
      
    </section>
  );
}

export default SemanticRetrievalPage;
