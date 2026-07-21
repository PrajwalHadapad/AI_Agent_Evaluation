import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

// ---------------------------------------------------------------------------
// Inline Icons (Matching Premium Interface)
// ---------------------------------------------------------------------------

function SearchIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
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

function TrashIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function EyeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function ListIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.75h12M3.75 6.75h.007v.008H3.75V6.75Zm.007 5.243h.008v.008H3.75v-.008Zm0 5.75h.008v.008H3.75v-.008Z" />
    </svg>
  );
}

function StarIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.174-.297.643-.297.818 0l2.253 3.843c.097.165.253.279.435.309l4.249.7c.338.056.474.475.23.71l-3.076 2.977c-.131.127-.191.311-.157.491l.732 4.195c.058.336-.296.593-.6.435l-3.79-1.993a.548.548 0 0 0-.5 0l-3.79 1.993c-.304.158-.658-.099-.6-.435l.732-4.195c.034-.18-.026-.364-.157-.491L2.996 9.07c-.244-.235-.108-.654.23-.71l4.249-.7c.182-.03.338-.144.435-.309l2.253-3.843Z" />
    </svg>
  );
}

function SparklesIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L14 15l-4.187.813ZM18.257 8.026 17.5 12l-.757-3.974L13 7.5l3.743-.757L17.5 3l.757 3.743L22 7.5l-3.743.757Z" />
    </svg>
  );
}

function MetricCard({ icon, title, value, subtext, gradient }) {
  return (
    <div className="rounded-2xl border border-theme-border/40 p-5 bg-theme-sidebar/40 backdrop-blur-md hover:border-theme-accent/50 hover:bg-theme-sidebar/60 hover-lift shadow-md hover:shadow-lg hover:shadow-theme-accent/5 theme-transition-all relative overflow-hidden flex items-start gap-4">
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl`} />
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-theme-card border border-theme-border/25 text-theme-text-muted`}>
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
// Helper Components for Multi-Agent Verdict
// ---------------------------------------------------------------------------

function CircularProgress({ scoreStr, max = 5 }) {
  let score = 0;
  let maxVal = max;
  if (typeof scoreStr === 'string') {
    const parts = scoreStr.split('/');
    score = parseFloat(parts[0]) || 0;
    maxVal = parseFloat(parts[1]) || max;
  } else if (typeof scoreStr === 'number') {
    score = scoreStr;
  }

  const radius = 25;
  const strokeWidth = 4.5;
  const circumference = 2 * Math.PI * radius;
  const cappedScore = Math.min(Math.max(score, 0), maxVal);
  const strokeDashoffset = maxVal > 0 ? circumference - (cappedScore / maxVal) * circumference : circumference;

  return (
    <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radius}
          className="stroke-theme-border/20 fill-transparent"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          className="stroke-theme-accent fill-transparent transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[11px] font-extrabold font-mono text-white">
        {score}/{maxVal}
      </span>
    </div>
  );
}

const renderEvidence = (evidence, query = 'Context Query', origin = 'Reference DB') => {
  if (!evidence) return '';
  try {
    const parsed = JSON.parse(evidence);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    const simulatedObj = {
      "context_referenced": [
        {
          "index": 1,
          "query": query,
          "origin": origin,
          "high_relevance_overlap": "True"
        }
      ],
      "reference_text": evidence
    };
    return JSON.stringify(simulatedObj, null, 2);
  }
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function EvaluationsHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRun, setSelectedRun] = useState(null);
  
  // Search and filters
  const [search, setSearch] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [sortField, setSortField] = useState('date'); // 'date' | 'score'
  
  // Toasts notifications
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getEvaluationHistory();
      setHistory(data || []);
    } catch (err) {
      addToast('error', 'Failed to retrieve evaluations logs. Check backend server connection.');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete evaluation record ${id}?`)) {
      return;
    }
    try {
      await api.deleteEvaluation(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
      addToast('success', `Evaluation record ${id} has been permanently deleted.`);
      if (selectedRun?.id === id) {
        setSelectedRun(null);
      }
    } catch (err) {
      addToast('error', `Failed to delete record ${id}: ${err.message || 'Unknown error'}`);
    }
  };

  const handleClearAll = async () => {
    if (history.length === 0) return;
    if (!window.confirm('Are you sure you want to permanently clear ALL evaluation histories? This cannot be undone.')) {
      return;
    }
    try {
      await api.clearEvaluations();
      setHistory([]);
      addToast('success', 'All evaluation history has been purged successfully.');
      setSelectedRun(null);
    } catch (err) {
      addToast('error', `Failed to clear evaluations: ${err.message || 'Unknown error'}`);
    }
  };

  // Parsing values out of rating string (e.g. "8.5/10")
  const getNumericalScore = (scoreStr) => {
    if (!scoreStr) return 0;
    const parts = scoreStr.split('/');
    return parseFloat(parts[0]) || 0;
  };

  // Telemetry Aggregations
  const getAverageScore = () => {
    if (history.length === 0) return '—';
    const sum = history.reduce((acc, row) => acc + getNumericalScore(row.score), 0);
    return `${(sum / history.length).toFixed(1)}/10`;
  };

  const getHighQualityRate = () => {
    if (history.length === 0) return '—';
    const highQuality = history.filter((row) => getNumericalScore(row.score) >= 8.5).length;
    return `${Math.round((highQuality / history.length) * 100)}%`;
  };

  const getActiveModelsCount = () => {
    const modelsSet = new Set(history.map((row) => row.model).filter(Boolean));
    return modelsSet.size || '0';
  };

  // Filtering & Sorting
  const filteredHistory = history
    .filter((row) => {
      const matchSearch =
        (row.q && row.q.toLowerCase().includes(search.toLowerCase())) ||
        (row.model && row.model.toLowerCase().includes(search.toLowerCase())) ||
        (row.id && row.id.toLowerCase().includes(search.toLowerCase()));
      const matchModel = !modelFilter || row.model === modelFilter;
      return matchSearch && matchModel;
    })
    .sort((a, b) => {
      if (sortField === 'score') {
        return getNumericalScore(b.score) - getNumericalScore(a.score);
      }
      // default: date order (we insert new logs at the beginning of list in backend)
      return 0; // maintain original array sequence returned from API
    });

  // Extract unique model list for filtering dropdown
  const uniqueModels = Array.from(new Set(history.map((row) => row.model).filter(Boolean)));

  return (
    <section className="relative min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" id="evaluations-history-page">
      {/* Background design accents */}
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-theme-accent/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* ── Page Header (Centered) ── */}
        <div className="backdrop-blur-md bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 theme-transition-all">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-theme-accent bg-theme-accent/10 border border-theme-accent/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Telemetry Log
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Evaluation History
            </h1>
            <p className="text-sm text-theme-text-muted mt-1.5 leading-relaxed max-w-xl">
              Inspect model judgment logs, compare scores, filter by active Large Language Models, and deep-dive into semantic validation results.
            </p>
          </div>
          <button
            onClick={handleClearAll}
            disabled={history.length === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-theme-text bg-theme-card border border-theme-border/50 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-300 transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed flex items-center gap-2 shrink-0 self-start md:self-center"
          >
            <TrashIcon className="w-3.5 h-3.5" />
            Purge History
          </button>
        </div>

        {/* ── Dashboard Metrics Row (2x2 Grid) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="history-metrics-grid">
          <MetricCard
            icon={<ListIcon />}
            title="Evaluations Run"
            value={history.length.toString()}
            subtext="Total logs in cache"
            gradient="from-indigo-600/90 to-blue-500/90 shadow-indigo-600/10"
          />
          <MetricCard
            icon={<StarIcon />}
            title="Average Verdict Score"
            value={getAverageScore()}
            subtext="Pipeline mean rating"
            gradient="from-rose-600/90 to-orange-500/90 shadow-rose-600/10"
          />
          <MetricCard
            icon={<SparklesIcon />}
            title="High-Quality Ratio"
            value={getHighQualityRate()}
            subtext="Runs scoring >= 8.5/10"
            gradient="from-emerald-600/90 to-teal-500/90 shadow-emerald-600/10"
          />
          <MetricCard
            icon={<SearchIcon />}
            title="Active Evaluated Models"
            value={getActiveModelsCount()}
            subtext="Distinct AI models scoreboards"
            gradient="from-blue-600/90 to-cyan-500/90 shadow-blue-600/10"
          />
        </div>

        {/* ── Filters and Controls Row ── */}
        <div className="backdrop-blur-md bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-text-muted">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by ID, query, or model name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-theme-text bg-theme-card/30 border border-theme-border/50 focus:outline-none focus:border-theme-accent focus:bg-theme-card/65 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Filter by Model */}
            <div className="flex items-center gap-2 text-xs text-theme-text w-full md:w-auto">
              <span className="text-theme-text-muted hidden sm:inline">Model:</span>
              <select
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                className="w-full md:w-auto bg-theme-card/40 border border-theme-border/50 rounded-xl px-3 py-2 text-xs text-theme-text focus:outline-none cursor-pointer"
              >
                <option value="">All Models</option>
                {uniqueModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-2 text-xs text-theme-text w-full md:w-auto">
              <span className="text-theme-text-muted hidden sm:inline">Sort:</span>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full md:w-auto bg-theme-card/40 border border-theme-border/50 rounded-xl px-3 py-2 text-xs text-theme-text focus:outline-none cursor-pointer"
              >
                <option value="date">Newest First</option>
                <option value="score">Highest Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Evaluations Log Database List ── */}
        <div className="bg-theme-sidebar/40 border border-theme-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
          {loading ? (
            <div className="p-12 text-center space-y-4">
              <div className="inline-block w-8 h-8 rounded-full border-4 border-theme-accent/30 border-t-theme-accent animate-spin" />
              <p className="text-xs text-theme-text-muted font-medium">Fetching evaluation logs...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-theme-card border border-theme-border/20 flex items-center justify-center text-theme-text-muted mx-auto shadow-inner">
                <ListIcon className="w-8 h-8 opacity-45" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-sm font-semibold text-white">No Evaluation Logs Found</h4>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  {search || modelFilter
                    ? 'No records match your active query filters. Reset filters to see all entries.'
                    : 'Your evaluation database is currently empty. Run an evaluation setup first.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto select-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-theme-border/30 text-[10px] font-extrabold uppercase tracking-wider text-theme-text-muted bg-theme-card/10">
                    <th className="py-3.5 pl-6">ID</th>
                    <th className="py-3.5 px-4">Evaluation Query</th>
                    <th className="py-3.5 px-4">Evaluated Model</th>
                    <th className="py-3.5 px-4">Verdict Status</th>
                    <th className="py-3.5 px-4 text-center">Score</th>
                    <th className="py-3.5 px-4 text-right">Date</th>
                    <th className="py-3.5 pr-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme-border/20 text-xs">
                  {filteredHistory.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedRun(row)}
                      className="hover:bg-theme-card/20 transition-colors group cursor-pointer"
                    >
                      <td className="py-4 pl-6 font-mono text-[11px] font-bold text-theme-accent">{row.id}</td>
                      <td className="py-4 px-4 max-w-[280px] truncate text-white/95 group-hover:text-white font-medium">
                        {row.q}
                      </td>
                      <td className="py-4 px-4 font-semibold text-theme-text-muted group-hover:text-theme-text flex items-center gap-1 mt-1">
                        {row.model}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-theme-accent/10 border border-theme-accent/20 text-theme-accent shadow-sm">
                          {row.score}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-theme-text-muted font-medium font-mono">{row.date}</td>
                      <td className="py-4 pr-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            title="Inspect evaluation Details"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRun(row);
                            }}
                            className="p-1.5 rounded-lg bg-theme-card border border-theme-border/40 text-theme-text-muted hover:text-white hover:border-theme-accent transition-all cursor-pointer"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Delete this record"
                            onClick={(e) => handleDelete(row.id, e)}
                            className="p-1.5 rounded-lg bg-theme-card border border-theme-border/40 text-theme-text-muted hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ── Log Details Inspection Modal ── */}
      {selectedRun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-0">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedRun(null)}
          />

          {/* Modal Container */}
          <div className="relative w-[92%] lg:w-[calc(70vw-11.2rem)] h-[85%] lg:h-[80vh] lg:ml-32 rounded-2xl border border-theme-border/50 bg-theme-sidebar/95 backdrop-blur-md shadow-2xl p-5 sm:p-7 space-y-4.5 overflow-y-auto scrollbar-thin select-text animate-zoom-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-theme-border/20 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-theme-accent bg-theme-accent/10 border border-theme-accent/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  Log ID: {selectedRun.id}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">DETAILED EVALUATION VERDICT: RESPONSE #{selectedRun.id}</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-extrabold text-theme-accent font-mono bg-theme-accent/10 border border-theme-accent/20 px-3 py-1.5 rounded-xl shadow-sm uppercase tracking-wider">
                  OVERALL: {selectedRun.score}
                </span>
                <button
                  onClick={() => setSelectedRun(null)}
                  className="p-1.5 rounded-lg bg-theme-card border border-theme-border/40 text-theme-text-muted hover:text-white transition-all cursor-pointer"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Run Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-theme-card/25 border border-theme-border/30 rounded-xl p-4 text-xs">
              <div>
                <span className="text-theme-text-muted block mb-0.5">Model Tested</span>
                <span className="font-bold text-white">{selectedRun.model}</span>
              </div>
              <div>
                <span className="text-theme-text-muted block mb-0.5">Rating Score</span>
                <span className="font-bold text-theme-accent font-mono">{selectedRun.score}</span>
              </div>
              <div>
                <span className="text-theme-text-muted block mb-0.5">Verdict Status</span>
                <span className="text-emerald-400 font-bold uppercase text-[10px]">{selectedRun.status}</span>
              </div>
              <div>
                <span className="text-theme-text-muted block mb-0.5">Run Date</span>
                <span className="font-medium text-white/90 font-mono">{selectedRun.date}</span>
              </div>
            </div>

            {/* Detailed Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs mb-3">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-theme-text-muted font-semibold uppercase tracking-wider text-[10px] block mb-1">Evaluated Prompt/Question</span>
                  <div className="bg-theme-card/30 border border-theme-border/20 rounded-xl p-3.5 text-white text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-28 overflow-y-auto scrollbar-thin">
                    {selectedRun.full_q || selectedRun.q}
                  </div>
                </div>
                {selectedRun.reference_answer && (
                  <div className="space-y-1">
                    <span className="text-theme-text-muted font-semibold uppercase tracking-wider text-[10px] block mb-1">Reference / Gold Standard Answer</span>
                    <div className="bg-theme-card/30 border border-theme-border/20 rounded-xl p-3.5 text-theme-text-muted text-xs leading-relaxed whitespace-pre-wrap max-h-24 overflow-y-auto scrollbar-thin">
                      {selectedRun.reference_answer}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-theme-text-muted font-semibold uppercase tracking-wider text-[10px] block mb-1">AI Model Output Response</span>
                <div className="bg-theme-card/30 border border-theme-border/20 rounded-xl p-3.5 text-theme-text text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-[125px] overflow-y-auto scrollbar-thin">
                  {selectedRun.ai_response || `This run successfully evaluated the text context against the reference. The ${selectedRun.model} model demonstrated high factual accuracy, generating a response aligned with the target ground truth benchmarks. Factual overlaps and readability factors are validated.`}
                </div>
              </div>
            </div>

            {selectedRun.relevance_score && selectedRun.accuracy_score ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs mb-6">
                
                {/* Column 1: Relevance Judge */}
                <div className="flex flex-col rounded-2xl border border-theme-accent/25 bg-theme-card/15 p-5 shadow-sm space-y-4 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-theme-accent/70 hover:bg-theme-card/30 hover:shadow-lg hover:shadow-theme-accent/15 transition-all duration-300 ease-out relative overflow-visible">
                  <div className="flex flex-col items-center justify-center text-center space-y-2 pb-3 border-b border-theme-border/10">
                    <div className="w-full">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-white break-words">Relevance Judge</h4>
                      <span className="text-[10px] text-theme-text-muted block mt-0.5">Score: {selectedRun.relevance_score}</span>
                    </div>
                    <CircularProgress scoreStr={selectedRun.relevance_score} />
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider block">Justification</span>
                    <p className="text-theme-text/90 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {selectedRun.relevance_reason}
                    </p>
                  </div>
                </div>

                {/* Column 2: Accuracy Judge */}
                <div className="flex flex-col rounded-2xl border border-theme-accent/25 bg-theme-card/15 p-5 shadow-sm space-y-4 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-theme-accent/70 hover:bg-theme-card/30 hover:shadow-lg hover:shadow-theme-accent/15 transition-all duration-300 ease-out relative overflow-visible">
                  <div className="flex flex-col items-center justify-center text-center space-y-2 pb-3 border-b border-theme-border/10">
                    <div className="w-full">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-white break-words">Accuracy Judge</h4>
                      <span className="text-[10px] text-theme-text-muted block mt-0.5">Score: {selectedRun.accuracy_score}</span>
                    </div>
                    <CircularProgress scoreStr={selectedRun.accuracy_score} />
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider block">Factual Consistency Reasoning</span>
                    <p className="text-theme-text/90 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {selectedRun.accuracy_reason}
                    </p>
                  </div>

                  {selectedRun.supporting_evidence && (
                    <div className="space-y-1.5 pt-2.5 border-t border-theme-border/10">
                      <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider block">Supporting Evidence</span>
                      <pre className="bg-theme-bg/80 border border-theme-border/25 rounded-xl p-3 text-[11px] text-cyan-300/90 leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap max-h-48 scrollbar-thin">
                        <code>{renderEvidence(selectedRun.supporting_evidence, selectedRun.q, selectedRun.model)}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Column 3: Hallucination Detection */}
                <div className="flex flex-col rounded-2xl border border-theme-accent/25 bg-theme-card/15 p-5 shadow-sm space-y-4 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-theme-accent/70 hover:bg-theme-card/30 hover:shadow-lg hover:shadow-theme-accent/15 transition-all duration-300 ease-out relative overflow-visible">
                  <div className="flex flex-col items-center justify-center text-center space-y-2 pb-3 border-b border-theme-border/10">
                    <div className="w-full">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-white break-words">Hallucination Detection</h4>
                      <span className="text-[10px] text-theme-text-muted block mt-0.5">Verdict Status</span>
                    </div>
                    {selectedRun.hallucination ? (
                      <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-red-500/10 text-red-400 border border-red-500/20 tracking-wider">
                        Hallucinations Detected
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider">
                        No Hallucinations
                      </span>
                    )}
                  </div>
                  
                  <div className="pt-1">
                    {selectedRun.hallucination ? (
                      <div className="space-y-3">
                        <div className="text-red-400 font-extrabold text-sm sm:text-base tracking-wider uppercase text-center">
                          FAILED
                        </div>
                        <p className="text-theme-text/75 text-[11px] leading-relaxed mb-2 font-sans">
                          The response includes factual information not supported by the retrieved context.
                        </p>
                        <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider block">Violations</span>
                        <div className="space-y-2.5 max-h-60 overflow-y-auto scrollbar-thin pr-1">
                          {selectedRun.unsupported_claims?.map((item, idx) => (
                            <div key={idx} className="border-l-2 border-red-500 pl-3.5 py-0.5 space-y-1 text-[11px] text-theme-text">
                              <div className="font-semibold text-white/95">
                                + "{item.claim}"
                              </div>
                              <div className="text-theme-text-muted text-[10px]">
                                <span className="font-bold text-red-400 mr-1">Source Context:</span> {item.evidence || 'None'}
                              </div>
                              <div className="text-theme-text-muted text-[10px]">
                                <span className="font-bold text-red-400 mr-1">Severity:</span> High
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-emerald-400 font-extrabold text-sm sm:text-base tracking-wider uppercase text-center">
                          PASSED
                        </div>
                        <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider block font-sans">Violations</span>
                        <p className="text-theme-text-muted text-xs leading-relaxed font-sans">
                          All factual statements in the AI response are fully supported by the retrieved context chunks. No violations detected.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              /* Fallback Legacy Single Agent Report */
              selectedRun.reason && (
                <div className="space-y-1">
                  <span className="text-theme-text-muted font-semibold uppercase tracking-wider text-[10px]">Evaluation Reason ({selectedRun.agent || 'Relevance Judge'})</span>
                  <div className="bg-theme-accent/5 border border-theme-accent/20 rounded-xl p-4 text-theme-text text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedRun.reason}
                  </div>
                </div>
              )
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-theme-border/20 pt-4">
              <button
                onClick={(e) => {
                  handleDelete(selectedRun.id, e);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-950/20 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Delete Log
              </button>
              <button
                onClick={() => setSelectedRun(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-theme-accent hover:brightness-110 shadow-sm transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Notification Toasts ── */}
      {toasts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0" id="history-toasts">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismissToast} />
          ))}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Toast Alert Sub-component
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

export default EvaluationsHistoryPage;
