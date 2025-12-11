'use client';

import Link from 'next/link';
import { HeartHandshake, Waves, Compass, Building2, Crown } from 'lucide-react';

const travelStyles = [
  { 
    id: 1, 
    name: 'Romantic', 
    icon: HeartHandshake,
    gradient: 'from-pink-400 to-rose-500',
    color: 'text-rose-500'
  },
  { 
    id: 2, 
    name: 'Beach', 
    icon: Waves,
    gradient: 'from-cyan-400 to-blue-500',
    color: 'text-blue-500'
  },
  { 
    id: 3, 
    name: 'Adventure', 
    icon: Compass,
    gradient: 'from-emerald-400 to-green-600',
    color: 'text-green-600'
  },
  { 
    id: 4, 
    name: 'Heritage', 
    icon: Building2,
    gradient: 'from-amber-400 to-orange-500',
    color: 'text-orange-500'
  },
  { 
    id: 5, 
    name: 'Luxury', 
    icon: Crown,
    gradient: 'from-yellow-400 to-amber-500',
    color: 'text-amber-500'
  },
];

export function TravelStyleSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-6 lg:px-8">
      <div className="lg:px-20 sm:px-10 md:px-16">
        <h2 className="py-6 sm:py-12 md:py-10 text-left">
          Select Your Travel Style
        </h2>
        {/* Cards Container */}
        <div className="flex overflow-x-auto gap-3 sm:gap-4 md:flex md:justify-center lg:justify-between lg:gap-0 scrollbar-hide">
          {travelStyles.map((style, index) => {
            const IconComponent = style.icon;
            return (
              <Link
                key={style.id}
                href={`/travel-style?style=${encodeURIComponent(style.name.toLowerCase())}`}
                className={`relative flex flex-col items-center justify-between bg-primary-50 border-2 border-primary-200 p-4 cursor-pointer hover:border-primary-400 w-[83px] h-[95px] sm:w-[83px] sm:h-[95px] md:w-[180px] md:h-[208px] lg:w-[180px] lg:h-[208px] rounded-[15px] flex-shrink-0 ${index < travelStyles.length - 1 ? 'md:mr-4' : ''}`}
              >
                {/* Circular Icon Area */}
                <div className="flex-1 flex items-center justify-center w-full">
                  <div 
                    className={`rounded-full bg-gradient-to-br ${style.gradient} shadow-lg shadow-black/10 w-[49px] h-[46px] sm:w-[49px] sm:h-[46px] md:w-[100px] md:h-[100px] lg:w-[115px] lg:h-[115px] flex items-center justify-center relative overflow-hidden`}
                  >
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                    <IconComponent 
                      className="text-white w-[24px] h-[24px] sm:w-[24px] sm:h-[24px] md:w-[48px] md:h-[48px] lg:w-[56px] lg:h-[56px] relative z-10 drop-shadow-lg"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="text-[10px] sm:text-[10px] md:text-base font-semibold text-gray-900">
                  {style.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

