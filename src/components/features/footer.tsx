'use client';

import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <div className="w-full flex items-center justify-center pb-12 sm:pb-16 md:pb-20 py-8 sm:py-10 md:py-12 px-4">
      <button
        className="text-gray-900 font-bold rounded-[20px] sm:rounded-[25px] md:rounded-[30px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity w-full max-w-[280px] sm:max-w-[300px] md:max-w-[317px] h-[60px] sm:h-[68px] md:h-[77px] text-sm sm:text-base md:text-lg"
        style={{
          backgroundColor: '#FFDC2E80',
        }}
      >
        Plan My Trip
        <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
}

