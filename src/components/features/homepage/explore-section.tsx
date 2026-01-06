'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Destination } from '@/data/destinations';
import { useTravelersInfoStore } from '@/store/travelers-info-store';

interface ExploreSectionProps {
  title: string;
  subtitle: string;
  destinations: Destination[];
  cardCount?: number;
}

export function ExploreSection({ title, subtitle, destinations, cardCount = 5 }: ExploreSectionProps) {
  const displayDestinations = destinations.slice(0, cardCount);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const router = useRouter();
  const setSelectedDestination = useTravelersInfoStore((state) => state.setSelectedDestination);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination.title);
    router.push('/travelers-info');
  };

  return (
    <section className="w-full px-4 sm:px-6 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-6 sm:py-12 md:py-10">
          <h2 className="mb-4">
            {title}
          </h2>
          <p>
            {subtitle}
          </p>
        </div>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 md:flex md:justify-center lg:justify-between lg:gap-0 scrollbar-hide">
          {displayDestinations.map((destination, index) => (
            <div
              key={`${destination.title}-${index}`}
              onClick={() => handleDestinationClick(destination)}
              className={`cursor-pointer group flex-shrink-0 ${index < displayDestinations.length - 1 ? 'md:mr-4' : ''}`}
            >
              <div
                className="w-[180px] h-[230px] sm:w-[120px] sm:h-[205px] md:w-[220px] md:h-[280px] lg:w-[246px] lg:h-[310px] mb-4 overflow-hidden relative shadow-lg transition-shadow duration-300 rounded-[15px] sm:rounded-[30px] md:rounded-[25px] bg-gray-200"
              >
                {!imageErrors[index] ? (
                  <>
                    <Image
                      src={destination.image}
                      alt={destination.title}
                      fill
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 120px, (max-width: 1024px) 220px, 246px"
                      onError={() => handleImageError(index)}
                      onLoad={() => handleImageLoad(index)}
                      loading="lazy"
                      quality={85}
                    />
                    {!imageLoaded[index] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Image not found</span>
                  </div>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
              </div>
              <p
                className="text-sm sm:text-base md:text-[15px] font-bold text-black text-center group-hover:text-primary transition-colors duration-300"
              >
                {destination.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

