'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Choose Your Destination & Preferences',
    description:
      'Choose where you\'d like to go and what kind of experience you\'re looking for',
  },
  {
    number: '02',
    title: 'Get Your Personalized Itinerary',
    description:
      'Our AI Trip Planner creates a tailor-made itinerary based on your travel style, budget, and interests.',
  },
  {
    number: '03',
    title: 'Receive Booking Recommendations',
    description:
      'Get the best flight, hotel, and activity recommendations — all aligned with your plan, ready to book in one click.',
  },
];

export function ThreeStepsSection() {
  return (
    <section className="py-16 px-4 bg-primary-50 relative overflow-hidden">
      {/* Sparkle Graphics */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 30 L55 50 L75 45 L60 60 L65 80 L50 65 L35 80 L40 60 L25 45 L45 50 Z"
            fill="currentColor"
            className="text-primary-400"
          />
          <path
            d="M120 20 L122 30 L132 28 L125 35 L127 45 L120 38 L113 45 L115 35 L108 28 L118 30 Z"
            fill="currentColor"
            className="text-primary-400"
          />
          <path
            d="M30 100 L32 110 L42 108 L35 115 L37 125 L30 118 L23 125 L25 115 L18 108 L28 110 Z"
            fill="currentColor"
            className="text-primary-400"
          />
          <path
            d="M150 80 L152 90 L162 88 L155 95 L157 105 L150 98 L143 105 L145 95 L138 88 L148 90 Z"
            fill="currentColor"
            className="text-primary-400"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center"
        >
          Your Perfect Trip, Planned in Just 3 Simple Steps
        </motion.h2>

        <div className="relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Image Placeholders */}
            <div className="relative h-full min-h-[600px] z-10">
              {/* Top smaller box - positioned upper right, behind bottom box */}
              <div
                className="absolute top-0 right-0 z-10"
                style={{ maxWidth: '240px', width: '100%' }}
              >
                <div className="aspect-[3/4] bg-white border-2 border-primary rounded-lg" />
              </div>

              {/* Bottom larger box - positioned lower left, in front, overlaps top box */}
              <div
                className="absolute z-20"
                style={{ 
                  maxWidth: '240px', 
                  width: '100%',
                  bottom: '0',
                  left: '0',
                  transform: 'translateY(-60px) translateX(180px)'
                }}
              >
                <div className="aspect-[3/4] bg-white border-2 border-primary rounded-lg" />
              </div>
            </div>

            {/* Right: Steps */}
            <div className="relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative pl-24 pb-12 last:pb-0"
                >
                  {/* Vertical Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[40px] top-20 bottom-0 w-0.5 bg-primary" />
                  )}

                  {/* Step Number Circle - Yellow outline with white fill */}
                  <motion.div
                    className="absolute left-0 top-0 w-20 h-20 rounded-full border-2 border-primary bg-white flex items-center justify-center z-10 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.span
                      className="text-xl font-bold text-gray-900"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                    >
                      {step.number}
                    </motion.span>
                  </motion.div>

                  {/* Step Content */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

