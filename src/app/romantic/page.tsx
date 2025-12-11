import { Header } from '@/components/features/header';
import { TravelStyleHeroSection } from '@/components/features/travel-style-hero-section';
import { ForCouplesSection } from '@/components/features/for-couples-section';
import { TravelStyleDestinationsSection } from '@/components/features/travel-style-destinations-section';
import { DestinationPosterSection } from '@/components/features/destination-poster-section';
import { Footer } from '@/components/features/footer';
import { romanticDestinations, honeymoonDestinationsIndia } from '@/data/romantic-destinations';

export default function TravelStylePage() {
  return (
    <main className="min-h-screen pt-16 sm:pt-20 overflow-x-hidden flex flex-col">
      <Header />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <TravelStyleHeroSection />
      </div>
      {/* For Couples Section - order-3 on mobile (after cards), order-1 on desktop (before cards) */}
      <div className="order-3 lg:order-1">
        <ForCouplesSection />
      </div>
      {/* First Cards Section - order-1 on mobile, order-2 on desktop */}
      <div className="order-1 lg:order-2">
        <TravelStyleDestinationsSection
          title="Experience love in the world's most romantic places."
          destinations={romanticDestinations}
          cardCount={3}
        />
      </div>
      {/* Second Cards Section - order-2 on mobile, order-3 on desktop */}
      <div className="order-2 lg:order-3">
        <TravelStyleDestinationsSection
          title="Top Honeymoon Destinations In India"
          destinations={honeymoonDestinationsIndia}
          cardCount={3}
        />
      </div>
      {/* Destination Poster - order-4 on all screens */}
      <div className="order-4">
        <DestinationPosterSection />
      </div>
      {/* Footer - order-5 on all screens */}
      <div className="order-5">
        <Footer />
      </div>
    </main>
  );
}

