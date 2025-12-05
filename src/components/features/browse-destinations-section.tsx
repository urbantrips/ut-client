'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const filterOptions = ['Must Visit', 'Trending', 'Weekend', 'New Discoveries', 'Just for You'];
const destinations = Array.from({ length: 8 }, () => 'Bali');

export function BrowseDestinationsSection() {
  const [activeFilter, setActiveFilter] = useState('Must Visit');

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {filterOptions.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
                activeFilter === filter
                  ? 'bg-primary text-black shadow-lg'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Destination Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer group"
              >
                <motion.div
                  className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                <motion.p
                  className="text-base font-bold text-black text-center group-hover:text-primary transition-colors duration-300"
                >
                  {destination}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

