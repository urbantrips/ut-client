'use client';

import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { testimonials } from '@/data/testimonials';
import { CustomerAvatar } from '@/components/ui/customer-avatar';
import { useUserStore } from '@/store/user-store';
import { useState, useEffect } from 'react';

interface TripResponse {
  id: string;
  bookingId: string;
  destination: string;
  departureCity?: string;
  startDate?: string;
  endDate?: string;
  travelerCounts: {
    adults: number;
    children: number;
    infants: number;
  };
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    imageUrl?: string;
  }>;
  status: string;
}

export const HeroSection = () => {
  const popularDestinations = ['Paris', 'Tokyo', 'Bali', 'New York', 'Dubai'];
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const accessToken = useUserStore((state) => state.accessToken);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Wait for Zustand persist to hydrate from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user-storage');
      if (stored) {
        try {
          JSON.parse(stored);
          const timer = setTimeout(() => {
            setIsHydrated(true);
          }, 100);
          return () => clearTimeout(timer);
        } catch {
          setIsHydrated(true);
        }
      } else {
        setIsHydrated(true);
      }
    } else {
      setIsHydrated(true);
    }
  }, []);

  // Fetch trips for testing - only on client side when authenticated
  useEffect(() => {
    // Only fetch on client side, after hydration, and when user is authenticated
    if (typeof window === 'undefined' || !isHydrated || !accessToken) {
      return;
    }

    // Import apiGet dynamically to ensure it's only used on client
    import('@/lib/api-client').then(({ apiGet }) => {
      apiGet<TripResponse[]>(`${apiUrl}/trips`)
        .then((trips) => {
          console.log('Trips fetched in hero:', trips);
        })
        .catch((error) => {
          // Silently handle 401 errors (user not authenticated)
          if (error instanceof Error) {
            const errorMsg = error.message.toLowerCase();
            if (!errorMsg.includes('authentication') && !errorMsg.includes('unauthorized') && !errorMsg.includes('401')) {
              console.error('Error fetching trips in hero:', error);
            }
          }
        });
    });
  }, [isHydrated, accessToken, apiUrl]);

  const handleSearch = () => {
    router.push('/search');
  };
  return (
    <div className="relative">
      <div className="h-[320px] sm:h-[360px] md:h-[413px] rounded-3xl inverted-radius relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ 
              transform: 'scale(1.2)',
              transformOrigin: 'center center'
            }}
          >
            <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-[1]"></div>

        {/* Main Content */}
        <div className="relative z-[2] flex flex-col items-center justify-center h-full px-4 sm:px-4 py-5 sm:py-8 md:py-12">
          {/* Heading */}
          <div className="text-center mb-3 sm:mb-6 md:mb-8 max-w-[90%] sm:max-w-none">
            <motion.div
              className="inline-block mb-1.5 sm:mb-3 md:mb-4"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="px-2 sm:px-2.5 md:px-4 py-0.5 sm:py-1 md:py-2 bg-primary-500/20 backdrop-blur-sm border border-primary-500 rounded-full text-primary-500 text-[8px] sm:text-[10px] md:text-sm font-semibold inline-block"
                animate={{ 
                  boxShadow: [
                    '0 0 0px rgba(255, 220, 46, 0)',
                    '0 0 15px rgba(255, 220, 46, 0.3)',
                    '0 0 0px rgba(255, 220, 46, 0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="whitespace-nowrap">✨ AI-Powered Travel Planning</span>
              </motion.span>
            </motion.div>
            <h1 className="text-[22px] sm:text-[32px] md:text-6xl font-bold text-white mb-0.5 sm:mb-2 leading-[1.2] sm:leading-normal">
              Plan, book, and explore
            </h1>
            <h2 className="text-[22px] sm:text-4xl md:text-6xl font-bold text-white leading-[1.2] sm:leading-normal">
              All with the power of <span className="text-[rgb(var(--primary))]" style={{ fontFamily: 'var(--font-dancing-script), cursive', fontWeight: 700, WebkitTextStroke: '0.5px rgba(0,0,0,0.2)', textShadow: '1px 1px 0px rgba(0,0,0,0.1), 0px 0px 2px rgba(0,0,0,0.1)' }}>AI.</span>
            </h2>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl relative px-2 sm:px-0 mt-1 sm:mt-0">
            <input
              type="text"
              placeholder="Where would you like to visit?"
              readOnly
              onClick={handleSearch}
              className="w-full px-3.5 sm:px-6 py-2 placeholder:text-[16px] placeholder:text-[12px] sm:py-4 pr-[56px] sm:pr-[70px] rounded-[30px] border-2 sm:border-4 border-[rgb(var(--primary))] text-gray-900 placeholder:italic focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[rgb(var(--primary))]/30 text-sm sm:text-base md:text-lg cursor-pointer"
            />
            <Button
              variant="default"
              size="lg"
              onClick={handleSearch}
              className="absolute right-[10px] sm:right-[12px] inset-y-[2px] sm:inset-y-[10px] h-[35px] sm:h-[48px] w-[36px] sm:w-[48px] p-0 rounded-full flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Popular Destinations */}
          <motion.div
            className="mt-1.5 sm:mt-3 md:mt-5 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-3 px-1 sm:px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.span 
              className="text-white/80 text-[8px] sm:text-[10px] md:text-sm font-medium"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Popular:
            </motion.span>
            {popularDestinations.map((dest, i) => (
              <motion.button
                key={dest}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.1 + i * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-[8px] sm:text-[10px] md:text-sm font-medium hover:bg-white/20 transition-colors duration-300"
              >
                {dest}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Trusted Brand Badge - Positioned in inverted border space */}
      </div>
      <div className="absolute bottom-0 right-0 sm:bottom-0 sm:right-1 md:bottom-1 md:right-1 flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 md:gap-2.5 pr-1 sm:pr-1 md:pr-0 translate-y-[12px] sm:translate-y-0 md:translate-y-0">
        <div className="flex -space-x-1.5 sm:-space-x-4 md:-space-x-5">
          {testimonials.slice(0, 4).map((testimonial) => (
            <CustomerAvatar
              key={testimonial.name}
              name={testimonial.name}
              image={testimonial.image}
              size="small"
            />
          ))}
        </div>
        <div className="flex flex-col items-end sm:items-start gap-0 sm:gap-0.5">
          <span className="text-[8px] sm:text-xs md:text-sm font-semibold text-gray-900 leading-tight whitespace-nowrap">Trusted Brand</span>
          <span className="text-[7px] sm:text-[10px] md:text-xs text-gray-600 leading-tight whitespace-nowrap">by 1000+ Travelers</span>
        </div>
      </div>
    </div>
  );
};