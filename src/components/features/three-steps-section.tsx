'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <section className="w-full px-4 sm:px-6 lg:px-8 bg-primary-50 relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="mb-4">
            Your Perfect Trip, Planned in<br className="hidden sm:block" /> Just 3 Simple Steps
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
            {/* Left: Images - Desktop only */}
            <div className="relative h-full min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[600px] xl:min-h-[700px] z-10 hidden lg:block">
              {/* Top image - positioned upper right, behind bottom image */}
              <div
                className="absolute top-0 right-0 z-10"
                style={{ 
                  width: 'clamp(250px, 25vw, 350px)', 
                  height: 'clamp(280px, 28vw, 390px)',
                  maxWidth: '350px',
                  maxHeight: '390px'
                }}
              >
                <div className="w-full h-full bg-white border-2 border-primary rounded-[30px] shadow-lg overflow-hidden">
                  <Image
                    src="/assets/3-step-plan/image1.png"
                    alt="Step 1"
                    width={350}
                    height={390}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom image - positioned lower left, in front, overlaps top image */}
              <div
                className="absolute z-20"
                style={{
                  width: 'clamp(250px, 25vw, 350px)',
                  height: 'clamp(280px, 28vw, 390px)',
                  maxWidth: '350px',
                  maxHeight: '390px',
                  bottom: '0',
                  left: '0',
                  transform: 'translateY(-60px) translateX(90px)'
                }}
              >
                <div className="w-full h-full bg-white border-2 border-primary rounded-[30px] shadow-lg overflow-hidden">
                  <Image
                    src="/assets/3-step-plan/image2.png"
                    alt="Step 2"
                    width={350}
                    height={390}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Steps */}
            <div className="relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative pl-14 sm:pl-16 md:pl-20 lg:pl-24 pb-10 sm:pb-12 md:pb-16 lg:pb-20 last:pb-0"
                >
                  {/* Vertical Connecting Line - Yellow, extending from bottom center of outer ring */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[25px] sm:left-[29px] md:left-[35px] lg:left-[39px] top-12 sm:top-14 md:top-16 lg:top-20 bottom-0 w-[2px] bg-primary" />
                  )}

                  {/* Step Number Circle - White circle with two concentric yellow rings */}
                  <motion.div
                    className="absolute left-0 top-0 flex items-center justify-center z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Outer yellow ring (thinner) */}
                    <div className="absolute inset-0 rounded-full border border-primary" />

                    {/* Inner yellow ring (thicker/bolder) with gap from outer ring */}
                    <div className="absolute inset-[3px] sm:inset-[4px] md:inset-[5px] lg:inset-[6px] rounded-full border-[3px] sm:border-[4px] md:border-[5px] lg:border-[6px] border-primary" />

                    {/* White circle with number - with gap from inner ring */}
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center">
                      <motion.span
                        className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900"
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
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
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

