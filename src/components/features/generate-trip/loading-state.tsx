'use client';

import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Generating your personalized itinerary...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mb-4" />
      <p
        className="text-gray-600 text-center"
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        {message}
      </p>
    </div>
  );
}

