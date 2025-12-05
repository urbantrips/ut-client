'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden mx-4 md:mx-0"
    >
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070)',
          scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.1]),
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
      </motion.div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />

      {/* Content Container */}
      <motion.div 
        style={{ y }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
      >
        {/* Main Text */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Plan, book, and explore
          </motion.h1>
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            All with the power of{' '}
            <motion.span 
              className="text-primary relative inline-block"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255, 220, 46, 0.5)',
                  '0 0 30px rgba(255, 220, 46, 0.8)',
                  '0 0 20px rgba(255, 220, 46, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              A I.
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Search Input Field */}
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Where would you like to visit?"
              className="w-full px-6 py-4 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-primary text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent text-lg shadow-2xl transition-all duration-300"
            />
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary/20 blur-xl -z-10"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Trusted Brand Badge - Bottom Right */}
      <motion.div 
        className="absolute bottom-4 right-4 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* White Container with varying rounded corners */}
        <div 
          className="bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3 shadow-2xl border border-primary/20"
          style={{
            borderTopLeftRadius: '1.5rem',
            borderTopRightRadius: '0.375rem',
            borderBottomLeftRadius: '0.875rem',
            borderBottomRightRadius: '0.875rem',
          }}
        >
          {/* Overlapping Circles */}
          <div className="flex items-center -space-x-3">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              />
            ))}
          </div>
          {/* Text */}
          <span className="text-sm font-medium text-black whitespace-nowrap">
            Trusted Brand by 1000+ Travelers
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

