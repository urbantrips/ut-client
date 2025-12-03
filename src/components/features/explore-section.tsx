'use client';

import { motion } from 'framer-motion';

interface ExploreSectionProps {
  title: string;
  subtitle: string;
  cardCount?: number;
}

export function ExploreSection({ title, subtitle, cardCount = 5 }: ExploreSectionProps) {
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: cardCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <span className="text-sm text-gray-500">Card{index + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

