'use client';

import { motion } from 'framer-motion';

interface ConfirmPlanButtonProps {
  onConfirm: () => void;
}

export function ConfirmPlanButton({ onConfirm }: ConfirmPlanButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-10">
      <motion.button
        onClick={onConfirm}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full bg-primary-500 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-primary-600 transition-colors"
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        Confirm this Plan
      </motion.button>
    </div>
  );
}

