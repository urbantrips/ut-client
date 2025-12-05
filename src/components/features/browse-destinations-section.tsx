'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const filterOptions = ['Must Visit', 'Trending', 'Weekend', 'New Discoveries', 'Just for You'];
const destinations = Array.from({ length: 8 }, () => 'Bali');

export function BrowseDestinationsSection() {
  const [activeFilter, setActiveFilter] = useState('Must Visit');

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {filterOptions.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="cursor-pointer"
            >
              <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
              <p className="text-base font-bold text-black text-center">{destination}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

