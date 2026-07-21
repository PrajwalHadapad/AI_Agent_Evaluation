/**
 * Footer — Clean, minimal footer with links and branding.
 */
function Footer() {
  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Dashboard', 'Evaluations', 'API'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Guides', 'Changelog', 'Status'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Contact'],
    },
  ];

  return (
    <footer className="border-t border-slate-100 bg-slate-50/50" id="site-footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A9.042 9.042 0 0 1 12 21a9.042 9.042 0 0 1-3.562-.71c-1.717-.293-2.3-2.379-1.067-3.61L8.6 14.5" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">EvalPlatform</span>
            </div>
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-xs">
              AI-powered multi-agent evaluation for LLM responses. 
              Built with RAG, autonomous judges, and enterprise-grade infrastructure.
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-[12px] font-semibold text-slate-800 uppercase tracking-wider mb-3">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <span className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors cursor-default">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="section-divider mt-10 mb-6"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-slate-400">
            © 2026 LLM Evaluation Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-slate-400">
            <span className="hover:text-slate-600 cursor-default transition-colors">Privacy</span>
            <span className="hover:text-slate-600 cursor-default transition-colors">Terms</span>
            <span className="hover:text-slate-600 cursor-default transition-colors">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
