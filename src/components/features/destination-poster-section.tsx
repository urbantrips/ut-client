'use client';

import { motion } from 'framer-motion';

export function DestinationPosterSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className=" sm:w-[210px] h-[100px] bg-gray-100 rounded-lg flex items-center justify-center mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="">
            Destination Poster
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

