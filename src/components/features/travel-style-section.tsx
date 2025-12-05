'use client';

import { motion } from 'framer-motion';
import { Heart, Waves, Mountain, Building2, Sparkles } from 'lucide-react';

const travelStyles = [
  { 
    name: 'Romantic', 
    icon: Heart, 
    gradient: 'from-pink-100/60 via-rose-50/40 to-pink-50/30', 
    iconColor: '#ec4899', 
    hoverBg: 'bg-pink-50/80', 
    borderColor: '#f9a8d4',
    glowColor: 'rgba(236, 72, 153, 0.15)'
  },
  { 
    name: 'Beach', 
    icon: Waves, 
    gradient: 'from-blue-100/60 via-cyan-50/40 to-blue-50/30', 
    iconColor: '#3b82f6', 
    hoverBg: 'bg-blue-50/80', 
    borderColor: '#93c5fd',
    glowColor: 'rgba(59, 130, 246, 0.15)'
  },
  { 
    name: 'Adventure', 
    icon: Mountain, 
    gradient: 'from-green-100/60 via-emerald-50/40 to-green-50/30', 
    iconColor: '#10b981', 
    hoverBg: 'bg-green-50/80', 
    borderColor: '#6ee7b7',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
  { 
    name: 'Heritage', 
    icon: Building2, 
    gradient: 'from-amber-100/60 via-orange-50/40 to-amber-50/30', 
    iconColor: '#f59e0b', 
    hoverBg: 'bg-amber-50/80', 
    borderColor: '#fcd34d',
    glowColor: 'rgba(245, 158, 11, 0.15)'
  },
  { 
    name: 'Luxury', 
    icon: Sparkles, 
    gradient: 'from-purple-100/60 via-violet-50/40 to-purple-50/30', 
    iconColor: '#8b5cf6', 
    hoverBg: 'bg-purple-50/80', 
    borderColor: '#c4b5fd',
    glowColor: 'rgba(139, 92, 246, 0.15)'
  },
];

export function TravelStyleSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-white via-primary-50/10 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Select Your Travel Style
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the perfect travel experience that matches your personality
          </motion.p>
        </motion.div>

        {/* Travel Style Cards */}
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center">
          {travelStyles.map((style, index) => {
            const IconComponent = style.icon;
            return (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="flex flex-col items-center cursor-pointer group relative"
              >
                <motion.div
                  className={`w-28 h-36 sm:w-32 sm:h-44 md:w-36 md:h-48 rounded-2xl border-2 border-gray-200/60 bg-gradient-to-br ${style.gradient} to-white flex flex-col items-center justify-center relative overflow-hidden shadow-md transition-all duration-300`}
                  whileHover={{
                    borderColor: 'rgba(255, 220, 46, 1)',
                    boxShadow: '0 20px 40px -12px rgba(255, 220, 46, 0.25)'
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Icon container with enhanced styling */}
                  <motion.div
                    className="relative z-10 p-4 sm:p-5 md:p-6 rounded-xl bg-white/90 backdrop-blur-sm group-hover:bg-white shadow-sm transition-all duration-300"
                    whileHover={{ 
                      scale: 1.08,
                      rotate: [0, -3, 3, 0],
                    }}
                    transition={{ 
                      scale: { duration: 0.2 },
                      rotate: { duration: 0.4 }
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.03, 1],
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: index * 0.2,
                      }}
                    >
                      <IconComponent 
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-colors duration-300"
                        style={{ color: style.iconColor }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(255, 220, 46, 0.15)' }}
                  />
                </motion.div>
                
                <motion.span
                  className="text-sm sm:text-base font-semibold text-gray-700 mt-3 sm:mt-4 relative group-hover:text-gray-900 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {style.name}
                </motion.span>
                
                {/* Decorative dot indicator */}
                <motion.div
                  className="w-1.5 h-1.5 rounded-full mt-1 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: style.iconColor }}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

