import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface RomanticMessageProps {
  onRestart: () => void;
  show: boolean;
  reducedMotion?: boolean;
}

export const RomanticMessage: React.FC<RomanticMessageProps> = ({
  onRestart,
  show,
  reducedMotion = false,
}) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0.05 : 0.6,
        ease: 'easeOut',
      }}
      className="w-full max-w-2xl mx-auto my-12 px-4 flex items-center justify-center select-none"
    >
      <button
        type="button"
        onClick={onRestart}
        className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-google-gray-300 bg-white hover:bg-google-gray-50 text-google-gray-700 hover:text-google-gray-900 text-sm font-medium shadow-sm hover:shadow transition-all duration-200 active:scale-95"
      >
        <RotateCcw className="w-4 h-4 text-google-gray-500" />
        <span>Ще раз</span>
      </button>
    </motion.div>
  );
};
