import { AudioFormat, QualitySettings, BITRATE_OPTIONS, SAMPLE_RATE_OPTIONS } from '../utils/audioConverter';
import { Settings2 } from 'lucide-react';

interface ConversionSettingsProps {
  format: AudioFormat;
  settings: QualitySettings;
  onChange: (settings: QualitySettings) => void;
}

export function ConversionSettings({ format, settings, onChange }: ConversionSettingsProps) {
  const showBitrate = ['mp3', 'aac', 'ogg', 'm4a'].includes(format);
  const showChannels = true;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Settings2 size={22} className="text-purple-400" />
        Quality Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {showBitrate && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bitrate (kbps)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BITRATE_OPTIONS.map((br) => (
                <button
                  key={br}
                  onClick={() => onChange({ ...settings, bitrate: br })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sample Rate (Hz)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SAMPLE_RATE_OPTIONS.map((sr) => (
              <button
                key={sr}
                onClick={() => onChange({ ...settings, sampleRate: sr })}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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

        {showChannels && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Channels
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onChange({ ...settings, channels: 1 })}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  settings.channels === 1
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Mono (1)
              </button>
              <button
                onClick={() => onChange({ ...settings, channels: 2 })}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  settings.channels === 2
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Stereo (2)
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/5">
        <p className="text-xs text-gray-400">
          💡 <strong>Tip:</strong> Higher bitrate = better quality but larger file size. 
          192 kbps is a good balance for most use cases.
          {format === 'wav' && ' WAV is always lossless regardless of settings.'}
          {format === 'flac' && ' FLAC provides lossless compression, typically 50-60% of WAV size.'}
        </p>
      </div>
    </div>
  );
}
