'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const features = [
  {
    color: 'fill-yellow-400 text-yellow-400',
    title: 'Personalized Travel Experiences',
    gradient: 'from-yellow-50 to-yellow-100',
  },
  {
    color: 'fill-purple-600 text-purple-600',
    title: 'Expert End-to-End Support, Always',
    gradient: 'from-purple-50 to-purple-100',
  },
  {
    color: 'fill-red-600 text-red-600',
    title: 'Best Value Recommendations',
    gradient: 'from-red-50 to-red-100',
  },
  {
    color: 'fill-green-500 text-green-500',
    title: 'Trusted by Travelers Across India',
    gradient: 'from-green-50 to-green-100',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-primary-50/20">
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
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="bg-white p-6 rounded-xl border-2 border-primary/20 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              
              <motion.div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 relative z-10 shadow-md group-hover:shadow-xl transition-shadow duration-300`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Star className={`w-12 h-12 ${feature.color}`} />
                </motion.div>
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

