'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface TravelStyleHeroSectionProps {
  selectedStyle?: string;
}

const styleConfig: Record<string, { title: string; subtitle: string[]; buttonText: string; image: string }> = {
  romantic: {
    title: "Fall in Love, Somewhere Beautiful",
    subtitle: [
      "From quiet sunsets to mountain mornings",
      "Craft your romantic journeys that feel personal, peaceful, and unforgettable."
    ],
    buttonText: "Plan My Romantic Trip",
    image: "/assets/hero/romantic-hero-bg.png"
  },
  beach: {
    title: "Discover Paradise on Earth",
    subtitle: [
      "From pristine shores to turquoise waters",
      "Escape to the world's most beautiful beaches and create unforgettable memories."
    ],
    buttonText: "Plan My Beach Trip",
    image: "/assets/hero/romantic-hero-bg.png" // Update with beach image when available
  },
  adventure: {
    title: "Embrace the Thrill of Adventure",
    subtitle: [
      "From mountain peaks to wild trails",
      "Experience adrenaline-pumping adventures that push your limits and create lasting memories."
    ],
    buttonText: "Plan My Adventure Trip",
    image: "/assets/hero/romantic-hero-bg.png" // Update with adventure image when available
  },
  heritage: {
    title: "Journey Through Time and Culture",
    subtitle: [
      "From ancient monuments to living traditions",
      "Explore the rich heritage and cultural treasures that tell stories of civilizations past."
    ],
    buttonText: "Plan My Heritage Trip",
    image: "/assets/hero/romantic-hero-bg.png" // Update with heritage image when available
  },
  luxury: {
    title: "Indulge in Unparalleled Luxury",
    subtitle: [
      "From opulent resorts to exclusive experiences",
      "Experience the finest in travel with world-class amenities and personalized service."
    ],
    buttonText: "Plan My Luxury Trip",
    image: "/assets/hero/romantic-hero-bg.png" // Update with luxury image when available
  }
};

export const TravelStyleHeroSection = ({ selectedStyle = 'romantic' }: TravelStyleHeroSectionProps) => {
  const config = styleConfig[selectedStyle.toLowerCase()] || styleConfig.romantic;
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] rounded-[20px] sm:rounded-[30px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={config.image}
        alt={`${selectedStyle} travel style`}
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
          {config.title}
        </h2>

        <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 md:mb-10 max-w-2xl px-2">
          {config.subtitle.map((text, index) => (
            <p key={index} className="text-sm sm:text-base md:text-lg text-purple-200/90 leading-relaxed">
              {text}
            </p>
          ))}
        </div>

        <Button
          variant="outline"
          className="bg-transparent text-white border-[#FACC15] hover:bg-[#FACC15]/10 hover:text-white rounded-xl px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-medium"
        >
          {config.buttonText}
        </Button>
      </div>
    </div>
  );
};

