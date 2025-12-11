'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const TravelStyleHeroSection = () => {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] rounded-[20px] sm:rounded-[30px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/hero/romantic-hero-bg.png"
        alt="Romantic mountain landscape"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
          Fall in Love, Somewhere Beautiful
        </h2>

        <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 md:mb-10 max-w-2xl px-2">
          <p className="text-sm sm:text-base md:text-lg text-purple-200/90 leading-relaxed">
            From quiet sunsets to mountain mornings
          </p>
          <p className="text-sm sm:text-base md:text-lg text-purple-200/90 leading-relaxed">
            Craft your romantic journeys that feel personal, peaceful, and unforgettable.
          </p>
        </div>

        <Button
          variant="outline"
          className="bg-transparent text-white border-[#FACC15] hover:bg-[#FACC15]/10 hover:text-white rounded-xl px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-medium"
        >
          Plan My Romantic Trip
        </Button>
      </div>
    </div>
  );
};

