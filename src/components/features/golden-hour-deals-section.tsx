'use client';

import { motion } from 'framer-motion';

export function GoldenHourDealsSection() {
  return (
    <section className="py-16 px-4 bg-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-6xl md:text-7xl font-cursive text-primary mb-4" style={{ fontFamily: 'cursive' }}>
              Celebrating
            </h3>
            <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Golden Hour Deals
            </h4>
            <div className="mb-6">
              <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                50% OFF
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                FLIGHTS
              </div>
            </div>
            <p className="text-lg text-gray-700">
              Book your next adventure and save big!
            </p>
          </motion.div>

          {/* Right Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="aspect-[3/4] bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

