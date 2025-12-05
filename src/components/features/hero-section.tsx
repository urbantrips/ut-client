'use client';

import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';

export function HeroSection() {
  const popularDestinations = ['Paris', 'Tokyo', 'Bali', 'New York', 'Dubai'];

  return (
    <div
      className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-lg sm:rounded-2xl overflow-hidden max-w-full"
    >
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070)',
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 overflow-x-hidden"
      >
        {/* Main Text */}
        <motion.div 
          className="text-center mb-4 sm:mb-6 md:mb-8 max-w-5xl w-full px-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-[10px] sm:text-xs md:text-sm font-semibold inline-block"
              animate={{ 
                boxShadow: [
                  '0 0 0px rgba(255, 220, 46, 0)',
                  '0 0 15px rgba(255, 220, 46, 0.3)',
                  '0 0 0px rgba(255, 220, 46, 0)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="whitespace-nowrap">✨ AI-Powered Travel Planning</span>
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight px-2 break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Plan, book, and explore
          </motion.h1>
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2 break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            All with the power of{' '}
            <motion.span 
              className="text-primary relative inline-block whitespace-nowrap"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255, 220, 46, 0.4)',
                  '0 0 30px rgba(255, 220, 46, 0.6)',
                  '0 0 20px rgba(255, 220, 46, 0.4)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              AI.
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover amazing destinations, get personalized recommendations, and create unforgettable travel experiences
          </motion.p>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div 
          className="w-full max-w-4xl px-2 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="relative w-full"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border-2 border-primary/30 p-1.5 sm:p-2 flex flex-row gap-2 max-w-2xl mx-auto w-full min-w-0 overflow-hidden">
              {/* Location Input */}
              <motion.div 
                className="flex-1 relative min-w-0"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-colors duration-200" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base transition-all duration-200"
                />
              </motion.div>
              
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 bg-primary text-black rounded-xl font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap flex-shrink-0"
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <span className="hidden sm:inline">Search</span>
              </motion.button>
            </div>
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl -z-10"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          
          {/* Popular Destinations */}
          <motion.div
            className="mt-3 sm:mt-4 md:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-1 sm:px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.span 
              className="text-white/80 text-[10px] sm:text-xs md:text-sm font-medium"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Popular:
            </motion.span>
            {popularDestinations.map((dest, i) => (
              <motion.button
                key={dest}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.1 + i * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-[10px] sm:text-xs md:text-sm font-medium hover:bg-white/20 transition-colors duration-300"
              >
                {dest}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Trusted Brand Badge - Bottom Right */}
      <motion.div 
        className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
      >
        <div 
          className="bg-white/95 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 flex items-center gap-1.5 sm:gap-2 md:gap-3 shadow-2xl border border-primary/20 rounded-lg sm:rounded-xl md:rounded-2xl max-w-[calc(100vw-2rem)] sm:max-w-none"
        >
          <div className="flex items-center -space-x-1.5 sm:-space-x-2 md:-space-x-3 flex-shrink-0">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 shadow-md"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 1.3 + i * 0.1, 
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{ scale: 1.15, zIndex: 10, rotate: 5 }}
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-black whitespace-nowrap truncate">
            Trusted by 1000+
          </span>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block opacity-70"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-white/70 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

