import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

// Custom SVG Icons for Dashboard widgets
const IconDatasets = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

const IconDocuments = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const IconChunks = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const IconEvaluationsRun = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const IconDatabase = () => (
  <svg className="w-4 h-4 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
  </svg>
);

const IconScissors = () => (
  <svg className="w-4 h-4 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-4 h-4 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
);

const IconCheckShield = () => (
  <svg className="w-4 h-4 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
);

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [chartActivePoint, setChartActivePoint] = useState(null);
  const [pageKey, setPageKey] = useState(0);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getEvaluationHistory();
        setEvaluations(data);
      } catch (error) {
        console.error("Failed to fetch evaluation history:", error);
      }
    };
    fetchHistory();
  }, []);

  // Spawns a custom Toast notification
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Simulates skeleton loaders
  const triggerSkeletonReload = () => {
    setLoading(true);
    addToast('Simulating network latency... Loading skeletons active.', 'info');
    setTimeout(() => {
      setLoading(false);
      addToast('Data synchronization complete.', 'success');
    }, 1800);
  };

  // Triggers full page re-entrance slide animation
  const triggerPageSlide = () => {
    setPageKey((prev) => prev + 1);
    addToast('Re-triggering page transition animation.', 'info');
  };

  // Custom ripple click handler
  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('btn-ripple-span');

    // Remove any existing ripples
    const ripple = btn.getElementsByClassName('btn-ripple-span')[0];
    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  };

  // Chart data definitions
  const weekData = [
    { label: 'Mon', value: 300, displayValue: '300 Runs' },
    { label: 'Tue', value: 550, displayValue: '550 Runs' },
    { label: 'Wed', value: 420, displayValue: '420 Runs' },
    { label: 'Thu', value: 780, displayValue: '780 Runs' },
    { label: 'Fri', value: 650, displayValue: '650 Runs' },
    { label: 'Sat', value: 920, displayValue: '920 Runs' },
    { label: 'Sun', value: 1100, displayValue: '1,100 Runs' },
  ];

  return (
    <div key={pageKey} className="space-y-8 page-transition-enter select-none">
      
      {/* Toast Portal */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl animate-slide-in-right ${
              t.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100'
                : t.type === 'error'
                ? 'bg-red-950/90 border-red-500/30 text-red-100'
                : 'bg-theme-sidebar/95 border-theme-border/60 text-white'
            }`}
          >
            <div className="flex-shrink-0">
              {t.type === 'success' && <span className="text-emerald-400 font-bold text-sm">✓</span>}
              {t.type === 'error' && <span className="text-red-400 font-bold text-sm">!</span>}
              {t.type === 'info' && <span className="text-theme-accent font-bold text-sm">i</span>}
            </div>
            <p className="text-xs font-medium leading-relaxed">{t.message}</p>
          </div>
        ))}
      </div>

      {/* Welcome Message Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight text-white leading-none">
            Welcome back, Prajwal! 👋
          </h1>
          <p className="text-[13px] text-theme-text-muted mt-2">
            Monitor and manage your LLM evaluation pipeline
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: 'Total Datasets',
            value: '2',
            change: '+100% from last week',
            gradient: 'from-indigo-600/90 to-blue-500/90 shadow-indigo-600/10',
            icon: <IconDatasets />,
          },
          {
            label: 'Total Documents',
            value: '128',
            change: '+24% from last week',
            gradient: 'from-blue-600/90 to-cyan-500/90 shadow-blue-600/10',
            icon: <IconDocuments />,
          },
          {
            label: 'Total Chunks',
            value: '5,842',
            change: '+18% from last week',
            gradient: 'from-emerald-600/90 to-teal-500/90 shadow-emerald-600/10',
            icon: <IconChunks />,
          },
          {
            label: 'Evaluations Run',
            value: evaluations.length.toString(),
            change: `+${Math.max(0, evaluations.length - 4)} new runs`,
            gradient: 'from-rose-600/90 to-orange-500/90 shadow-rose-600/10',
            icon: <IconEvaluationsRun />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`rounded-2xl border border-theme-border/40 p-5 hover-lift relative overflow-hidden bg-theme-sidebar/40 backdrop-blur-md theme-transition-all`}
          >
            {loading ? (
              <div className="space-y-3">
                <div className="h-4 w-2/3 rounded skeleton-shimmer" />
                <div className="h-8 w-1/2 rounded skeleton-shimmer" />
                <div className="h-3 w-3/4 rounded skeleton-shimmer" />
              </div>
            ) : (
              <>
                {/* Glow pill behind the icon */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-xl`} />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-semibold text-theme-text-muted">{stat.label}</span>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] font-medium text-theme-accent/90 mt-2 flex items-center gap-1">
                  <span>{stat.change}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Grid of Main Widgets (Chart, System Status, Recent Activities) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pipeline Overview Chart Card */}
        <div className="lg:col-span-2 rounded-2xl bg-theme-sidebar/40 border border-theme-border/40 p-5 backdrop-blur-md hover-lift flex flex-col h-[350px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase">Pipeline Overview</h3>
              <p className="text-[10px] text-theme-text-muted mt-0.5">Evaluation runs aggregated daily</p>
            </div>
            <div className="relative">
              <select className="bg-theme-card border border-theme-border/50 rounded-lg px-2.5 py-1 text-xs text-white font-medium focus:outline-none cursor-pointer">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex-1 flex flex-col justify-end gap-3 pb-2">
              <div className="h-full rounded-xl skeleton-shimmer w-full" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col relative select-none">
              {/* Tooltip Overlay */}
              {chartActivePoint !== null && (
                <div
                  className="absolute bg-theme-card border border-theme-accent/50 rounded-xl px-2.5 py-1.5 shadow-xl text-center z-10 -translate-x-1/2 -translate-y-full transition-all duration-200 pointer-events-none"
                  style={{
                    left: `${(chartActivePoint / (weekData.length - 1)) * 90 + 5}%`,
                    top: `${200 - (weekData[chartActivePoint].value / 1200) * 160 - 8}px`,
                  }}
                >
                  <p className="text-[10px] font-bold text-white leading-none">{weekData[chartActivePoint].label}</p>
                  <p className="text-[11px] font-extrabold text-theme-accent mt-0.5">{weekData[chartActivePoint].displayValue}</p>
                </div>
              )}

              {/* Custom SVG Line Chart */}
              <div className="flex-1 w-full relative">
                <svg className="w-full h-full min-h-[180px]" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    {/* Area Gradient fill */}
                    <linearGradient id="chart-area-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid guide lines */}
                  <line x1="25" y1="40" x2="480" y2="40" stroke="var(--theme-border)" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="25" y1="110" x2="480" y2="110" stroke="var(--theme-border)" strokeWidth="0.5" strokeDasharray="3,3" />
                  <line x1="25" y1="180" x2="480" y2="180" stroke="var(--theme-border)" strokeWidth="0.5" />

                  {/* Area path below curve */}
                  <path
                    d="M 25 180 Q 80 140, 100 110 T 175 120 T 250 80 T 325 90 T 400 50 T 480 30 L 480 180 Z"
                    fill="url(#chart-area-glow)"
                  />

                  {/* Curved stroke line */}
                  <path
                    d="M 25 180 Q 80 140, 100 110 T 175 120 T 250 80 T 325 90 T 400 50 T 480 30"
                    fill="none"
                    stroke="var(--theme-accent)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Active SVG point marker circles */}
                  {weekData.map((d, i) => {
                    const xCoord = 25 + (i * (455 / (weekData.length - 1)));
                    // Calculate relative y-coordinate
                    const yCoord = 180 - (d.value / 1200) * 150;
                    return (
                      <g
                        key={i}
                        className="cursor-pointer"
                        onMouseEnter={() => setChartActivePoint(i)}
                        onMouseLeave={() => setChartActivePoint(null)}
                      >
                        {/* Enlarged transparent hover target */}
                        <circle cx={xCoord} cy={yCoord} r="14" fill="transparent" />
                        {/* Glow shell */}
                        <circle
                          cx={xCoord}
                          cy={yCoord}
                          r="6"
                          fill="var(--theme-accent)"
                          className={`transition-all ${chartActivePoint === i ? 'opacity-40 animate-ping' : 'opacity-0'}`}
                        />
                        {/* Center core */}
                        <circle
                          cx={xCoord}
                          cy={yCoord}
                          r="4.5"
                          fill="white"
                          stroke="var(--theme-accent)"
                          strokeWidth="2.5"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Day Labels */}
              <div className="flex justify-between px-3 mt-4 text-[10px] font-bold text-theme-text-muted uppercase tracking-wider">
                {weekData.map((d, i) => (
                  <span key={i} className="w-12 text-center">{d.label}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* System Status Panel */}
        <div className="rounded-2xl bg-theme-sidebar/40 border border-theme-border/40 p-5 backdrop-blur-md hover-lift flex flex-col h-[350px]">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight uppercase">System Status</h3>
            <p className="text-[10px] text-theme-text-muted mt-0.5">Component health telemetry</p>
          </div>

          {loading ? (
            <div className="flex-1 space-y-5 mt-6">
              {[1, 2, 3, 4, 5].map((x) => (
                <div key={x} className="flex justify-between items-center">
                  <div className="h-3 w-1/3 rounded skeleton-shimmer" />
                  <div className="h-3.5 w-16 rounded skeleton-shimmer" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 mt-6 space-y-4">
              {[
                { name: 'Dataset Loader', status: 'Healthy' },
                { name: 'Chunking Service', status: 'Healthy' },
                { name: 'Embedding Service', status: 'Healthy' },
                { name: 'Vector Store', status: 'Healthy' },
                { name: 'Retrieval API', status: 'Healthy' },
              ].map((svc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-xl bg-theme-card/30 border border-theme-border/20 shadow-sm"
                >
                  <span className="text-[12px] font-semibold text-theme-text/95">{svc.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-pulse" />
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wide">
                      {svc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Section (Quick Actions, Recent Activities, Recent Evaluations) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions & Recent Activities Left-column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Quick Actions */}
          <div className="rounded-2xl bg-theme-sidebar/40 border border-theme-border/40 p-5 backdrop-blur-md hover-lift">
            <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              {[
                {
                  label: 'New Evaluation',
                  desc: 'Create a new evaluation',
                  path: '/evaluation',
                  color: 'from-violet-500/20 to-purple-500/20 border-purple-500/30 text-purple-300',
                },
                {
                  label: 'Upload Document',
                  desc: 'Upload and process docs',
                  path: '/knowledge-base',
                  color: 'from-blue-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-300',
                },
                {
                  label: 'Load Datasets',
                  desc: 'Load benchmark datasets',
                  path: '/knowledge-base',
                  color: 'from-emerald-500/20 to-teal-500/20 border-teal-500/30 text-emerald-300',
                },
                {
                  label: 'View Analytics',
                  desc: 'Explore evaluation reports',
                  path: '/',
                  color: 'from-rose-500/20 to-orange-500/20 border-orange-500/30 text-rose-300',
                  action: () => addToast('Analytics reporting package is coming soon!', 'info'),
                },
              ].map((act, i) => {
                const Card = (
                  <div
                    onClick={act.action}
                    className={`flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r ${act.color} border shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer`}
                  >
                    <div>
                      <p className="text-[13px] font-bold text-white">{act.label}</p>
                      <p className="text-[10px] text-theme-text-muted mt-0.5">{act.desc}</p>
                    </div>
                    <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                );

                if (act.action) {
                  return <div key={i}>{Card}</div>;
                }
                return (
                  <Link key={i} to={act.path} className="block">
                    {Card}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="rounded-2xl bg-theme-sidebar/40 border border-theme-border/40 p-5 backdrop-blur-md hover-lift">
            <h3 className="text-sm font-bold text-white tracking-tight uppercase mb-4">Recent Activities</h3>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((x) => (
                  <div key={x} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full skeleton-shimmer flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 rounded skeleton-shimmer w-3/4" />
                      <div className="h-2 rounded skeleton-shimmer w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: 'SQuAD dataset loaded', time: '2 min ago', icon: <IconDatabase />, color: 'bg-purple-500/10 border-purple-500/20' },
                  { label: 'TruthfulQA dataset loaded', time: '5 min ago', icon: <IconDatabase />, color: 'bg-cyan-500/10 border-cyan-500/20' },
                  { label: 'Document chunked', time: '12 min ago', icon: <IconScissors />, color: 'bg-emerald-500/10 border-emerald-500/20' },
                  { label: 'Embeddings generated', time: '18 min ago', icon: <IconSparkles />, color: 'bg-orange-500/10 border-orange-500/20' },
                  { label: 'Evaluation completed', time: '25 min ago', icon: <IconCheckShield />, color: 'bg-teal-500/10 border-teal-500/20' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 ${act.color}`}>
                      {act.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold text-theme-text leading-tight truncate">
                        {act.label}
                      </p>
                      <p className="text-[10px] text-theme-text-muted mt-1 font-medium">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Recent Evaluations Table */}
        <div className="lg:col-span-2 rounded-2xl bg-theme-sidebar/40 border border-theme-border/40 p-5 backdrop-blur-md hover-lift flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight uppercase">Recent Evaluations</h3>
                <p className="text-[10px] text-theme-text-muted mt-0.5 font-medium">Recently processed model scoring sets</p>
              </div>
              <button
                onClick={() => addToast('Evaluations list matches real DB cache.', 'info')}
                className="px-3 py-1 rounded-lg bg-theme-card border border-theme-border/40 text-[10px] font-bold uppercase tracking-wider text-theme-text hover:bg-theme-card-hover transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>

            {loading ? (
              <div className="space-y-4 mt-6">
                {[1, 2, 3, 4].map((x) => (
                  <div key={x} className="h-10 rounded skeleton-shimmer" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto select-none mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-theme-border/30 text-[10px] font-extrabold uppercase tracking-wider text-theme-text-muted">
                      <th className="pb-3.5 pl-2">ID</th>
                      <th className="pb-3.5">Question</th>
                      <th className="pb-3.5">Model</th>
                      <th className="pb-3.5">Status</th>
                      <th className="pb-3.5 text-center">Score</th>
                      <th className="pb-3.5 text-right pr-2">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-border/20 text-xs">
                    {evaluations.slice(0, 4).map((row, i) => (
                      <tr key={i} className="hover:bg-theme-card/25 transition-colors group">
                        <td className="py-3 pl-2 font-mono text-[11px] font-bold text-theme-accent">{row.id}</td>
                        <td className="py-3 max-w-[200px] truncate text-white/90 group-hover:text-white transition-colors">{row.q}</td>
                        <td className="py-3 font-semibold text-theme-text-muted group-hover:text-theme-text flex items-center gap-1">
                          {row.model}
                          <span className="text-[10px] text-theme-accent">&gt;</span>
                        </td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-theme-accent/10 border border-theme-accent/20 text-theme-accent">
                            {row.score}
                          </span>
                        </td>
                        <td className="py-3 text-right pr-2 text-theme-text-muted font-medium">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="border-t border-theme-border/20 pt-4 mt-6 flex items-center justify-between text-[11px] text-theme-text-muted font-medium">
            <span>Showing recent evaluations logs</span>
            <span>{evaluations.length} active sets</span>
          </div>
        </div>

      </div>

      {/* Animation & Micro-Interactions Footer Showcase panel */}
      <div className="rounded-2xl border border-theme-border bg-theme-sidebar/55 backdrop-blur-md p-6 select-none relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-theme-accent/5 rounded-full blur-2xl" />
        
        <div className="flex items-center gap-2.5 mb-5">
          <span className="text-sm font-extrabold uppercase tracking-wider text-white">
            Animation & Micro-interactions to Include
          </span>
          <span className="text-[16px]">✨</span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Fade / Slide Page Transitions', action: triggerPageSlide },
            { label: 'Hover Lift on Cards', desc: 'Interact with any cards above to inspect hover physics.' },
            { label: 'Gradient Button Glow', isGlow: true, action: () => addToast('Hover this glow button to trigger ambient neon shadow highlights.', 'info') },
            { label: 'Loading Skeletons', action: triggerSkeletonReload },
            { label: 'Smooth Theme Transitions', desc: 'Use the choose theme cards at the top of layout.' },
            { label: 'Toast Notifications', action: () => addToast('System notification triggered successfully!', 'success') },
            { label: 'Ripple Effect on Buttons', isRipple: true, action: (e) => { handleRipple(e); addToast('Ripple animation spawned on click context.', 'info'); } },
          ].map((item, i) => {
            if (item.desc) {
              return (
                <div
                  key={i}
                  title={item.desc}
                  className="px-3.5 py-3 rounded-xl border border-theme-border/40 bg-theme-card/30 text-[11px] font-bold text-theme-text-muted hover:text-white flex items-center justify-center text-center cursor-help transition-all select-none hover:border-theme-border/70"
                >
                  {item.label}
                </div>
              );
            }

            let btnClass = "px-3.5 py-3 rounded-xl border border-theme-border/50 bg-theme-card text-[11px] font-bold text-white transition-all duration-200 flex items-center justify-center text-center cursor-pointer hover:border-theme-accent hover:scale-[1.02] active:scale-[0.98] select-none hover:shadow-md";
            if (item.isGlow) {
              btnClass = "btn-gradient-glow hover-lift px-3.5 py-3 rounded-xl text-[11px] font-extrabold text-white text-center cursor-pointer select-none";
            }
            if (item.isRipple) {
              btnClass = "btn-ripple-container px-3.5 py-3 rounded-xl border border-theme-border/50 bg-theme-card text-[11px] font-bold text-white flex items-center justify-center text-center cursor-pointer select-none hover:border-theme-accent hover:shadow-sm";
            }

            return (
              <button
                key={i}
                onClick={item.action}
                className={btnClass}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;
