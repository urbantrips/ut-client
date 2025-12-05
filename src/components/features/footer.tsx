'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Plan My Trip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-primary text-gray-900 px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Shine effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Button content */}
            <span className="relative flex items-center gap-3">
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
        <div className="border-t border-primary/30 pt-12 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Urban Trips. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

