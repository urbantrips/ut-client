'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '⭐',
    color: 'text-yellow-500',
    title: 'Personalized Itineraries & Recommendations',
  },
  {
    icon: '⭐',
    color: 'text-purple-500',
    title: '24/7 Customer Support & Assistance',
  },
  {
    icon: '⭐',
    color: 'text-red-500',
    title: 'Best Price Guarantee & Deals',
  },
  {
    icon: '⭐',
    color: 'text-green-500',
    title: 'Flexible Booking & Cancellation',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
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
            Experience seamless travel planning with our unique features
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className={`text-4xl mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

