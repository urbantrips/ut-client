'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { destinationsByCategory, type DestinationCategory, type Destination } from '@/data/destinations';

const filterOptions: DestinationCategory[] = ['Must Visit', 'Trending', 'Weekend', 'New Discoveries', 'Just for You'];

function DestinationCard({ destination, index, activeFilter }: { destination: Destination; index: number; activeFilter: DestinationCategory }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      key={`${activeFilter}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex flex-col cursor-pointer group ${index >= 6 ? 'hidden sm:flex' : ''}`}
    >
      {/* Destination Image */}
      <div
        className="w-[102px] h-[114px] sm:w-[180px] sm:h-[200px] md:w-[210px] md:h-[220px] lg:w-[232px] lg:h-[232px] rounded-[12px] sm:rounded-[20px] md:rounded-[25px] lg:rounded-[30px] mb-2 sm:mb-3 overflow-hidden relative bg-gray-200"
      >
        {!imageError ? (
          <>
            <Image
              src={destination.image}
              alt={destination.title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 102px, (max-width: 768px) 180px, (max-width: 1024px) 210px, 232px"
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
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Image not found</span>
          </div>
        )}
      </div>
      
      {/* Destination Name */}
      <h3 className="text-[12px] sm:text-[14px] md:text-base lg:text-lg text-center font-bold text-gray-900">
        {destination.title}
      </h3>
    </motion.div>
  );
}

export function BrowseDestinationsSection() {
  const [activeFilter, setActiveFilter] = useState<DestinationCategory>('Must Visit');
  const destinations = destinationsByCategory[activeFilter];

  return (
    <section className="w-full py-6 sm:py-12 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="lg:px-20 sm:px-10 md:px-10">
        {/* Filter Options */}
        <div className="flex flex-nowrap gap-2 sm:gap-3 mb-6 sm:mb-10 md:mb-12 overflow-x-auto scrollbar-hide">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`w-[110px] h-[30px] sm:w-[160px] sm:h-[45px] md:w-[200px] md:h-[55px] lg:w-[216px] lg:h-[58px] text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] rounded-full font-medium transition-colors flex items-center justify-center flex-shrink-0 ${
                activeFilter === filter
                  ? 'bg-primary text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="flex flex-wrap justify-between gap-4 sm:gap-4 lg:gap-6">
          {destinations.slice(0, 8).map((destination, index) => (
            <DestinationCard
              key={`${activeFilter}-${index}`}
              destination={destination}
              index={index}
              activeFilter={activeFilter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

