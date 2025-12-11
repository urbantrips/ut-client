'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { CustomerAvatar } from '@/components/ui/customer-avatar';
import { testimonials } from '@/data/testimonials';
import { useState, useEffect } from 'react';

export function ForCouplesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch justify-center">
        {/* Left Side - Heading & Tour Card */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          > 
            <h2 className="text-left">
              For Couples Who Want
              <br />
              More Than a Vacation
              <span className="absolute bottom-1 left-0 w-full h-1 rounded-full opacity-80"></span>
            </h2>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-row h-48 sm:h-56 lg:h-full flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Image Side - approx 40% width */}
            <div className="relative w-[40%] h-full">
              <Image
                src="/assets/destinations/weekend/Muannar.webp"
                alt="Romantic Kerala Tour"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 40vw, 33vw"
              />
            </div>

            {/* Content Side */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between relative">
              <div className="absolute top-4 right-4 font-bold text-sm">5D/4N</div>

              <div className="mt-2">
                <h3 className="text-lg sm:text-xl font-bold text-black leading-snug max-w-[85%]">
                  Kerala Couple Tour With Candlelight Dinner
                </h3>
              </div>

              {/* Yellow decorative bar */}
              <div className="w-full h-12 bg-[#FFFDE7] rounded-xl mt-auto" />
            </div>
          </motion.div>
        </div>

        {/* Right Side - Testimonial Card */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative rounded-3xl overflow-hidden h-64 lg:h-[350px] w-full group flex flex-col">
            {/* Background Image - Using a cave-like or dark nature image if possible, acting as the 'cave' from screenshot */}
            <Image
              src="/assets/destinations/must-visit/Meghalaya.webp"
              alt="Testimonial Background"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Dark overlay for text readability */}
            {/* <div className="absolute inset-0 bg-black/20" /> */}

            {/* Review Card Overlay at Bottom - Slideshow */}
            <div className="mt-auto mb-4 mx-4 bg-white rounded-2xl p-4 shadow-xl relative overflow-hidden z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CustomerAvatar
                      name={testimonials[currentIndex].name}
                      image={testimonials[currentIndex].image}
                      size="medium"
                      className="w-10 h-10"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-black">
                        {testimonials[currentIndex].name}
                      </h4>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {testimonials[currentIndex].review}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

