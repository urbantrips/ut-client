import { Header } from '@/components/features/header';
import { TravelStyleHeroSection } from '@/components/features/travel-style-hero-section';
import { ForCouplesSection } from '@/components/features/for-couples-section';
import { TravelStyleDestinationsSection } from '@/components/features/travel-style-destinations-section';
import { DestinationPosterSection } from '@/components/features/destination-poster-section';
import { Footer } from '@/components/features/footer';
import { romanticDestinations, honeymoonDestinationsIndia } from '@/data/romantic-destinations';

export default function TravelStylePage() {
  return (
    <main className="min-h-screen pt-16 sm:pt-20 overflow-x-hidden">
      <Header />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <TravelStyleHeroSection />
      </div>
      <ForCouplesSection />
      <TravelStyleDestinationsSection
        title="Experience love in the world's most romantic places."
        destinations={romanticDestinations}
        cardCount={3}
      />
      <TravelStyleDestinationsSection
        title="Top Honeymoon Destinations In India"
        destinations={honeymoonDestinationsIndia}
        cardCount={3}
      />
      <DestinationPosterSection />
      <Footer />
    </main>
  );
}

