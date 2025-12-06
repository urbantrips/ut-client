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
    color: 'fill-yellow-400 text-yellow-400',
    title: 'Expert End-to-End Support, Always',
    gradient: 'from-yellow-50 to-yellow-100',
  },
  {
    color: 'fill-yellow-400 text-yellow-400',
    title: 'Best Value Recommendations',
    gradient: 'from-yellow-50 to-yellow-100',
  },
  {
    color: 'fill-yellow-400 text-yellow-400',
    title: 'Trusted by Travelers Across India',
    gradient: 'from-yellow-50 to-yellow-100',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="w-full pb-12 px-4 sm:px-6 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-6 sm:py-12 md:py-10">
          <h2 className="mb-4">
            Why Choose Us?
          </h2>
          <p className="">
            we believe every journey should be as unique as the traveler.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 md:flex md:justify-center md:overflow-x-auto lg:justify-between lg:gap-0 scrollbar-hide">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex flex-col items-center cursor-pointer group flex-shrink-0 ${index < features.length - 1 ? 'md:mr-6' : ''}`}
            >
              <div
                className="mb-4 flex flex-col items-center justify-center relative w-[106px] h-[140px] sm:w-[200px] sm:h-[240px] md:w-[289px] md:h-[331px] lg:w-[289px] lg:h-[331px] p-2 sm:p-4 md:p-8 lg:p-8 rounded-[15px] sm:rounded-[20px] md:rounded-[30px] lg:rounded-[30px] border border-solid"
                style={{
                  backgroundColor: '#FFF9E6',
                  borderColor: feature.color.includes('yellow') ? '#FCD34D' : 
                               feature.color.includes('purple') ? '#9333EA' :
                               feature.color.includes('red') ? '#DC2626' :
                               '#22C55E',
                }}
              >
                {/* Circle with Star Icon */}
                <div className="flex items-center justify-center mb-2 sm:mb-4 md:mb-6 lg:mb-6">
                  <div 
                    className="rounded-full bg-white shadow-sm flex items-center justify-center w-[62px] h-[62px] sm:w-[100px] sm:h-[100px] md:w-[158px] md:h-[158px] lg:w-[158px] lg:h-[158px]"
                  >
                    <Star 
                      className={`${feature.color.split(' ')[0]} w-4 h-4 sm:w-8 sm:h-8 md:w-16 md:h-16 lg:w-16 lg:h-16`}
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[8px] sm:text-sm md:text-lg lg:text-lg font-bold text-black text-center leading-tight">
                  {feature.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

