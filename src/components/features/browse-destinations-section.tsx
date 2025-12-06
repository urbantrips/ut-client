'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const filterOptions = ['Must Visit', 'Trending', 'Weekend', 'New Discoveries', 'Just for You'];
const destinations = Array.from({ length: 8 }, () => 'Bali');

export function BrowseDestinationsSection() {
  const [activeFilter, setActiveFilter] = useState('Must Visit');

  return (
    <section className="w-full mt-6 px-4 sm:px-6 lg:px-8">
      <div className="px-20">
        {/* Filter Options */}
        <div className="flex flex-wrap justify-between gap-2 mb-8">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full font-medium transition-colors flex items-center justify-center ${
                activeFilter === filter
                  ? 'bg-primary text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{
                width: '216px',
                height: '58px',
              }}
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
              {/* Image Placeholder - Exact 232x232 */}
              <div
                className="bg-gray-200 mb-3 overflow-hidden"
                style={{
                  width: '232px',
                  height: '232px',
                  borderRadius: '30px',
                }}
              >
                <div className="w-full h-full bg-gray-200 group-hover:bg-gray-300 transition-colors" />
              </div>
              
              {/* Destination Name */}
              <h3 className="text-lg text-center font-bold text-gray-900">
                {destination}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

