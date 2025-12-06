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
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 text-center px-2"
        >
          Your Perfect Trip, Planned in Just 3 Simple Steps
        </motion.h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left: Image Placeholders */}
            <div className="relative h-full min-h-[300px] sm:min-h-[400px] md:min-h-[600px] z-10 hidden md:block">
              {/* Top smaller box - positioned upper right, behind bottom box */}
              <div
                className="absolute top-0 right-0 z-10"
                style={{ width: '300px', height: '333px' }}
              >
                <div className="w-full h-full bg-white border-2 border-primary" style={{ borderRadius: '30px' }} />
              </div>

              {/* Bottom larger box - positioned lower left, in front, overlaps top box */}
              <div
                className="absolute z-20"
                style={{ 
                  width: '300px',
                  height: '333px',
                  bottom: '0',
                  left: '0',
                  transform: 'translateY(-60px) translateX(90px)'
                }}
              >
                <div className="w-full h-full bg-white border-2 border-primary" style={{ borderRadius: '30px' }} />
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
                  className="relative pl-16 sm:pl-20 md:pl-24 pb-8 sm:pb-10 md:pb-12 last:pb-0"
                >
                  {/* Vertical Connecting Line - Yellow, extending from bottom center of outer ring */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[27px] sm:left-[31px] md:left-[39px] top-14 sm:top-16 md:top-20 bottom-0 w-[2px] bg-primary" />
                  )}

                  {/* Step Number Circle - White circle with two concentric yellow rings */}
                  <motion.div
                    className="absolute left-0 top-0 flex items-center justify-center z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Outer yellow ring (thinner) */}
                    <div className="absolute inset-0 rounded-full border border-primary" />
                    
                    {/* Inner yellow ring (thicker/bolder) with gap from outer ring */}
                    <div className="absolute inset-[4px] sm:inset-[5px] md:inset-[6px] rounded-full border-[4px] sm:border-[5px] md:border-[6px] border-primary" />
                    
                    {/* White circle with number - with gap from inner ring */}
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center">
                      <motion.span
                        className="text-sm sm:text-base md:text-lg font-bold text-gray-900"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                      >
                        {step.number}
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Step Content */}
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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

