'use client';

import { motion } from 'framer-motion';

const travelStyles = ['Romantic', 'Beach', 'Adventure', 'Heritage', 'Romantic'];

export function TravelStyleSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
          Select Your Travel Style
        </h2>

        {/* Travel Style Cards */}
        <div className="flex flex-wrap gap-8 justify-center">
          {travelStyles.map((style, index) => (
            <motion.div
              key={`${style}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-32 h-40 rounded-xl border-[1px] border-yellow-200/60 bg-yellow-50/40 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Circular gradient placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100/40 to-yellow-50/20"></div>
              </div>
              <span className="text-sm font-bold text-black mt-3">{style}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

