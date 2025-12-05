'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const features = [
  {
    color: 'fill-yellow-400 text-yellow-400',
    title: 'Personalized Travel Experiences',
  },
  {
    color: 'fill-purple-600 text-purple-600',
    title: 'Expert End-to-End Support, Always',
  },
  {
    color: 'fill-red-600 text-red-600',
    title: 'Best Value Recommendations',
  },
  {
    color: 'fill-green-500 text-green-500',
    title: 'Trusted by Travelers Across India',
  },
];

export function WhyChooseUsSection() {
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
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600">
            we believe every journey should be as unique as the traveler.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg border border-yellow-200 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center mb-6">
                <Star className={`w-12 h-12 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

