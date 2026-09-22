import { useState, useEffect } from 'react';
import { Music2, Menu, X, Github } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState<{ totalConversions: number; supportedFormats: number } | null>(null);

  useEffect(() => {
    // Fetch stats from API (dynamic content)
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-900/80">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Music2 size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg leading-tight">AudioConvert</h1>
            <p className="text-[10px] sm:text-xs text-gray-400">
              {stats ? `${stats.supportedFormats} formats supported` : 'Free Online Converter'}
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Converter</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-2">
            <a href="#" className="px-4 py-3 rounded-lg hover:bg-white/10 transition-all">Converter</a>
            <a href="#features" className="px-4 py-3 rounded-lg hover:bg-white/10 transition-all">Features</a>
            <a href="#faq" className="px-4 py-3 rounded-lg hover:bg-white/10 transition-all">FAQ</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition-all"
            >
              <Github size={16} />
              <span>View Source on GitHub</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
