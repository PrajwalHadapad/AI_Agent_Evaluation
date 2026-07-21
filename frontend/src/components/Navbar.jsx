import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar — Frosted-glass navigation bar with scroll-aware styling.
 *
 * Features:
 * - Transparent → frosted glass on scroll
 * - Logo placeholder with icon
 * - Navigation links
 * - Get Started + GitHub CTA buttons
 * - Mobile-responsive hamburger menu
 */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 navbar-glass ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" id="navbar-logo">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-sm shadow-primary-500/20 group-hover:shadow-md group-hover:shadow-primary-500/25 transition-shadow duration-200">
            <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A9.042 9.042 0 0 1 12 21a9.042 9.042 0 0 1-3.562-.71c-1.717-.293-2.3-2.379-1.067-3.61L8.6 14.5" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-slate-800 tracking-tight">
            EvalPlatform
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" id="navbar-navigation">
          <Link
            to="/evaluation"
            className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 ${
              location.pathname === '/evaluation'
                ? 'text-primary-700 bg-primary-50'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            Evaluate
          </Link>
          <Link
            to="/knowledge-base"
            className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 ${
              location.pathname === '/knowledge-base'
                ? 'text-primary-700 bg-primary-50'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            Knowledge Base
          </Link>
          <Link
            to="/document-chunking"
            className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 ${
              location.pathname === '/document-chunking'
                ? 'text-primary-700 bg-primary-50'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            Document Chunking
          </Link>
          {['Features', 'Dashboard', 'Docs', 'API'].map((item) => (
            <span
              key={item}
              className="px-3.5 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all duration-150 cursor-default"
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3" id="navbar-actions">
          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all duration-150"
            id="btn-github"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>

          {/* Get Started */}
          <button
            className="px-4 py-2 text-[13px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors duration-150 shadow-sm"
            id="btn-get-started"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-50 text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          id="btn-mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-6 py-4 space-y-1">
          <Link
            to="/evaluation"
            onClick={() => setMobileOpen(false)}
            className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${
              location.pathname === '/evaluation'
                ? 'text-primary-700 bg-primary-50'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Evaluate
          </Link>
          <Link
            to="/knowledge-base"
            onClick={() => setMobileOpen(false)}
            className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${
              location.pathname === '/knowledge-base'
                ? 'text-primary-700 bg-primary-50'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Knowledge Base
          </Link>
          <Link
            to="/document-chunking"
            onClick={() => setMobileOpen(false)}
            className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${
              location.pathname === '/document-chunking'
                ? 'text-primary-700 bg-primary-50'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Document Chunking
          </Link>
          {['Features', 'Dashboard', 'Docs', 'API'].map((item) => (
            <span
              key={item}
              className="block px-3 py-2.5 text-sm font-medium text-slate-500 rounded-lg hover:bg-slate-50 cursor-default"
            >
              {item}
            </span>
          ))}
          <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
