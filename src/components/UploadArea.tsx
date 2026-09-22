import { useState, useRef, useCallback } from 'react';
import { Upload, FileAudio, X } from 'lucide-react';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

const ACCEPTED_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/flac',
  'audio/mp4',
  'audio/aac',
  'audio/x-ms-wma',
  'audio/aiff',
  'audio/x-aiff',
  'audio/webm',
];

const ACCEPTED_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac', '.wma', '.aiff', '.webm'];

export function UploadArea({ onFilesSelected }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(
      (file) =>
        ACCEPTED_TYPES.includes(file.type) ||
        ACCEPTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))
    );
    setSelectedFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        validateAndAddFiles(e.dataTransfer.files);
      }
    },
    [validateAndAddFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        validateAndAddFiles(e.target.files);
      }
    },
    [validateAndAddFiles]
  );

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleStartConversion = useCallback(() => {
    if (selectedFiles.length > 0) {
      onFilesSelected(selectedFiles);
    }
  }, [selectedFiles, onFilesSelected]);

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-purple-400 bg-purple-500/20 scale-[1.02]'
            : 'border-white/20 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(',')}
          multiple
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
              isDragging
                ? 'bg-purple-500/30 scale-110'
                : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
            }`}
          >
            <Upload size={36} className="text-purple-300" />
          </div>
          <div>
            <p className="text-xl font-semibold mb-1">
              {isDragging ? 'Drop files here!' : 'Drag & drop audio files'}
            </p>
            <p className="text-gray-400">
              or <span className="text-purple-400 underline">browse files</span> from your device
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {['MP3', 'WAV', 'OGG', 'FLAC', 'M4A', 'AAC'].map((fmt) => (
              <span
                key={fmt}
                className="px-2 py-1 rounded-md bg-white/10 text-xs text-gray-300"
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <FileAudio size={18} className="text-purple-400" />
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
            </h3>
            <button
              onClick={() => setSelectedFiles([])}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {selectedFiles.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileAudio size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm truncate">{file.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleStartConversion}
            className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold text-lg shadow-lg shadow-purple-500/25"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
