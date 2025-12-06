import { Header } from '@/components/features/header';
import { HeroSection } from '@/components/features/hero-section';
import { TravelStyleSection } from '@/components/features/travel-style-section';
import { BrowseDestinationsSection } from '@/components/features/browse-destinations-section';
import { CelebratingSmileSection } from '@/components/features/celebrating-smile';
import { ExploreSection } from '@/components/features/explore-section';
import { WhyChooseUsSection } from '@/components/features/why-choose-us-section';
import { ThreeStepsSection } from '@/components/features/three-steps-section';
import { TestimonialsSection } from '@/components/features/testimonials-section';
import { Footer } from '@/components/features/footer';

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
