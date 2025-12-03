'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const travelStyles = ['Relax', 'Solo', 'Family', 'Honeymoon', 'Friends'];
const categories = ['See All', 'Adventure', 'Culture', 'Nature', 'Relaxation', 'Luxury'];

export function TravelStyleSection() {
  const [selectedCategory, setSelectedCategory] = useState('See All');

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Select Your Travel Style
        </h2>

        {/* Travel Style Cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {travelStyles.map((style, index) => (
            <motion.div
              key={style}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{style}</span>
            </motion.div>
          ))}
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                category === 'See All' || selectedCategory === category
                  ? 'bg-primary text-gray-900'
                  : 'border-2 border-primary text-primary hover:bg-primary/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <span className="text-sm text-gray-500">Card{index + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

