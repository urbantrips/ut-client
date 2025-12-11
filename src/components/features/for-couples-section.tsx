'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { CustomerAvatar } from '@/components/ui/customer-avatar';

export function ForCouplesSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 bg-white">
      <div
        className="flex gap-4"
        style={{ width: '652px', height: '442px' }}
      >
        {/* Left Side - Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 >
            For Couples Who Want More Than A Vacation
          </h2>
          <motion.div
            className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100"
            style={{ width: '686px', height: '227px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col h-full">
              <div className="relative w-full h-[140px] flex-shrink-0">
                <Image
                  src="/assets/destinations/weekend/Muannar.webp"
                  alt="Romantic Tour"
                  fill
                  className="object-cover"
                  sizes="686px"
                />
              </div>
              <div className="p-4 flex-1 relative">
                <div className="text-xs text-gray-500 absolute top-4 right-4">SD/M</div>
                <h3 className="text-sm font-bold text-black mb-2 pr-8">
                  Kerala Couple Tour With<br />Candlelight Dinner
                </h3>
                <div className="h-6 bg-yellow-100 rounded" />
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Right Side - Cards (Horizontal Side by Side) */}
        <div>
          {/* Testimonial Card */}
          <motion.div
            className="bg-blue-50 rounded-2xl sm:rounded-3xl p-4 shadow-lg flex flex-col"
            style={{ width: '609px', height: '196px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <CustomerAvatar
                name="Rahul Menon"
                image="/assets/reviews/Mubashir.webp"
                size="medium"
              />
              <div>
                <p className="text-xs font-semibold text-black mb-1">Rahul Menon</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Had a great International trip with UrbanTrips. Everything was well organized, and the team was really helpful. Loved the experience! 💯
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

