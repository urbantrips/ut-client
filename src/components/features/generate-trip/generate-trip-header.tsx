'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


export function GenerateTripHeader() {
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

      </div>
    </div>
  );
}

