'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'John Doe',
    review: 'Amazing experience! The AI recommendations were spot on.',
  },
  {
    name: 'Jane Smith',
    review: 'Best travel planning service I have ever used.',
  },
  {
    name: 'Mike Johnson',
    review: 'Saved so much time and money with their deals.',
  },
  {
    name: 'Sarah Williams',
    review: 'The personalized itinerary was perfect for our family trip.',
  },
  {
    name: 'David Brown',
    review: 'Excellent customer support throughout the journey.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
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

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-2xl text-primary mb-4">⭐</div>
              <p className="text-gray-700 mb-4">{testimonial.review}</p>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

