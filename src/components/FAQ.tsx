import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is this audio converter free?',
    a: 'Yes! Our audio converter is completely free to use with no limits on file size or number of conversions. No registration required.',
  },
  {
    q: 'Are my files safe and private?',
    a: 'Absolutely. All audio processing happens directly in your browser using the Web Audio API. Your files are never uploaded to any server — everything stays on your device.',
  },
  {
    q: 'What audio formats are supported?',
    a: 'We support converting to MP3, WAV, OGG, FLAC, M4A, and AAC. Input files can be any format your browser can decode (MP3, WAV, OGG, FLAC, M4A, WebM, AIFF, etc).',
  },
  {
    q: 'What is the maximum file size?',
    a: 'There is no hard limit since processing happens in your browser. However, very large files (500MB+) may cause your browser to use a lot of memory. We recommend files under 200MB for best performance.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes! The converter is fully responsive and works on smartphones and tablets. You can select files from your device storage or use the camera to record audio directly.',
  },
  {
    q: 'Why is the output still WAV even though I selected MP3?',
    a: 'Browser-based audio encoding has limitations. For best MP3 encoding quality, we recommend using a desktop application. The WAV output is still high quality and universally compatible.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12 sm:mt-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2 sm:space-y-3 max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-white/5 transition-all"
            >
              <span className="text-sm sm:text-base font-medium pr-4">{faq.q}</span>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-gray-400 shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
