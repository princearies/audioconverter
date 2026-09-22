import { Download, RotateCcw, FileAudio, CheckCircle2 } from 'lucide-react';

interface ConvertedFile {
  name: string;
  originalSize: number;
  convertedSize: number;
  blob: Blob;
  format: string;
  url: string;
}

interface DownloadResultProps {
  files: ConvertedFile[];
  onDownloadAll: () => void;
  onReset: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function DownloadResult({ files, onDownloadAll, onReset }: DownloadResultProps) {
  const totalOriginal = files.reduce((sum, f) => sum + f.originalSize, 0);
  const totalConverted = files.reduce((sum, f) => sum + f.convertedSize, 0);
  const sizeDiff = totalOriginal - totalConverted;
  const sizePercent = totalOriginal > 0 ? ((sizeDiff / totalOriginal) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Success banner */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-green-400 sm:hidden" />
          <CheckCircle2 size={40} className="text-green-400 hidden sm:block" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Conversion Complete! 🎉</h2>
        <p className="text-sm sm:text-base text-gray-400">
          {files.length} file{files.length !== 1 ? 's' : ''} successfully converted
        </p>
      </div>

      {/* File list */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
        <h3 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <FileAudio size={16} className="text-purple-400" />
          Converted Files
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 bg-white/5 rounded-xl px-3 sm:px-4 py-3 border border-white/5"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                  <FileAudio size={14} className="text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">{file.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {formatSize(file.originalSize)} → {formatSize(file.convertedSize)}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                download={file.name}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Download size={14} />
                Download
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-3 sm:p-4 text-center">
          <p className="text-lg sm:text-2xl font-bold text-purple-300">{files.length}</p>
          <p className="text-[10px] sm:text-sm text-gray-400">Files</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-3 sm:p-4 text-center">
          <p className="text-lg sm:text-2xl font-bold text-pink-300">{formatSize(totalConverted)}</p>
          <p className="text-[10px] sm:text-sm text-gray-400">Output</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-3 sm:p-4 text-center">
          <p className={`text-lg sm:text-2xl font-bold ${sizeDiff >= 0 ? 'text-green-300' : 'text-orange-300'}`}>
            {sizeDiff >= 0 ? `-${sizePercent}%` : `+${Math.abs(Number(sizePercent))}%`}
          </p>
          <p className="text-[10px] sm:text-sm text-gray-400">Size</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onDownloadAll}
          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-semibold text-base sm:text-lg shadow-lg shadow-green-500/25 flex items-center justify-center gap-2 active:scale-95"
        >
          <Download size={18} />
          Download All
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium flex items-center justify-center gap-2 active:scale-95"
        >
          <RotateCcw size={16} />
          Convert More
        </button>
      </div>
    </div>
  );
}
