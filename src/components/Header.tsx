import { Music2 } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-xl bg-white/5">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Music2 size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">AudioConvert</h1>
            <p className="text-xs text-gray-400">Free Online Converter</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Converter</a>
          <a href="#" className="hover:text-white transition-colors">Formats</a>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
