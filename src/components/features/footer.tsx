'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Plan My Trip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-primary text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 overflow-hidden"
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-primary rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 220, 46, 0.5)',
                  '0 0 40px rgba(255, 220, 46, 0.8)',
                  '0 0 20px rgba(255, 220, 46, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Shine effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Button content */}
            <span className="relative flex items-center gap-3 z-10">
              <span>Plan My Trip</span>
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-white/10 pt-12 text-center text-gray-400 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Urban Trips. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

