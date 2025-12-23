import { Header } from '@/components/features/layout/header';
import { HeroSection } from '@/components/features/homepage/hero-section';
import { TravelStyleSection } from '@/components/features/homepage/travel-style-section';
import { BrowseDestinationsSection } from '@/components/features/homepage/browse-destinations-section';
import { CelebratingSmileSection } from '@/components/features/homepage/celebrating-smile-section';
import { ExploreSection } from '@/components/features/homepage/explore-section';
import { WhyChooseUsSection } from '@/components/features/homepage/why-choose-us-section';
import { ThreeStepsSection } from '@/components/features/homepage/three-steps-section';
import { TestimonialsSection } from '@/components/features/homepage/testimonials-section';
import { Footer } from '@/components/features/layout/footer';
import { destinationsByCategory } from '@/data/destinations';

export default function Home() {
  return (
    <main className="min-h-screen pt-16 sm:pt-20 overflow-x-hidden">
      <Header />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <HeroSection />
      </div>
      <TravelStyleSection />
      <BrowseDestinationsSection />
      <CelebratingSmileSection />
      <ExploreSection
        title="Explore India"
        subtitle="Unfold top visa-free getaways for smooth journeys."
        destinations={destinationsByCategory['Explore India']}
        cardCount={5}
      />
      <ExploreSection
        title="Quick Visa Getaways"
        subtitle="Explore destinations with easy visa processes"
        destinations={destinationsByCategory['Quick Visa Getaways']}
        cardCount={5}
      />
      <WhyChooseUsSection />
      <ThreeStepsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
