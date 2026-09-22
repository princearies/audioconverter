export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3 text-purple-300">Supported Formats</h3>
            <p className="text-sm text-gray-400">
              MP3, WAV, OGG, FLAC, M4A, AAC, WMA, AIFF, and more. Convert between any audio format.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-purple-300">Privacy First</h3>
            <p className="text-sm text-gray-400">
              All processing happens locally in your browser. Your files never leave your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-purple-300">Free Forever</h3>
            <p className="text-sm text-gray-400">
              No registration, no limits, no watermarks. Convert as many files as you need.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 AudioConvert. All processing is done client-side for maximum privacy.</p>
        </div>
      </div>
    </footer>
  );
}
