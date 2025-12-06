'use client';

import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const popularDestinations = ['Paris', 'Tokyo', 'Bali', 'New York', 'Dubai'];

  return (
    <div className="relative">
      <div className="bg-cover bg-center bg-no-repeat h-[413px] rounded-3xl inverted-radius relative overflow-hidden" style={{ backgroundImage: 'url(https://picsum.photos/1920/1080?random=1)' }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-12">
          {/* Heading */}
          <div className="text-center mb-8">
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
            <h1 className="text-[40px] sm:text-3xl md:text-6xl font-bold text-white mb-2">
              Plan, book, and explore
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              All with the power of <span className="text-[rgb(var(--primary))]" style={{ fontFamily: 'var(--font-dancing-script), cursive', fontWeight: 700, WebkitTextStroke: '0.5px rgba(0,0,0,0.2)', textShadow: '1px 1px 0px rgba(0,0,0,0.1), 0px 0px 2px rgba(0,0,0,0.1)' }}>AI.</span>
            </h2>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              placeholder="Where would you like to visit?"
              className="w-full px-6 py-4 pr-[70px] rounded-[30px] border-4 border-[rgb(var(--primary))] text-gray-900 placeholder-black placeholder:italic focus:outline-none focus:ring-4 focus:ring-[rgb(var(--primary))]/30 text-lg"
            />
            <Button
              variant="primary"
              size="lg"
              className="absolute right-[12px] inset-y-[10px] h-[48px] w-[48px] p-0 rounded-full flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

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
        </div>

        {/* Trusted Brand Badge - Positioned in inverted border space */}
      </div>
      <div className="absolute bottom-1 right-1 flex  ]">
        <div className="flex -space-x-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
            />
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">Trusted Brand</span>
          <span className="text-xs text-gray-600">by 1000+ Travelers</span>
        </div>
      </div>
    </div>
  );
};