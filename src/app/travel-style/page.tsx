import { Header } from '@/components/features/header';
import { TravelStyleHeroSection } from '@/components/features/travel-style-hero-section';
import { ForCouplesSection } from '@/components/features/for-couples-section';
import { TravelStyleDestinationsSection } from '@/components/features/travel-style-destinations-section';
import { DestinationPosterSection } from '@/components/features/destination-poster-section';
import { Footer } from '@/components/features/footer';
import {
  travelStyleDestinations,
  styleMap,
  getDestinationImage,
  getSectionTitles,
} from '@/data/travel-style-destinations';

interface TravelStylePageProps {
  searchParams: Promise<{
    style?: string;
  }>;
}


export default async function TravelStylePage({ searchParams }: TravelStylePageProps) {
  const params = await searchParams;
  const selectedStyle = params.style || 'romantic';
  
  const dataStyle = styleMap[selectedStyle.toLowerCase()] || 'Romantic';
  const styleData = travelStyleDestinations.find(s => s.style === dataStyle);
  
  if (!styleData) {
    return null;
  }
  
  // Get destinations for each category
  const topSellingCategory = styleData.categories.find(c => c.title === 'Top Selling');
  const mustVisitCategory = styleData.categories.find(c => 
    c.title === 'Must Visit in India' || c.title === 'Must Visit' || c.title === 'Best of India' || c.title === 'Domestic Luxury'
  );
  
  const topSellingDestinations = topSellingCategory 
    ? topSellingCategory.destinations.map(dest => ({
        title: dest.name,
        image: getDestinationImage(dest.name),
        price: `${dest.duration} • ${dest.price}`,
      }))
    : [];
  
  const mustVisitDestinations = mustVisitCategory
    ? mustVisitCategory.destinations.map(dest => ({
        title: dest.name,
        image: getDestinationImage(dest.name),
        price: `${dest.duration} • ${dest.price}`,
      }))
    : [];

  const titles = getSectionTitles(dataStyle, mustVisitCategory?.title);
  
  return (
    <main className="min-h-screen pt-16 sm:pt-20 overflow-x-hidden flex flex-col">
      <Header />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <TravelStyleHeroSection selectedStyle={selectedStyle} />
      </div>
      {/* For Couples Section - order-3 on mobile (after cards), order-1 on desktop (before cards) */}
      <div className="order-3 lg:order-1">
        <ForCouplesSection />
      </div>
      {/* First Cards Section - order-1 on mobile, order-2 on desktop */}
      {topSellingDestinations.length > 0 && (
        <div className="order-1 lg:order-2">
          <TravelStyleDestinationsSection
            title={titles.first}
            destinations={topSellingDestinations}
            cardCount={5}
          />
        </div>
      )}
      {/* Second Cards Section - order-2 on mobile, order-3 on desktop */}
      {mustVisitDestinations.length > 0 && (
        <div className="order-2 lg:order-3">
          <TravelStyleDestinationsSection
            title={titles.second}
            destinations={mustVisitDestinations}
            cardCount={5}
          />
        </div>
      )}
      {/* Destination Poster - order-4 on all screens */}
      <div className="order-5 lg:order-5">
        <DestinationPosterSection />
      </div>
      {/* Footer - order-5 on all screens */}
      <div className="order-6 lg:order-6">
        <Footer />
      </div>
    </main>
  );
}

