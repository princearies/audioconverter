import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadArea } from './components/UploadArea';
import { FormatSelector } from './components/FormatSelector';
import { ConversionSettings } from './components/ConversionSettings';
import { ConversionProgress } from './components/ConversionProgress';
import { DownloadResult } from './components/DownloadResult';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { convertAudio, AudioFormat, QualitySettings } from './utils/audioConverter';

type AppState = 'upload' | 'settings' | 'converting' | 'complete';

interface ConvertedFile {
  name: string;
  originalSize: number;
  convertedSize: number;
  blob: Blob;
  format: AudioFormat;
  url: string;
}

function App() {
  const [state, setState] = useState<AppState>('upload');
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<AudioFormat>('mp3');
  const [quality, setQuality] = useState<QualitySettings>({
    bitrate: 192,
    sampleRate: 44100,
    channels: 2,
  });
  const [progress, setProgress] = useState(0);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError(null);
    setState('settings');
  }, []);

  const handleConvert = useCallback(async () => {
    setState('converting');
    setProgress(0);
    setError(null);
    const results: ConvertedFile[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(Math.round((i / files.length) * 100));

        const result = await convertAudio(file, format, quality, (p: number) => {
          const overallProgress = Math.round(((i + p / 100) / files.length) * 100);
          setProgress(overallProgress);
        });

        const url = URL.createObjectURL(result.blob);
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        results.push({
          name: `${baseName}.${format}`,
          originalSize: file.size,
          convertedSize: result.blob.size,
          blob: result.blob,
          format,
          url,
        });
      }

      setProgress(100);
      setConvertedFiles(results);
      setTimeout(() => setState('complete'), 500);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Conversion failed. Please try again.');
      setState('settings');
    }
  }, [files, format, quality]);

  const handleReset = useCallback(() => {
    convertedFiles.forEach((f) => URL.revokeObjectURL(f.url));
    setConvertedFiles([]);
    setFiles([]);
    setProgress(0);
    setError(null);
    setState('upload');
  }, [convertedFiles]);

  const handleDownloadAll = useCallback(() => {
    convertedFiles.forEach((file) => {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }, [convertedFiles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {state === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero */}
              <div className="text-center mb-6 sm:mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                >
                  Online Audio Converter
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto px-2"
                >
                  Convert audio files to MP3, WAV, OGG, FLAC & more.
                  <span className="hidden sm:inline"> Free, fast, and secure — all processing happens in your browser.</span>
                </motion.p>
              </div>

              <UploadArea onFilesSelected={handleFilesSelected} />
              <div id="features"><Features /></div>
              <div id="faq"><FAQ /></div>
            </motion.div>
          )}

          {state === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Selected files card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
                <h2 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">📁</span> Selected Files ({files.length})
                </h2>
                <div className="space-y-1.5 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 sm:px-4 py-2">
                      <span className="text-xs sm:text-sm truncate flex-1">{file.name}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 ml-2 shrink-0">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <FormatSelector format={format} onChange={setFormat} />
              <ConversionSettings format={format} settings={quality} onChange={setQuality} />

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 sm:p-4 text-red-300 text-sm"
                >
                  ⚠️ {error}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium active:scale-95"
                >
                  ← Back
                </button>
                <button
                  onClick={handleConvert}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold text-base sm:text-lg shadow-lg shadow-purple-500/25 active:scale-95"
                >
                  🔄 Convert Now
                </button>
              </div>
            </motion.div>
          )}

          {state === 'converting' && (
            <motion.div
              key="converting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ConversionProgress progress={progress} files={files.length} />
            </motion.div>
          )}

          {state === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DownloadResult
                files={convertedFiles}
                onDownloadAll={handleDownloadAll}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
