'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rohit',
    location: 'Mumbai',
    review: 'Every detail thought of. Highly recommend!',
  },
  {
    name: 'Rohit',
    location: 'Mumbai',
    review: 'Every detail thought of. Highly recommend!',
  },
  {
    name: 'Rohit',
    location: 'Mumbai',
    review: 'Every detail thought of. Highly recommend!',
  },
  {
    name: 'Rohit',
    location: 'Mumbai',
    review: 'Every detail thought of. Highly recommend!',
  },
  {
    name: 'Rohit',
    location: 'Mumbai',
    review: 'Every detail thought of. Highly recommend!',
  },
  {
    name: 'Rohit',
    location: 'Mumbai',
    review: 'Every detail thought of. Highly recommend!',
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <motion.div
    className="bg-yellow-50 border-2 border-primary/30 rounded-xl p-6 flex gap-4 items-start flex-shrink-0 w-80 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
    whileHover={{ scale: 1.02, y: -5 }}
  >
    {/* Background gradient on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <motion.div
      className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-full flex-shrink-0 relative z-10 shadow-md"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    />
    <div className="flex-1 relative z-10">
      <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.review}</p>
      <p className="font-semibold text-gray-900">
        {testimonial.name} - {testimonial.location}
      </p>
    </div>
  </motion.div>
);

export function TestimonialsSection() {
  // Split testimonials into top and bottom rows
  const topRow = testimonials.slice(0, 3);
  const bottomRow = testimonials.slice(3, 6);

  // Duplicate for seamless loop
  const topRowDuplicated = [...topRow, ...topRow];
  const bottomRowDuplicated = [...bottomRow, ...bottomRow];

  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          What our Customer&apos;s say?
        </motion.h2>

        {/* Top row - marquee to the right */}
        <div className="mb-4 overflow-hidden min-w-0 w-full">
          <div 
            className="flex gap-6 animate-marquee" 
            style={{ width: 'fit-content' }}
          >
            {topRowDuplicated.map((testimonial, index) => (
              <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Bottom row - marquee to the left */}
        <div className="overflow-hidden min-w-0 w-full">
          <div 
            className="flex gap-6 animate-marquee-reverse" 
            style={{ width: 'fit-content' }}
          >
            {bottomRowDuplicated.map((testimonial, index) => (
              <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

