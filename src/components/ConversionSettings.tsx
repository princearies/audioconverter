import { AudioFormat, QualitySettings, BITRATE_OPTIONS, SAMPLE_RATE_OPTIONS } from '../utils/audioConverter';
import { Settings2 } from 'lucide-react';

interface ConversionSettingsProps {
  format: AudioFormat;
  settings: QualitySettings;
  onChange: (settings: QualitySettings) => void;
}

export function ConversionSettings({ format, settings, onChange }: ConversionSettingsProps) {
  const showBitrate = ['mp3', 'aac', 'ogg', 'm4a'].includes(format);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
        <Settings2 size={20} className="text-purple-400" />
        Quality Settings
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {showBitrate && (
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Bitrate (kbps)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
              {BITRATE_OPTIONS.map((br) => (
                <button
                  key={br}
                  onClick={() => onChange({ ...settings, bitrate: br })}
                  className={`px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                    settings.bitrate === br
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {br}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
            Sample Rate (Hz)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {SAMPLE_RATE_OPTIONS.map((sr) => (
              <button
                key={sr}
                onClick={() => onChange({ ...settings, sampleRate: sr })}
                className={`px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                  settings.sampleRate === sr
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {sr >= 1000 ? `${sr / 1000}k` : sr}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
            Channels
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-w-xs">
            <button
              onClick={() => onChange({ ...settings, channels: 1 })}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                settings.channels === 1
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Mono (1ch)
            </button>
            <button
              onClick={() => onChange({ ...settings, channels: 2 })}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                settings.channels === 2
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Stereo (2ch)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/5">
        <p className="text-[11px] sm:text-xs text-gray-400">
          💡 <strong>Tip:</strong> Higher bitrate = better quality but larger file. 
          192 kbps is great for most uses.
          {format === 'wav' && ' WAV is always lossless.'}
          {format === 'flac' && ' FLAC = lossless, ~50-60% of WAV size.'}
        </p>
      </div>
    </div>
  );
}
