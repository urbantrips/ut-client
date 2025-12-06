'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const filterOptions = ['Must Visit', 'Trending', 'Weekend', 'New Discoveries', 'Just for You'];
const destinations = Array.from({ length: 8 }, () => 'Bali');

export function BrowseDestinationsSection() {
  const [activeFilter, setActiveFilter] = useState('Must Visit');

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:px-20 sm:px-10 md:px-10">
        {/* Filter Options */}
        <div className="flex flex-nowrap gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`w-[115px] h-[31px] sm:w-[216px] sm:h-[58px] text-[10px] sm:text-[14px] rounded-full font-medium transition-colors flex items-center justify-center flex-shrink-0 ${
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
        <div className="flex flex-wrap justify-between gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col cursor-pointer group"
            >
              {/* Image Placeholder - Responsive sizes */}
              <div
                className="w-[102px] h-[114px] sm:w-[232px] sm:h-[232px] rounded-[15px] sm:rounded-[30px] bg-gray-200 mb-3 overflow-hidden"
              >
                <div className="w-full h-full bg-gray-200 group-hover:bg-gray-300 transition-colors" />
              </div>
              
              {/* Destination Name */}
              <h3 className="text-[14px] sm:text-lg text-center font-bold text-gray-900">
                {destination}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

