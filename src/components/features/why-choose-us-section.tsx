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
    <section className="w-full pb-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h2 className="mb-4">
            Why Choose Us?
          </h2>
          <p className="">
            we believe every journey should be as unique as the traveler.
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className="mb-4 flex flex-col items-center justify-center p-8 relative"
                style={{
                  width: '289px',
                  height: '331px',
                  backgroundColor: '#FFF9E6',
                  borderRadius: '30px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: feature.color.includes('yellow') ? '#FCD34D' : 
                               feature.color.includes('purple') ? '#9333EA' :
                               feature.color.includes('red') ? '#DC2626' :
                               '#22C55E',
                }}
              >
                {/* Circle with Star Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div 
                    className="rounded-full bg-white shadow-sm flex items-center justify-center"
                    style={{
                      width: '158px',
                      height: '158px',
                    }}
                  >
                    <Star 
                      className={`${feature.color.split(' ')[0]} w-16 h-16`}
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-black text-center leading-tight">
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

