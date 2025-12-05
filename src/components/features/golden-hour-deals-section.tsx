'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export function GoldenHourDealsSection() {
  const cards = Array.from({ length: 4 });
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      className="py-16 px-4 overflow-hidden relative" 
      style={{ backgroundColor: '#FFF9E6' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="space-y-6"
          >
            <motion.h3
              className="text-6xl md:text-7xl font-cursive text-primary mb-4"
              style={{ fontFamily: 'cursive', color: '#F5C842' }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(245, 200, 66, 0.3)',
                  '0 0 30px rgba(245, 200, 66, 0.5)',
                  '0 0 20px rgba(245, 200, 66, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Celebrating
            </motion.h3>
            <motion.h4
              className="text-2xl md:text-3xl font-normal italic text-gray-900 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Smiles Since 2022
            </motion.h4>
            
            {/* Stats */}
            <div className="flex gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold text-gray-900 mb-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  1000+
                </motion.div>
                <div className="text-base md:text-lg text-gray-900">
                  Happy Customers
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold text-gray-900 mb-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                >
                  4.7/5
                </motion.div>
                <div className="text-base md:text-lg text-gray-900">
                  Traveler Satisfaction
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Cards - Marquee */}
          <div ref={containerRef} className="overflow-hidden min-w-0 w-full">
            <div className="flex gap-3 md:gap-4 animate-marquee" style={{ width: 'fit-content' }}>
              {/* First set of cards */}
              {cards.map((_, index) => (
                <motion.div
                  key={`first-${index}`}
                  className="flex-shrink-0 aspect-[3/4] w-32 md:w-48 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {cards.map((_, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="flex-shrink-0 aspect-[3/4] w-32 md:w-48 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

