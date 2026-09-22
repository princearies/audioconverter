import { Shield, Zap, Globe, Layers } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '100% Private',
    description: 'Files are processed entirely in your browser. Nothing is uploaded to any server.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Powered by Web Audio API for near-instant conversions with zero server wait.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'All Formats',
    description: 'Support for MP3, WAV, OGG, FLAC, M4A, AAC and many more audio formats.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layers,
    title: 'Batch Convert',
    description: 'Convert multiple files at once. Drag and drop as many files as you need.',
    color: 'from-purple-500 to-pink-500',
  },
];

export function Features() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Converter?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:bg-white/10 transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <feature.icon size={20} className="text-white" />
            </div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
