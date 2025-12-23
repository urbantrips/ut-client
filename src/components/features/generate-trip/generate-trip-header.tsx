'use client';

import { motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GenerateTripHeaderProps {
  isLoading: boolean;
  hasItinerary: boolean;
  onConfirmPlan: () => void;
}

export function GenerateTripHeader({
  isLoading,
  hasItinerary,
  onConfirmPlan,
}: GenerateTripHeaderProps) {
  const router = useRouter();

  return (
    <div className="px-4 pt-4 pb-3">
      <div className="relative flex items-center mb-4">
          <button
            onClick={() => router.back()}
            className="text-black hover:opacity-70 transition-opacity flex items-center z-10"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1
            className="absolute left-0 right-0 text-xl font-bold text-black text-center pointer-events-none"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Customize your plan
          </h1>
          <div className="ml-auto z-10">
            {!isLoading && hasItinerary ? (
              <motion.button
                onClick={onConfirmPlan}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-primary-600 transition-colors whitespace-nowrap"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Confirm this Plan
              </motion.button>
            ) : (
              <div className="w-6"></div>
            )}
          </div>
        </div>
    </div>
  );
}

