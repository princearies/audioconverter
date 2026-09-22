import { Shield, Zap, Globe, Layers } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '100% Private',
    description: 'Files processed in your browser. Nothing uploaded.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Web Audio API for instant conversions.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'All Formats',
    description: 'MP3, WAV, OGG, FLAC, M4A, AAC & more.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layers,
    title: 'Batch Convert',
    description: 'Convert multiple files at once.',
    color: 'from-purple-500 to-pink-500',
  },
];

export function Features() {
  return (
    <div className="mt-12 sm:mt-16">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Why Choose Our Converter?</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 sm:p-5 hover:bg-white/10 transition-all group"
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
              <feature.icon size={16} className="text-white sm:hidden" />
              <feature.icon size={20} className="text-white hidden sm:block" />
            </div>
            <h3 className="font-semibold text-xs sm:text-base mb-0.5 sm:mb-1">{feature.title}</h3>
            <p className="text-[11px] sm:text-sm text-gray-400 leading-snug">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
