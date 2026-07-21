import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import DashboardPreview from '../components/DashboardPreview.jsx';

/**
 * HomePage — Enterprise AI SaaS landing page.
 *
 * Sections:
 * 1. Hero — Title, subtitle, CTAs, animated gradient background
 * 2. Dashboard Preview — Product showcase card
 * 3. Features — Platform capabilities grid
 * 4. Tech Stack — Technology cards
 * 5. CTA Banner — Bottom call-to-action
 */
function HomePage() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await api.healthCheck();
        setBackendStatus(data);
      } catch {
        setBackendStatus(null);
      } finally {
        setStatusLoading(false);
      }
    };
    checkBackend();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      title: 'Evaluation Input',
      description: 'Submit prompts and AI-generated responses for structured, systematic evaluation against defined criteria.',
      path: '/evaluation',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      title: 'Reference Knowledge Base',
      description: 'Upload and manage ground-truth documents that serve as authoritative reference material for evaluations.',
      path: '/knowledge-base',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
      title: 'RAG Pipeline',
      description: 'Retrieve contextually relevant knowledge through vector similarity search powered by ChromaDB embeddings.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
      title: 'Multi-Agent Judges',
      description: 'Multiple autonomous AI agents independently assess response quality, providing diverse evaluation perspectives.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      title: 'Analytics Dashboard',
      description: 'Interactive visualization of evaluation results with real-time metrics, trend analysis, and detailed reports.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
      ),
      title: 'Batch Evaluation',
      description: 'Process hundreds of evaluations asynchronously with parallel agent execution and queue management.',
    },
  ];

  const techStack = [
    {
      category: 'Frontend',
      items: ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Axios'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    {
      category: 'Backend',
      items: ['Python 3.12', 'FastAPI', 'Uvicorn', 'Pydantic', 'python-dotenv'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      category: 'Database',
      items: ['MongoDB', 'ChromaDB', 'Motor (async)', 'Vector Search'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      ),
    },
    {
      category: 'AI / ML',
      items: ['LangChain', 'Sentence Transformers', 'HuggingFace', 'Embeddings'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* =============================================
          HERO SECTION
          ============================================= */}
      <section className="hero-gradient hero-mesh relative" id="hero-section">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 md:pt-28 md:pb-12">
          {/* Status Pill */}
          <div className="fade-in-up flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[13px] font-medium" id="status-badge">
              {statusLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-[1.5px] border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                  Checking backend...
                </>
              ) : backendStatus ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 dot-pulse"></span>
                  <span className="text-emerald-600">Backend Online</span>
                  <span className="text-slate-300 mx-0.5">·</span>
                  <span className="text-slate-500">v{backendStatus.version}</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="text-amber-600">Backend Offline</span>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="fade-in-up fade-in-up-delay-1 text-center text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.1] text-slate-900" id="hero-title">
            LLM Response
            <br />
            <span className="text-gradient">Evaluation Platform</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up fade-in-up-delay-2 mt-6 text-center text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
            Evaluate AI-generated responses using Retrieval-Augmented Generation
            and Multi-Agent LLM Judges.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up fade-in-up-delay-3 mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              className="px-6 py-2.5 text-[14px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md flex items-center gap-2"
              id="hero-get-started"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-[14px] font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg transition-all duration-150 shadow-sm flex items-center gap-2"
              id="hero-github"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="fade-in-up fade-in-up-delay-4 max-w-4xl mx-auto px-6 pb-20">
          <div className="float-subtle">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* =============================================
          FEATURES SECTION
          ============================================= */}
      <section className="py-20 md:py-28 bg-white" id="features-section">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[12px] font-semibold uppercase tracking-wider mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
              </svg>
              Platform Modules
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" id="features-title">
              Everything you need to evaluate LLM quality
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
              A modular architecture designed for systematic, multi-perspective 
              evaluation of AI-generated content.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const CardContent = (
                <>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-100 group-hover:border-primary-200 transition-colors duration-200">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-[15px] font-semibold text-slate-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Status tag */}
                  {feature.path ? (
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dot-pulse"></span>
                      Active
                    </div>
                  ) : (
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      Coming soon
                    </div>
                  )}
                </>
              );

              if (feature.path) {
                return (
                  <Link
                    key={feature.title}
                    to={feature.path}
                    className="card p-6 group cursor-pointer block hover:scale-[1.01] duration-150"
                    id={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={feature.title}
                  className="card p-6 group cursor-default"
                  id={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============================================
          TECH STACK SECTION
          ============================================= */}
      <section className="py-20 md:py-28 bg-slate-50/60" id="tech-stack-section">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-[12px] font-semibold uppercase tracking-wider mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
              </svg>
              Tech Stack
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Built on modern infrastructure
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
              Production-grade technologies chosen for performance, scalability, 
              and developer experience.
            </p>
          </div>

          {/* Tech Stack Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="card p-6 group"
                id={`tech-${stack.category.toLowerCase().replace(/[\s/]+/g, '-')}`}
              >
                {/* Category Icon & Label */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-primary-50 group-hover:border-primary-100 group-hover:text-primary-600 transition-all duration-200">
                    {stack.icon}
                  </div>
                  <h3 className="text-[14px] font-semibold text-slate-800">
                    {stack.category}
                  </h3>
                </div>

                {/* Tech List */}
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[13px] text-slate-500"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-400/60"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          BOTTOM CTA SECTION
          ============================================= */}
      <section className="py-20 md:py-28 bg-white" id="cta-section">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Ready to evaluate your LLM outputs?
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 max-w-xl mx-auto">
            Set up the platform locally in minutes. Backend and frontend are 
            ready to run with a single command.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Terminal-style command card */}
            <div className="w-full sm:w-auto bg-slate-900 rounded-xl px-5 py-3.5 flex items-center gap-3 shadow-lg">
              <span className="text-emerald-400 text-[13px] font-mono select-none">$</span>
              <code className="text-[13px] text-slate-300 font-mono">
                uvicorn main:app --reload
              </code>
              <button
                className="ml-2 text-slate-500 hover:text-slate-300 transition-colors"
                title="Copy command"
                onClick={() => navigator.clipboard?.writeText('uvicorn main:app --reload')}
                id="btn-copy-command"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
              </button>
            </div>
          </div>

          {/* Architecture badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {['Modular Architecture', 'REST API', 'Async MongoDB', 'Vector Search', 'Multi-Agent'].map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-150 text-[12px] font-medium text-slate-500"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
