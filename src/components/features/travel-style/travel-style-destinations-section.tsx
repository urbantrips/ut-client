'use client';

import { TravelStyleDestinationCard } from './travel-style-destination-card';

interface TravelStyleDestination {
  title: string;
  image: string;
  price: string;
}

interface TravelStyleDestinationsSectionProps {
  title: string;
  destinations: TravelStyleDestination[];
  cardCount?: number;
}

export function TravelStyleDestinationsSection({ 
  title, 
  destinations, 
  cardCount = 5 
}: TravelStyleDestinationsSectionProps) {
  // Always show 5 cards on desktop, but only show 3 on mobile
  const displayDestinations = destinations.slice(0, cardCount);

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            {title}
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-2 sm:gap-4 md:gap-6 pb-4 scrollbar-hide">
          {displayDestinations.map((destination, index) => (
            <TravelStyleDestinationCard
              key={`${destination.title}-${index}`}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

