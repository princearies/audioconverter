import { AudioFormat, SUPPORTED_FORMATS } from '../utils/audioConverter';

interface FormatSelectorProps {
  format: AudioFormat;
  onChange: (format: AudioFormat) => void;
}

const FORMAT_ICONS: Record<AudioFormat, string> = {
  mp3: '🎵',
  wav: '🌊',
  ogg: '🔊',
  flac: '💎',
  m4a: '🍎',
  aac: '📻',
  wma: '🪟',
};

export function FormatSelector({ format, onChange }: FormatSelectorProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span> Output Format
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {SUPPORTED_FORMATS.map((fmt) => (
          <button
            key={fmt.value}
            onClick={() => onChange(fmt.value)}
            className={`relative p-4 rounded-xl border-2 transition-all text-center group ${
              format === fmt.value
                ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
            }`}
          >
            <div className="text-2xl mb-1">{FORMAT_ICONS[fmt.value]}</div>
            <div className="font-bold text-sm">{fmt.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{fmt.description}</div>
            {format === fmt.value && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
