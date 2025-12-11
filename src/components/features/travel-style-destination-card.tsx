'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface TravelStyleDestinationCardProps {
  destination: {
    title: string;
    image: string;
    price: string;
  };
  index: number;
}

export function TravelStyleDestinationCard({ destination, index }: TravelStyleDestinationCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    // Handle card click - navigate to destination details or similar
    console.log('Card clicked:', destination.title);
  };

  const handlePhoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Handle phone call action
    console.log('Phone clicked for:', destination.title);
    // You can add actual phone call logic here
  };

  const handlePlanTripClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Handle plan trip action
    console.log('Plan trip clicked for:', destination.title);
    // You can add navigation or modal logic here
  };

  return (
    <motion.div
      className="flex flex-col cursor-pointer group flex-shrink-0 w-full sm:w-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleCardClick}
    >
      <div className="w-full sm:w-[220px] md:w-[240px] lg:w-[260px] h-[140px] sm:h-[300px] md:h-[320px] lg:h-[340px] rounded-2xl sm:rounded-3xl mb-2 sm:mb-4 overflow-hidden relative shadow-lg transition-shadow duration-300 bg-gray-200">
        {!imageError ? (
          <>
            <Image
              src={destination.image}
              alt={destination.title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 33vw, (max-width: 768px) 220px, (max-width: 1024px) 240px, 260px"
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              quality={85}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Image not found</span>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
      
      {/* Destination Info */}
      <div className="px-1 sm:px-2 min-w-0">
        <p className="text-xs sm:text-base md:text-lg font-bold text-black text-center mb-1 sm:mb-2 truncate">
          {destination.title}
        </p>
        <p className="text-[10px] sm:text-sm md:text-base text-gray-600 text-center mb-1.5 sm:mb-3 truncate">
          {destination.price}
        </p>
        <div className="flex gap-1 sm:gap-2 min-w-0">
          <button
            onClick={handlePhoneClick}
            className="flex-shrink-0 w-10 sm:w-12 bg-primary text-gray-900 rounded-lg sm:rounded-xl py-1.5 sm:py-2.5 flex items-center justify-center font-semibold text-[10px] sm:text-sm hover:bg-primary/90 active:bg-primary/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Call about ${destination.title}`}
            type="button"
          >
            <Phone className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handlePlanTripClick}
            className="flex-1 min-w-0 bg-primary text-gray-900 rounded-lg sm:rounded-xl py-1.5 sm:py-2.5 flex items-center justify-center font-semibold text-[10px] sm:text-sm hover:bg-primary/90 active:bg-primary/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Plan trip to ${destination.title}`}
            type="button"
          >
            <span className="truncate">Plan Trip</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

