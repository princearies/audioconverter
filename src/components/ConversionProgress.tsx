import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ConversionProgressProps {
  progress: number;
  files: number;
}

export function ConversionProgress({ progress, files }: ConversionProgressProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center"
      >
        <Loader2 size={36} className="text-purple-400" />
      </motion.div>

      <h2 className="text-2xl font-bold mb-2">Converting...</h2>
      <p className="text-gray-400 mb-6">
        Processing {files} file{files !== 1 ? 's' : ''}
      </p>

      <div className="max-w-md mx-auto">
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-400">Progress</span>
          <span className="font-mono font-bold text-purple-300">{progress}%</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
        <div className="text-center">
          <div className="text-2xl mb-1">📥</div>
          <div className="text-xs text-gray-400">Reading</div>
          <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${progress >= 10 ? 'bg-green-500' : 'bg-gray-600'}`} />
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">🔄</div>
          <div className="text-xs text-gray-400">Converting</div>
          <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${progress >= 50 ? 'bg-green-500' : 'bg-gray-600'}`} />
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">📦</div>
          <div className="text-xs text-gray-400">Encoding</div>
          <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${progress >= 90 ? 'bg-green-500' : 'bg-gray-600'}`} />
        </div>
      </div>
    </div>
  );
}
