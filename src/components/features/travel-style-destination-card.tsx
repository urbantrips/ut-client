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

  return (
    <motion.div
      className="flex flex-col cursor-pointer group flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-[280px] sm:h-[300px] md:h-[320px] lg:h-[340px] rounded-2xl sm:rounded-3xl mb-4 overflow-hidden relative shadow-lg transition-shadow duration-300 bg-gray-200">
        {!imageError ? (
          <>
            <Image
              src={destination.image}
              alt={destination.title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 260px"
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
      <div className="px-2">
        <p className="text-sm sm:text-base md:text-lg font-bold text-black text-center mb-2">
          {destination.title}
        </p>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center mb-3">
          {destination.price}
        </p>
        <div className="flex gap-2">
          <button className="flex-1 bg-primary text-gray-900 rounded-lg sm:rounded-xl py-2 sm:py-2.5 flex items-center justify-center font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-colors duration-300">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button className="flex-1 bg-primary text-gray-900 rounded-lg sm:rounded-xl py-2 sm:py-2.5 flex items-center justify-center font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-colors duration-300">
            Plan Trip
          </button>
        </div>
      </div>
    </motion.div>
  );
}

