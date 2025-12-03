'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')] bg-cover bg-center blur-sm scale-105" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Plan, book, and explore
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            All with the power of <span className="text-primary">AI.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Search here..."
            className="w-full max-w-2xl mx-auto px-6 py-4 rounded-full border-2 border-primary bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
          />
        </motion.div>
      </div>

      {/* Sign In Link */}
      <Link
        href="/sign-in"
        className="absolute top-6 right-6 z-20 text-white hover:text-primary transition-colors font-medium"
      >
        Sign In
      </Link>
    </section>
  );
}

