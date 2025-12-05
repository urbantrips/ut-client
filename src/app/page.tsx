import { HeroSection } from '@/components/features/hero-section';
import { TravelStyleSection } from '@/components/features/travel-style-section';
import { BrowseDestinationsSection } from '@/components/features/browse-destinations-section';
import { GoldenHourDealsSection } from '@/components/features/golden-hour-deals-section';
import { ExploreSection } from '@/components/features/explore-section';
import { WhyChooseUsSection } from '@/components/features/why-choose-us-section';
import { ThreeStepsSection } from '@/components/features/three-steps-section';
import { TestimonialsSection } from '@/components/features/testimonials-section';
import { Footer } from '@/components/features/footer';

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <HeroSection />
      <TravelStyleSection />
      <BrowseDestinationsSection />
      <GoldenHourDealsSection />
      <ExploreSection
        title="Explore India"
        subtitle="Unfold top visa-free getaways for smooth journeys."
        cardCount={5}
      />
      <ExploreSection
        title="Quick Visa Getaways"
        subtitle="Explore destinations with easy visa processes"
        cardCount={5}
      />
      <WhyChooseUsSection />
      <ThreeStepsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
