'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Choose Your Destination & Preferences',
    description: 'Tell us where you want to go and what you love',
  },
  {
    number: '02',
    title: 'Get Your Personalized Itinerary!',
    description: 'Our AI creates the perfect plan just for you',
  },
  {
    number: '03',
    title: 'Book & Enjoy Your Adventure!',
    description: 'Secure your trip and start exploring',
  },
];

export function ThreeStepsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Your Perfect Trip, Planned in Just 3 Simple Steps
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image Placeholders */}
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="aspect-square bg-gray-100 rounded-lg"
              />
            ))}
          </div>

          {/* Right: Steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-full bg-primary" />
                )}

                {/* Step Number Circle */}
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

