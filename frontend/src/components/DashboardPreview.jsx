/**
 * DashboardPreview — Mock dashboard card shown on the landing page.
 *
 * Simulates what the evaluation dashboard will look like,
 * similar to how Vercel/Linear show product previews on their landing pages.
 */
function DashboardPreview() {
  return (
    <div className="dashboard-preview overflow-hidden" id="dashboard-preview">
      {/* Window Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/80 bg-white/60">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70"></span>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-0.5 rounded-md bg-slate-100 text-[11px] text-slate-400 font-mono">
            localhost:5173/dashboard
          </div>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Dashboard Body */}
      <div className="p-5">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[13px] font-semibold text-slate-800">Evaluation Dashboard</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Multi-Agent Response Analysis</div>
          </div>
          <div className="flex gap-2">
            <div className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-600 text-[10px] font-semibold">
              Live
            </div>
            <div className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-medium">
              v1.0.0
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Evaluations', value: '1,247', change: '+12.5%', up: true },
            { label: 'Avg Score', value: '87.3', change: '+3.2%', up: true },
            { label: 'Agents Active', value: '5', change: '', up: null },
            { label: 'Processing', value: '23', change: '-8.1%', up: false },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white p-3 border border-slate-100">
              <div className="text-[10px] text-slate-400 font-medium">{stat.label}</div>
              <div className="text-[16px] font-bold text-slate-800 mt-1">{stat.value}</div>
              {stat.change && (
                <div className={`text-[10px] font-medium mt-0.5 ${stat.up ? 'text-emerald-500' : 'text-red-400'}`}>
                  {stat.change}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="rounded-lg bg-white border border-slate-100 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-600">Quality Score Trend</span>
            <span className="text-[10px] text-slate-400">Last 7 days</span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {[40, 55, 45, 65, 58, 72, 68, 78, 70, 82, 75, 88, 85, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary-500/80 to-primary-400/60"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Table Preview */}
        <div className="rounded-lg bg-white border border-slate-100 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-50 flex gap-4">
            {['Prompt', 'Score', 'Judges', 'Status'].map((col) => (
              <span key={col} className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex-1">
                {col}
              </span>
            ))}
          </div>
          {[
            { prompt: 'Explain quantum computing...', score: '92.1', judges: '5/5', status: 'Complete', color: 'emerald' },
            { prompt: 'Summarize the research paper...', score: '87.4', judges: '5/5', status: 'Complete', color: 'emerald' },
            { prompt: 'What are the side effects...', score: '—', judges: '3/5', status: 'Running', color: 'amber' },
          ].map((row, i) => (
            <div key={i} className="px-3 py-2 flex gap-4 border-b border-slate-50 last:border-0">
              <span className="text-[11px] text-slate-600 flex-1 truncate">{row.prompt}</span>
              <span className="text-[11px] font-mono text-slate-700 flex-1">{row.score}</span>
              <span className="text-[11px] text-slate-500 flex-1">{row.judges}</span>
              <span className={`text-[10px] font-semibold flex-1 ${
                row.color === 'emerald' ? 'text-emerald-500' : 'text-amber-500'
              }`}>
                {row.status === 'Running' && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-1 dot-pulse"></span>
                )}
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;
