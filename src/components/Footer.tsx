import { Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12 sm:mt-16">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base text-purple-300">Supported Formats</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              MP3, WAV, OGG, FLAC, M4A, AAC, WMA, AIFF & more.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base text-purple-300">Privacy First</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              All processing happens locally in your browser. Your files never leave your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base text-purple-300">Open Source</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-2">
              Free forever. No registration, no limits.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Github size={14} />
              View on GitHub
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © 2026 AudioConvert. Client-side processing for maximum privacy.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart size={12} className="text-pink-500" /> on Cloudflare
          </p>
        </div>
      </div>
    </footer>
  );
}
