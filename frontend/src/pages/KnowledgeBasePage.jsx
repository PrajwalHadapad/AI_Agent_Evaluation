import { useEffect } from 'react';
import { useDatasets } from '../hooks/useDatasets';

/* ═══════════════════════════════════════════════════════════════════
   SVG Icon Components
   ═══════════════════════════════════════════════════════════════════ */

function DatabaseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function BookOpenIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function ChartBarIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
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

function ArrowPathIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
    </svg>
  );
}

function ArrowDownTrayIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function CheckCircleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ExclamationCircleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  );
}

function XMarkIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function SpinnerIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   Sub-Components
   ═══════════════════════════════════════════════════════════════════ */

/** Summary statistic card shown above dataset cards */
function StatCard({ icon, label, value, accent = false, delay = '' }) {
  return (
    <div className={`rounded-2xl border border-theme-border/40 p-5 bg-theme-sidebar/40 backdrop-blur-md hover-lift theme-transition-all fade-in-up ${delay}`} id={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          accent
            ? 'bg-gradient-to-br from-theme-accent to-theme-accent/70 text-white shadow-md shadow-theme-accent/15'
            : 'bg-theme-card border border-theme-border/25 text-theme-text-muted'
        }`}>
          {icon}
        </div>
        <span className="text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-white tracking-tight">{value}</p>
    </div>
  );
}

/** Individual dataset card with status, description, actions */
function DatasetCard({
  id,
  name,
  description,
  source,
  loaded,
  recordCount,
  isLoading,
  onLoad,
  onRefresh,
  refreshLoading,
  accentColor,
  delay = '',
}) {
  return (
    <div className={`rounded-2xl border border-theme-border/45 bg-theme-sidebar/40 backdrop-blur-md hover-lift theme-transition-all overflow-hidden shadow-xl fade-in-up ${delay}`} id={id}>
      {/* Top gradient accent bar */}
      <div className={`h-1.5 ${accentColor}`} />

      <div className="p-6 lg:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-theme-card border border-theme-border/30 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-theme-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">{name}</h3>
              <span className="text-[10px] font-mono text-theme-text-muted">{source}</span>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              loaded
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-theme-card border border-theme-border/35 text-theme-text-muted'
            }`}
            id={`${id}-status`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${loaded ? 'bg-emerald-400 dot-pulse' : 'bg-theme-text-muted/60'}`} />
            {loaded ? 'Loaded' : 'Not Loaded'}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed mb-6">
          {description}
        </p>

        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-theme-card/30 rounded-xl p-4 border border-theme-border/20">
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-theme-text-muted mb-1">Records Loaded</p>
            <p className="text-xl font-mono font-bold text-white tabular-nums">
              {isLoading ? (
                <span className="inline-block w-16 h-6 shimmer rounded bg-theme-border/20" />
              ) : (
                recordCount.toLocaleString()
              )}
            </p>
          </div>
          <div className="bg-theme-card/30 rounded-xl p-4 border border-theme-border/20">
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-theme-text-muted mb-1">Status</p>
            <p className={`text-sm font-bold ${loaded ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isLoading ? (
                <span className="inline-block w-20 h-5 shimmer rounded bg-theme-border/20" />
              ) : loaded ? (
                'Ready'
              ) : (
                'Awaiting Load'
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLoad}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-theme-accent hover:brightness-110 rounded-xl shadow-sm shadow-theme-accent/15 hover:shadow-md hover:shadow-theme-accent/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id={`${id}-btn-load`}
          >
            {isLoading ? (
              <>
                <SpinnerIcon className="w-4 h-4" />
                Loading…
              </>
            ) : (
              <>
                <ArrowDownTrayIcon className="w-4 h-4" />
                Load Dataset
              </>
            )}
          </button>

          <button
            onClick={onRefresh}
            disabled={refreshLoading}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-theme-text bg-theme-card border border-theme-border/50 hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id={`${id}-btn-refresh`}
          >
            <ArrowPathIcon className={`w-4 h-4 ${refreshLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

/** Toast-style notification */
function Notification({ notification, onDismiss }) {
  const isSuccess = notification.type === 'success';

  return (
    <div
      className={`animate-slide-in-right flex items-start gap-3.5 px-5 py-4 rounded-xl border shadow-xl backdrop-blur-md max-w-md transition-all duration-300 ${
        isSuccess
          ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100'
          : 'bg-red-950/90 border-red-500/30 text-red-100'
      }`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">
        {isSuccess ? (
          <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <ExclamationCircleIcon className="w-5 h-5 text-red-400 shrink-0" />
        )}
      </div>
      <div className="flex-1 min-w-0 font-sans">
        <p className="text-sm font-bold tracking-tight text-white">{isSuccess ? 'Success' : 'Notification'}</p>
        <p className="text-xs sm:text-sm mt-0.5 opacity-90 leading-relaxed">{notification.message}</p>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className={`flex-shrink-0 p-1 rounded-lg transition-colors duration-150 cursor-pointer ${
          isSuccess ? 'hover:bg-emerald-800/40 text-emerald-400' : 'hover:bg-red-800/40 text-red-400'
        }`}
        aria-label="Dismiss notification"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   KnowledgeBasePage — Main Page Component
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Reference Knowledge Base page.
 *
 * Manages benchmark datasets (TruthfulQA, SQuAD v2) used for RAG
 * evaluation — status checks, downloads, and record statistics.
 */
function KnowledgeBasePage() {
  const {
    status,
    statusLoading,
    loadingDatasets,
    lastUpdated,
    notifications,
    fetchStatus,
    loadDatasets,
    dismissNotification,
  } = useDatasets();

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalRecords = status.truthfulqa_records + status.squad_records;
  const datasetsLoaded = [status.truthfulqa_loaded, status.squad_loaded].filter(Boolean).length;

  return (
    <section className="relative min-h-screen" id="knowledge-base-page">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-primary-50/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* ── Page Header ── */}
        {/* ── Page Header (Centered) ── */}
        <div className="mb-10 fade-in-up text-center flex flex-col items-center justify-center" id="kb-header">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-theme-accent to-theme-accent/70 flex items-center justify-center shadow-sm shadow-theme-accent/20">
              <DatabaseIcon className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xs font-semibold text-theme-accent uppercase tracking-widest">Module 3</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
            Reference Knowledge Base
          </h1>
          <p className="text-base text-theme-text-muted max-w-2xl leading-relaxed">
            Manage benchmark datasets for evaluation. Load, normalise, and inspect TruthfulQA and SQuAD v2
            datasets that power the platform&apos;s reference answer pipeline.
          </p>
        </div>

        {/* ── Statistics Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10" id="kb-stats">
          <StatCard
            icon={<DatabaseIcon className="w-5 h-5" />}
            label="Total Datasets"
            value={`${datasetsLoaded} / 2`}
            accent
            delay="fade-in-up-delay-1"
          />
          <StatCard
            icon={<ChartBarIcon className="w-5 h-5" />}
            label="Total Records"
            value={statusLoading ? '—' : totalRecords.toLocaleString()}
            delay="fade-in-up-delay-2"
          />
          <StatCard
            icon={<ClockIcon className="w-5 h-5" />}
            label="Last Updated"
            value={
              lastUpdated
                ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                : 'Never'
            }
            delay="fade-in-up-delay-3"
          />
        </div>

        {/* ── Global Actions (Centered) ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 fade-in-up fade-in-up-delay-3" id="kb-actions">
          <button
            onClick={loadDatasets}
            disabled={loadingDatasets}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-theme-accent hover:brightness-110 rounded-xl shadow-sm shadow-theme-accent/15 hover:shadow-md hover:shadow-theme-accent/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            id="btn-load-all"
          >
            {loadingDatasets ? (
              <>
                <SpinnerIcon className="w-4 h-4" />
                Loading All Datasets…
              </>
            ) : (
              <>
                <ArrowDownTrayIcon className="w-4 h-4" />
                Load All Datasets
              </>
            )}
          </button>
          <button
            onClick={fetchStatus}
            disabled={statusLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-theme-text bg-theme-card border border-theme-border/50 hover:bg-theme-card-hover hover:border-theme-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id="btn-refresh-all"
          >
            <ArrowPathIcon className={`w-4 h-4 ${statusLoading ? 'animate-spin' : ''}`} />
            Refresh All
          </button>
        </div>

        {/* ── Dataset Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16" id="kb-datasets">
          <DatasetCard
            id="card-truthfulqa"
            name="TruthfulQA"
            description="A benchmark dataset for measuring whether a language model is truthful in generating answers. Contains 817 questions spanning 38 categories including health, law, finance, and politics."
            source="truthfulqa/truthful_qa · Hugging Face"
            loaded={status.truthfulqa_loaded}
            recordCount={status.truthfulqa_records}
            isLoading={loadingDatasets}
            onLoad={loadDatasets}
            onRefresh={fetchStatus}
            refreshLoading={statusLoading}
            accentColor="bg-gradient-to-r from-violet-500 to-primary-500"
            delay="fade-in-up-delay-4"
          />

          <DatasetCard
            id="card-squad"
            name="SQuAD v2"
            description="Stanford Question Answering Dataset v2.0 combines 100,000+ answerable questions with 50,000+ unanswerable questions, designed to test reading comprehension with adversarial examples."
            source="rajpurkar/squad_v2 · Hugging Face"
            loaded={status.squad_loaded}
            recordCount={status.squad_records}
            isLoading={loadingDatasets}
            onLoad={loadDatasets}
            onRefresh={fetchStatus}
            refreshLoading={statusLoading}
            accentColor="bg-gradient-to-r from-cyan-500 to-blue-500"
            delay="fade-in-up-delay-5"
          />
        </div>

        {/* ── Info Banner ── */}
        <div className="rounded-2xl border border-theme-border/40 p-6 lg:p-8 bg-theme-sidebar/45 backdrop-blur-md hover-lift theme-transition-all shadow-lg fade-in-up fade-in-up-delay-5" id="kb-info-banner">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-theme-card border border-theme-border/25 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">How It Works</h3>
              <p className="text-[13px] text-theme-text-muted leading-relaxed">
                Datasets are downloaded from Hugging Face on first load and cached in memory for the
                server&apos;s lifetime. Each record is normalised into a standard format
                <code className="mx-1 px-1.5 py-0.5 bg-black/45 rounded text-xs font-mono text-theme-accent border border-theme-border/30">
                  {"{ id, question, answer, source }"}
                </code>
                for consistent evaluation across benchmarks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notification Toasts ── */}
      {notifications.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm" id="kb-notifications">
          {notifications.map((n) => (
            <Notification key={n.id} notification={n} onDismiss={dismissNotification} />
          ))}
        </div>
      )}
    </section>
  );
}

export default KnowledgeBasePage;
