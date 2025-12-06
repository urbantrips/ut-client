'use client';

import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <div className="w-full flex items-center justify-center pb-20">
      <button
        className="text-gray-900 font-bold rounded-[30px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        style={{
          width: '317px',
          height: '77px',
          backgroundColor: '#FFDC2E80',
        }}
      >
        Plan My Trip
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

