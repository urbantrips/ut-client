'use client';

import { motion } from 'framer-motion';

interface ExploreSectionProps {
  title: string;
  subtitle: string;
  cardCount?: number;
}

export function ExploreSection({ title, subtitle, cardCount = 4 }: ExploreSectionProps) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: cardCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="cursor-pointer group"
            >
              <motion.div
                className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}
              >
                {/* Image placeholder with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
              <motion.p
                className="text-base font-bold text-black text-center group-hover:text-primary transition-colors duration-300"
              >
                Bali
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

