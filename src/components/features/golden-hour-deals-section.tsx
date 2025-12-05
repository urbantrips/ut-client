'use client';

import { motion } from 'framer-motion';

export function GoldenHourDealsSection() {
  const cards = Array.from({ length: 4 });

  return (
    <section className="py-16 px-4 overflow-hidden" style={{ backgroundColor: '#FFF9E6' }}>
      <div className="mx-auto">
        <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 pl-8"
          >
            <h3 className="text-6xl md:text-7xl font-cursive text-primary mb-4" style={{ fontFamily: 'cursive', color: '#F5C842' }}>
              Celebrating
            </h3>
            <h4 className="text-2xl md:text-3xl font-normal italic text-gray-900 mb-8" style={{ fontFamily: 'sans-serif' }}>
              Smiles Since 2022
            </h4>
            
            {/* Stats */}
            <div className="flex gap-8 md:gap-12">
              <div>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-1">
                  1000+
                </div>
                <div className="text-base md:text-lg text-gray-900">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-1">
                  4.7/5
                </div>
                <div className="text-base md:text-lg text-gray-900">
                  Traveler Satisfaction
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Cards - Marquee */}
          <div className="overflow-hidden min-w-0 w-full">
            <div className="flex gap-3 md:gap-4 animate-marquee" style={{ width: 'fit-content' }}>
              {/* First set of cards */}
              {cards.map((_, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 aspect-[3/4] w-32 md:w-48 bg-white rounded-xl shadow-sm"
                />
              ))}
              {/* Duplicate set for seamless loop */}
              {cards.map((_, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 aspect-[3/4] w-32 md:w-48 bg-white rounded-xl shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

