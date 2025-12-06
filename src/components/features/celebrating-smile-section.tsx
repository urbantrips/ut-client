'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export function CelebratingSmileSection() {
  const reels = [
    '/assets/videos/reel1.mp4',
    '/assets/videos/reel2.mp4',
    '/assets/videos/reel3.mp4',
  ];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      className="px-4 sm:px-6 md:px-4 overflow-hidden relative py-6 sm:py-12 md:py-10 bg-[#FFF9E6]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-4 right-4 w-20 h-20 md:top-10 md:right-10 md:w-32 md:h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-24 h-24 md:bottom-10 md:left-10 md:w-40 md:h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 py-6 sm:py-8 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 sm:gap-6 md:gap-6 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="space-y-4 sm:space-y-6 text-center md:text-left"
          >
            <motion.h3
              className="mb-2 sm:mb-4 text-4xl md:text-[55px]"
              style={{
                fontFamily: 'var(--font-dancing-script), cursive',
                fontWeight: 700,
                lineHeight: '100%',
                color: '#F5C842'
              }}
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
              className="mb-4 sm:mb-8 text-3xl md:text-[45px]"
              style={{
                fontFamily: 'var(--font-dancing-script), cursive',
                fontWeight: 700,
                lineHeight: '100%',
                color: '#1F2937'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Smiles Since 2022
            </motion.h4>
            
            {/* Stats */}
            <div className="flex gap-4 sm:gap-6 md:gap-12 justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="mb-1 text-gray-900 text-3xl md:text-[40px]"
                  style={{
                    fontWeight: 700
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  1000+
                </motion.div>
                <div className="text-xs sm:text-sm md:text-lg text-gray-900">
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
                  className="mb-1 text-gray-900 text-3xl md:text-[40px]"
                  style={{
                    fontWeight: 700
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                >
                  4.7/5
                </motion.div>
                <div className="text-xs sm:text-sm md:text-lg text-gray-900">
                  Traveler Satisfaction
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Cards - Marquee */}
          <div ref={containerRef} className="overflow-hidden min-w-0 w-full mt-4 md:mt-0 flex items-center h-[400px] sm:h-[500px] md:h-[650px]">
            <div className="flex gap-2 sm:gap-3 md:gap-4 animate-marquee w-fit">
              {/* First set of cards */}
              {reels.map((reel, index) => (
                <motion.div
                  key={`first-${index}`}
                  className="flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden group w-[180px] h-[320px] sm:w-[210px] sm:h-[380px] md:w-[246px] md:h-[458px] relative"
                >
                  <video
                    src={reel}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {reels.map((reel, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden group w-[180px] h-[320px] sm:w-[210px] sm:h-[380px] md:w-[246px] md:h-[458px] relative"
                >
                  <video
                    src={reel}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

