import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext.jsx';

// Inline SVGs for Navigation Icons
const IconDashboard = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
  </svg>
);

const IconInput = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
  </svg>
);

const IconKB = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconChunking = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
  </svg>
);

const IconEmbeddings = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);

const IconVectorStore = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const IconRetrieval = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const IconEvaluations = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
);

const IconAnalytics = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const IconSettings = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const IconDocs = () => (
  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const IconBrain = () => (
  <svg className="w-7 h-7 text-theme-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0.495-7.467 5.99 5.99 0 0 0-1.925-3.546 5.974 5.974 0 0 0-4.133-1.527C3.544 5.46 1.75 7.6 1.75 10.25c0 2.115 1.135 3.966 2.836 4.978A3.75 3.75 0 0 0 12 18Zm0 0v-4.5M12 13.5h3.75m-3.75 0H8.25m3.75 0a3.75 3.75 0 0 1 7.07 1.732c0 1.258-.62 2.37-1.577 3.048a3.743 3.743 0 0 1-1.037 3.275 3.742 3.742 0 0 1-3.274 1.037c-1.258 0-2.37-.62-3.048-1.577a3.743 3.743 0 0 1-3.275-1.037 3.745 3.745 0 0 1-1.037-3.275 3.743 3.743 0 0 1-1.583-3.047c0-2.072 1.68-3.75 3.75-3.75h7.5c2.07 0 3.75 1.678 3.75 3.75v4.5" />
  </svg>
);

const IconUser = () => (
  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-theme-accent/30 shadow-md">
    PK
  </div>
);

function MainLayout() {
  const { theme, setTheme, THEMES } = useTheme();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: <IconDashboard /> },
    { label: 'Evaluation Input', path: '/evaluation', icon: <IconInput /> },
    { label: 'Knowledge Base', path: '/knowledge-base', icon: <IconKB /> },
    { label: 'Chunking', path: '/document-chunking', icon: <IconChunking /> },
    { label: 'Embeddings', path: '/embeddings', icon: <IconEmbeddings /> },
    { label: 'Vector Store', path: '/vector-store', icon: <IconVectorStore /> },
    { label: 'Retrieval', path: '/retrieval', icon: <IconRetrieval /> },
    { label: 'Evaluations', path: '/evaluations', icon: <IconEvaluations /> },
    { label: 'Analytics', path: '/analytics', icon: <IconAnalytics /> },
    { label: 'Settings', path: '/settings', icon: <IconSettings /> },
    { label: 'Docs', path: '/docs', icon: <IconDocs /> },
  ];

  const themeList = [
    { id: THEMES.AURORA, name: 'Aurora', gradient: 'from-[#6366f1] to-[#a855f7]', border: 'border-[#8b5cf6]' },
    { id: THEMES.OCEAN, name: 'Ocean', gradient: 'from-[#06b6d4] to-[#3b82f6]', border: 'border-[#06b6d4]' },
    { id: THEMES.FOREST, name: 'Forest', gradient: 'from-[#10b981] to-[#22c55e]', border: 'border-[#10b981]' },
    { id: THEMES.SUNSET, name: 'Sunset', gradient: 'from-[#ec4899] to-[#f97316]', border: 'border-[#ec4899]' },
    { id: THEMES.MIDNIGHT, name: 'Midnight', gradient: 'from-[#3b82f6] to-[#1d4ed8]', border: 'border-[#3b82f6]' },
    { id: THEMES.LIGHT, name: 'Light', gradient: 'from-[#e2e8f0] to-[#cbd5e1]', border: 'border-[#cbd5e1]', isLight: true },
  ];

  const toggleQuickTheme = () => {
    if (theme === THEMES.LIGHT) {
      setTheme(THEMES.AURORA);
    } else {
      setTheme(THEMES.LIGHT);
    }
  };

  const isDark = theme !== THEMES.LIGHT;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-theme-sidebar border-r border-theme-border/50 text-theme-text theme-transition-all select-none">
      {/* Branding Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-theme-border/30">
        <IconBrain />
        <div>
          <span className="font-extrabold text-[15px] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-theme-text to-theme-accent">
            LLM Eval Platform
          </span>
          <span className="block text-[10px] text-theme-text-muted font-medium tracking-wide">
            Enterprise Console
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin scrollbar-thumb-theme-border">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 text-[13px] font-medium rounded-xl transition-all duration-200 border-l-2 ${
                isActive
                  ? 'bg-gradient-to-r from-theme-accent/15 to-theme-accent/3 border-theme-accent text-white font-semibold shadow-inner'
                  : 'border-transparent text-theme-text-muted hover:text-white hover:bg-theme-card-hover hover:border-theme-border/40'
              }`}
            >
              <div className={`transition-colors duration-200 ${isActive ? 'text-theme-accent' : 'text-theme-text-muted group-hover:text-white'}`}>
                {item.icon}
              </div>
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-theme-accent shadow shadow-theme-accent/50 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Sidebar Footer Controls */}
      <div className="p-4 border-t border-theme-border/30 space-y-4 bg-theme-sidebar/80 backdrop-blur-sm">
        {/* Toggle Theme Switch */}
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-[12px] font-medium text-theme-text-muted">
            Toggle Theme
          </span>
          <button
            onClick={toggleQuickTheme}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative focus:outline-none ${
              isDark ? 'bg-theme-accent' : 'bg-slate-300'
            }`}
            aria-label="Toggle theme mode"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                isDark ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              {isDark ? (
                <svg className="w-3.5 h-3.5 text-theme-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-theme-card/30 border border-theme-border/20 shadow-sm hover:bg-theme-card-hover/40 transition-colors duration-200 cursor-pointer">
          <IconUser />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-theme-text truncate leading-none">
              Prajwal Kumar
            </p>
            <p className="text-[10px] text-theme-text-muted truncate mt-1">
              AI Engineer
            </p>
          </div>
          <svg className="w-3.5 h-3.5 text-theme-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-theme-bg text-theme-text font-sans selection:bg-theme-accent/25 selection:text-white theme-transition-all relative overflow-hidden">
      
      {/* Background Glow Mesh Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-theme-accent/8 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-theme-accent/5 blur-[100px] pointer-events-none z-0" />

      {/* Desktop Sidebar (Left) */}
      <aside className="hidden lg:block w-64 flex-shrink-0 z-10 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (Left) */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Drawer Panel */}
          <div className="relative flex flex-col w-64 max-w-xs h-full z-10 animate-fade-in">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Panel Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 h-screen overflow-hidden">
        
        {/* Top Header & Theme Selector */}
        <header className="flex flex-col border-b border-theme-border/40 bg-theme-bg/60 backdrop-blur-lg sticky top-0 z-20">
          <div className="px-6 h-16 flex items-center justify-between">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-theme-card border border-theme-border/50 text-theme-text hover:bg-theme-card-hover transition-colors"
              aria-label="Open navigation sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Title / Current path */}
            <div className="hidden sm:block text-[14px] font-bold tracking-tight text-theme-text/90">
              {location.pathname === '/' && 'Interactive Dashboard'}
              {location.pathname === '/evaluation' && 'Evaluation Input Tool'}
              {location.pathname === '/knowledge-base' && 'Reference Knowledge Base'}
              {location.pathname === '/document-chunking' && 'Document Chunking Pipeline'}
              {location.pathname === '/embeddings' && 'Embedding Generation Service'}
              {location.pathname === '/vector-store' && 'Vector Database Control Room'}
              {location.pathname === '/retrieval' && 'Semantic Retrieval System'}
              {location.pathname === '/landing' && 'Product Landing Page'}
            </div>

            {/* Quick Actions (Theme current state dropdown/badge and Notifications) */}
            <div className="flex items-center gap-4">
              {/* Notification bell */}
              <button className="p-2 rounded-xl bg-theme-card/50 border border-theme-border/20 text-theme-text-muted hover:text-white hover:bg-theme-card-hover transition-colors cursor-pointer relative shadow-sm">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a9.04 9.04 0 0 1-1.667-.985V5.653a3.5 3.5 0 1 0-7 0v10.444c0 .357-.1.7-.283 1.018l-1.023 1.79c-.497.87.118 1.94 1.13 1.94h11.378c1.022 0 1.637-1.07 1.129-1.94l-1.023-1.79ZM9 19h6m-6 0a3 3 0 0 0 6 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-theme-accent ring-2 ring-theme-bg" />
              </button>

              {/* Custom Dropdown Theme Selector */}
              <div className="relative">
                <button
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-theme-card border border-theme-border/40 text-[12px] font-bold text-white hover:border-theme-accent/60 shadow-inner transition-all duration-200 cursor-pointer"
                  aria-expanded={themeDropdownOpen}
                  aria-label="Select Theme Dropdown"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-theme-accent animate-pulse shadow-md shadow-theme-accent/50" />
                  <span className="capitalize">{theme} Theme</span>
                  <svg className={`w-3 h-3 text-theme-text-muted transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {themeDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setThemeDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-44 rounded-xl border border-theme-border/50 bg-theme-sidebar shadow-2xl p-2 z-40 animate-fade-in space-y-1">
                      <p className="text-[10px] font-extrabold text-theme-text-muted uppercase tracking-wider px-2 py-1 select-none">
                        Select Theme
                      </p>
                      {themeList.map((t) => {
                        const isSelected = theme === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              setTheme(t.id);
                              setThemeDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between gap-3 px-2 py-1.5 rounded-lg text-[12px] font-semibold text-left transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-theme-accent/15 text-white font-bold'
                                : 'text-theme-text-muted hover:text-white hover:bg-theme-card-hover'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${t.gradient}`} />
                              <span className="truncate">{t.name}</span>
                            </div>
                            {isSelected && (
                              <svg className="w-3.5 h-3.5 text-theme-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet Page Wrapper */}
        <main className="flex-1 overflow-y-auto px-6 py-8 relative">
          <div className="max-w-7xl mx-auto page-transition-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
