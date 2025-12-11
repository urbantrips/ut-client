'use client';

import { motion } from 'framer-motion';

export function DestinationPosterSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="w-[1292px] h-[209px] bg-gray-100 rounded-lg flex items-center justify-center mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            Destination Poster
          </h3>
        </motion.div>
      </div>
    </section>
  );
}

