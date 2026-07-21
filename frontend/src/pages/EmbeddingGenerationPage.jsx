import { useState, useEffect } from 'react';
import { useEmbedding } from '../hooks/useEmbedding';

// ---------------------------------------------------------------------------
// Premium Inline Icons
// ---------------------------------------------------------------------------

function CPUChipIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m10.5-5.25v1.5M3 12h1.5m15 0h-1.5m-15 3.75H3m16.5 0h-1.5M8.25 19.5V21m5.25-1.5V21m-9-15h12a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5.25A1.5 1.5 0 0 1 3.75 18V7.5A1.5 1.5 0 0 1 5.25 6ZM9 9h6v6H9V9Z" />
    </svg>
  );
}

function EmbeddingIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
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

function ModelIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21m0 0-.813-5.096M9 21h8m-1.813-5.096L16 21m0 0h.812m-6.425-9.351a3.75 3.75 0 1 1-5.3 5.3 3.75 3.75 0 0 1 5.3-5.3Zm10.596 0a3.75 3.75 0 1 1-5.3 5.3 3.75 3.75 0 0 1 5.3-5.3Z" />
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

function ArrowPathIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
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

// ---------------------------------------------------------------------------
// Stats Card Component (Theme compatible, slightly larger size)
// ---------------------------------------------------------------------------

function StatCard({ icon, title, value, subtext, highlight = false }) {
  return (
    <div className="rounded-2xl border border-theme-border/40 p-6 bg-theme-sidebar/40 backdrop-blur-md hover-lift theme-transition-all flex items-start gap-4 shadow-md">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        highlight
          ? 'bg-gradient-to-br from-theme-accent to-theme-accent/70 text-white shadow-md shadow-theme-accent/15'
          : 'bg-theme-card border border-theme-border/25 text-theme-text-muted'
      }`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-extrabold text-white mt-1 tracking-tight truncate">{value}</p>
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
// Main Page Component
// ---------------------------------------------------------------------------

export function EmbeddingGenerationPage() {
  const {
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
  } = useEmbedding();

  const handleGenerate = (e) => {
    e.preventDefault();
    generateEmbeddings(source);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" id="embedding-generation-page">
      {/* Background Mesh styling */}
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-theme-accent/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* ── Page Header (Centered) ── */}
        <div className="backdrop-blur-md bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 theme-transition-all">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-theme-accent bg-theme-accent/10 border border-theme-accent/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Module 5 Service
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Embedding Generation
            </h1>
            <p className="text-sm text-theme-text-muted mt-1.5 leading-relaxed max-w-xl">
              Generate semantic dense embeddings for chunked documents. Transform paragraphs into numerical coordinates.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-theme-text-muted bg-theme-card/30 px-3 py-1.5 rounded-lg border border-theme-border/20 self-start md:self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-pulse"></span>
            all-MiniLM-L6-v2 Engine
          </div>
        </div>

        {/* ── Statistics Cards (2x2 Matrix Grid) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="embedding-stats-cards">
          <StatCard
            icon={<CPUChipIcon />}
            title="Total Chunks"
            value={stats.totalChunks > 0 ? stats.totalChunks.toLocaleString() : '—'}
            subtext="From last chunked run"
            highlight={!!source}
          />
          <StatCard
            icon={<EmbeddingIcon />}
            title="Embeddings Generated"
            value={stats.embeddingsGenerated > 0 ? stats.embeddingsGenerated.toLocaleString() : '—'}
            subtext="Successfully vectorised"
          />
          <StatCard
            icon={<DimensionIcon />}
            title="Embedding Dimension"
            value={stats.embeddingDimension || '384'}
            subtext="Model feature space output"
          />
          <StatCard
            icon={<ModelIcon />}
            title="Model Used"
            value={stats.modelUsed}
            subtext="Dense retrieval model"
          />
        </div>

        {/* ── Main controls & Pipeline card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Embedding Generator Card (Left 1/3) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Embedding Generator</h3>
                <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
                  Select a document partition set to construct your dense vector embeddings in-memory.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="source-select" className="text-xs font-semibold text-theme-text">
                    Choose Source
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
                      <option value="truthfulqa">TruthfulQA</option>
                      <option value="squad">SQuAD</option>
                      <option value="uploaded_document">Uploaded Documents</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-theme-text-muted">
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-theme-text">Model</p>
                  <div className="p-3.5 rounded-xl border border-theme-border/30 bg-theme-card/30 text-xs font-mono text-theme-text-muted truncate select-all">
                    sentence-transformers/all-MiniLM-L6-v2
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    type="submit"
                    disabled={!source || isProcessing}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-theme-accent hover:brightness-110 shadow-sm shadow-theme-accent/15 hover:shadow-md hover:shadow-theme-accent/30 transition-all duration-200 disabled:opacity-55 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
                    id="btn-generate-embeddings"
                  >
                    {isProcessing ? (
                      <>
                        <SpinnerIcon className="w-4.5 h-4.5 text-white" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PlayIcon />
                        Generate Embeddings
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetPipeline}
                    disabled={isProcessing || (!results && !source)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-theme-text bg-theme-card border border-theme-border/50 hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-155 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm cursor-pointer"
                    id="btn-reset-pipeline"
                  >
                    <ArrowPathIcon />
                    Reset
                  </button>
                </div>
              </form>
            </div>
            
            {/* Info panel */}
            <div className="backdrop-blur-md bg-theme-sidebar/45 border border-theme-border/40 rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-theme-accent uppercase tracking-wider">Model Specifications</h4>
              <ul className="text-xs text-theme-text-muted space-y-2.5">
                <li className="flex justify-between border-b border-theme-border/25 pb-1.5">
                  <span className="text-theme-text-muted">Type:</span>
                  <span className="font-semibold text-white">Sentence Transformer</span>
                </li>
                <li className="flex justify-between border-b border-theme-border/25 pb-1.5">
                  <span className="text-theme-text-muted">Dimension:</span>
                  <span className="font-semibold text-white">384 Dimensions</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-theme-text-muted">Architecture:</span>
                  <span className="font-semibold text-white">MiniLM-L6 v2</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Details / Preview / Progress Column (Right 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ── Progress Bar & Active State ── */}
            {isProcessing && (
              <div className="bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden transition-all duration-300">
                {/* Decorative glowing gradient border */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-theme-accent via-blue-500 to-theme-accent animate-pulse" />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-theme-card border border-theme-border/25 flex items-center justify-center text-theme-accent shrink-0 animate-pulse">
                        <SpinnerIcon className="w-5 h-5 text-theme-accent" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Vector Pipeline Active</h4>
                        <p className="text-xs text-theme-text-muted mt-0.5">Encoding texts using MiniLM...</p>
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
                    <span className="text-theme-text-muted font-mono uppercase tracking-wider">all-MiniLM-L6-v2</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Results Panel ── */}
            {!isProcessing && results && (
              <div className="bg-theme-sidebar/40 border border-theme-border/45 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Generation Results</h3>
                  <p className="text-xs text-theme-text-muted mt-1 leading-relaxed">
                    Overview of the generated embeddings from the last processing run.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-theme-card/30 border border-theme-border/30 rounded-xl p-4.5 text-center">
                    <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Embedding Dimension</p>
                    <p className="text-2xl font-extrabold text-theme-accent mt-1">{results.embeddingDimension}</p>
                  </div>
                  
                  <div className="bg-theme-card/30 border border-theme-border/30 rounded-xl p-4.5 text-center">
                    <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Total Generated</p>
                    <p className="text-2xl font-extrabold text-theme-accent mt-1">{results.embeddingsGenerated.toLocaleString()}</p>
                  </div>

                  <div className="bg-theme-card/30 border border-theme-border/30 rounded-xl p-4.5 text-center">
                    <p className="text-[10px] uppercase font-bold text-theme-text-muted tracking-wider">Generation Time</p>
                    <div className="flex items-center justify-center gap-1.5 mt-1 text-theme-accent">
                      <ClockIcon className="w-5 h-5 shrink-0" />
                      <p className="text-2xl font-extrabold">{results.generationTime}</p>
                    </div>
                  </div>
                </div>

                {/* ── EMBEDDING DENSE VECTOR PREVIEWS (Real Data & Hover Effects) ── */}
                {results.preview && results.preview.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Semantic Vector Space Preview (Real Data)</h4>
                    <div className="space-y-3.5">
                      {results.preview.map((item, idx) => (
                        <div
                          key={item.chunk_id}
                          className="rounded-xl border border-theme-border/30 p-4 bg-theme-card/20 hover:border-theme-accent/50 hover:bg-theme-card/35 transition-all duration-200 shadow-sm"
                        >
                          <div className="flex items-center justify-between text-[11px] mb-2 font-mono text-theme-text-muted">
                            <span className="font-semibold text-white">Vector #{idx + 1} ({item.metadata.document_name})</span>
                            <span className="bg-theme-accent/15 px-1.5 py-0.5 rounded text-theme-accent">{item.embedding_dimension} dimensions</span>
                          </div>
                          
                          {/* Excerpt */}
                          {item.metadata.text && (
                            <p className="text-xs text-theme-text-muted leading-relaxed line-clamp-2 italic mb-2 border-l-2 border-theme-border/50 pl-2">
                              &ldquo;{item.metadata.text}&rdquo;
                            </p>
                          )}

                          {/* Dense Coordinate array */}
                          <div className="p-3 bg-black/45 rounded-lg border border-theme-border/20 text-[10px] font-mono text-theme-accent overflow-x-auto scrollbar-thin whitespace-nowrap select-all cursor-pointer">
                            [ {item.embedding.slice(0, 12).map(n => n.toFixed(6)).join(', ')}, ... ]
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Status Badge ── */}
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-400 leading-relaxed flex gap-3 shadow-md shadow-emerald-500/5">
                  <div className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold block mb-0.5 text-white">Pipeline Verification Success</span>
                    Dense embeddings generated and verified in local memory. Input vector space maps to 384 feature coordinates.
                  </div>
                </div>
              </div>
            )}

            {/* Empty state (when idle and no results) */}
            {!isProcessing && !results && (
              <div className="bg-theme-sidebar/35 border border-theme-border/40 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-theme-card/40 flex items-center justify-center text-theme-text-muted border border-theme-border/50 shadow-inner">
                  <EmbeddingIcon className="w-8 h-8 opacity-65 text-theme-accent" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h4 className="text-sm font-semibold text-white">Awaiting Embedding Command</h4>
                  <p className="text-xs text-theme-text-muted leading-relaxed">
                    Select a text source in the Left panel and trigger the Embedding generator engine. Process metrics and status will display here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Notification Toasts ── */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0" id="embedding-toasts">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismissToast} />
          ))}
        </div>
      )}
    </section>
  );
}

export default EmbeddingGenerationPage;
