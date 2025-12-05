'use client';

import { motion } from 'framer-motion';

const travelStyles = ['Romantic', 'Beach', 'Adventure', 'Heritage', 'Romantic'];

export function TravelStyleSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-black mb-12 text-center"
        >
          Select Your Travel Style
        </motion.h2>

        {/* Travel Style Cards */}
        <div className="flex flex-wrap gap-8 justify-center">
          {travelStyles.map((style, index) => (
            <motion.div
              key={`${style}-${index}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <motion.div
                className="w-32 h-40 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary-50/60 to-white flex flex-col items-center justify-center relative overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ borderColor: 'rgba(255, 220, 46, 0.8)' }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Circular gradient placeholder with animation */}
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-200/60 to-primary-50/40 relative z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
              <motion.span
                className="text-sm font-bold text-black mt-3 relative"
                whileHover={{ color: 'rgba(255, 220, 46, 1)' }}
              >
                {style}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

