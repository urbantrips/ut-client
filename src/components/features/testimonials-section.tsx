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
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-4 items-start flex-shrink-0 w-80">
    <div className="w-12 h-12 bg-yellow-400 rounded flex-shrink-0"></div>
    <div className="flex-1">
      <p className="text-gray-700 mb-2">{testimonial.review}</p>
      <p className="font-semibold text-gray-900">
        {testimonial.name} - {testimonial.location}
      </p>
    </div>
  </div>
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
        <div className="mb-6 overflow-hidden min-w-0 w-full">
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

