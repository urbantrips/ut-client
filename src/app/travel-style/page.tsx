import { Header } from '@/components/features/header';
import { TravelStyleHeroSection } from '@/components/features/travel-style-hero-section';
import { ForCouplesSection } from '@/components/features/for-couples-section';
import { TravelStyleDestinationsSection } from '@/components/features/travel-style-destinations-section';
import { DestinationPosterSection } from '@/components/features/destination-poster-section';
import { Footer } from '@/components/features/footer';
import { travelStyleDestinations } from '@/data/travel-style-destinations';
import { destinationsByCategory } from '@/data/destinations';

interface TravelStylePageProps {
  searchParams: Promise<{
    style?: string;
  }>;
}

// Helper function to extract main destination name from formatted string
function extractDestinationName(formattedName: string): string {
  // Extract the main destination name (before the em dash or dash)
  const match = formattedName.match(/^([^–—\-]+)/);
  return match ? match[1].trim() : formattedName;
}

// Helper function to find image path for a destination
function getDestinationImage(destinationName: string): string {
  const cleanName = extractDestinationName(destinationName);
  
  // Try to find in existing destinations data
  const allDestinations = Object.values(destinationsByCategory).flat();
  const matchingDest = allDestinations.find(
    dest => dest.title.toLowerCase() === cleanName.toLowerCase() ||
            dest.title.toLowerCase().includes(cleanName.toLowerCase()) ||
            cleanName.toLowerCase().includes(dest.title.toLowerCase())
  );
  
  if (matchingDest) {
    return matchingDest.image;
  }
  
  // Try common variations
  const nameVariations: Record<string, string> = {
    'udaipur': '/assets/destinations/must-visit/Jaisalmer.webp', // Using similar destination
    'malaysia': '/assets/destinations/quick-visa/Malaysia.webp',
    'manali': '/assets/destinations/weekend/Muannar.webp', // Using similar hill station
    'kashmir': '/assets/destinations/must-visit/Ladakh.webp',
    'ooty': '/assets/destinations/weekend/Ooty.webp',
    'pondicherry': '/assets/destinations/weekend/Varkala.webp',
    'munnar': '/assets/destinations/weekend/Muannar.webp',
    'andaman': '/assets/destinations/must-visit/Andaman.webp',
    'shimla': '/assets/destinations/must-visit/darjeeling.webp',
    'alleppey': '/assets/destinations/weekend/Muannar.webp',
    'darjeeling': '/assets/destinations/must-visit/darjeeling.webp',
    'nainital': '/assets/destinations/weekend/Ooty.webp',
    'pahalgam': '/assets/destinations/must-visit/Ladakh.webp',
    'maldives': '/assets/destinations/trending/maldives.webp',
    'bali': '/assets/destinations/trending/Bali.webp',
    'paris': '/assets/destinations/trending/Japan.webp',
    'turkey': '/assets/destinations/trending/Turkey.webp',
    'mauritius': '/assets/destinations/trending/maldives.webp',
    'vietnam': '/assets/destinations/trending/Vietnam.webp',
    'goa': '/assets/destinations/just-for-you/Goa.webp',
    'kovalam': '/assets/destinations/weekend/Varkala.webp',
    'bekal': '/assets/destinations/weekend/Varkala.webp',
    'varkala': '/assets/destinations/weekend/Varkala.webp',
    'gokarna': '/assets/destinations/weekend/Gokarna.webp',
    'lakshadweep': '/assets/destinations/must-visit/Lakshadweep.webp',
    'thailand': '/assets/destinations/quick-visa/Thailand.webp',
    'sri lanka': '/assets/destinations/quick-visa/Sri Lanka.webp',
    'indonesia': '/assets/destinations/trending/Bali.webp',
    'fiji': '/assets/destinations/trending/maldives.webp',
    'alibaug': '/assets/destinations/weekend/Gokarna.webp',
    'kannur': '/assets/destinations/weekend/Varkala.webp',
    'daman': '/assets/destinations/weekend/Gokarna.webp',
    'kakkadampoyil': '/assets/destinations/weekend/Wayanad.webp',
    'madikeri': '/assets/destinations/weekend/Coorg.webp',
    'puri': '/assets/destinations/must-visit/Agra.webp',
    'karwar': '/assets/destinations/weekend/Gokarna.webp',
    'calicut': '/assets/destinations/weekend/Varkala.webp',
    'gavi': '/assets/destinations/weekend/Wayanad.webp',
    'vagamon': '/assets/destinations/weekend/Vagamon.webp',
    'thekkady': '/assets/destinations/weekend/Muannar.webp',
    'kolukkumalai': '/assets/destinations/weekend/Muannar.webp',
    'rishikesh': '/assets/destinations/must-visit/Ladakh.webp',
    'ladakh': '/assets/destinations/must-visit/Ladakh.webp',
    'kasol': '/assets/destinations/must-visit/Ladakh.webp',
    'kheerganga': '/assets/destinations/must-visit/Ladakh.webp',
    'zanskar': '/assets/destinations/must-visit/Ladakh.webp',
    'nagaland': '/assets/destinations/must-visit/Meghalaya.webp',
    'bir billing': '/assets/destinations/must-visit/Ladakh.webp',
    'meghalaya': '/assets/destinations/must-visit/Meghalaya.webp',
    'spiti': '/assets/destinations/must-visit/Spiti.webp',
    'tawang': '/assets/destinations/must-visit/Tawang.webp',
    'chopta': '/assets/destinations/must-visit/Ladakh.webp',
    'tungnath': '/assets/destinations/must-visit/Ladakh.webp',
    'kodaikanal': '/assets/destinations/weekend/Kodaikanal.webp',
    'araku valley': '/assets/destinations/must-visit/Meghalaya.webp',
    'solang valley': '/assets/destinations/must-visit/Ladakh.webp',
    'coorg': '/assets/destinations/weekend/Coorg.webp',
    'har ki dun': '/assets/destinations/must-visit/Ladakh.webp',
    'chikmagalur': '/assets/destinations/weekend/Chikmagalur.webp',
    'rajmachi': '/assets/destinations/weekend/Hampi.webp',
    'golden triangle': '/assets/destinations/must-visit/Agra.webp',
    'rajasthan triangle': '/assets/destinations/just-for-you/Rajasthan.webp',
    'kerala': '/assets/destinations/weekend/Muannar.webp',
    'varanasi': '/assets/destinations/must-visit/Agra.webp',
    'amritsar': '/assets/destinations/must-visit/Agra.webp',
    'mahabalipuram': '/assets/destinations/must-visit/Agra.webp',
    'jaisalmer': '/assets/destinations/must-visit/Jaisalmer.webp',
    'hampi': '/assets/destinations/weekend/Hampi.webp',
    'khajuraho': '/assets/destinations/must-visit/Agra.webp',
    'orchha': '/assets/destinations/must-visit/Agra.webp',
    'agra': '/assets/destinations/must-visit/Agra.webp',
    'mysore': '/assets/destinations/weekend/Mysore.webp',
    'ujjain': '/assets/destinations/must-visit/Agra.webp',
    'madurai': '/assets/destinations/must-visit/Agra.webp',
    'bikaner': '/assets/destinations/must-visit/Jaisalmer.webp',
    'fort kochi': '/assets/destinations/weekend/Muannar.webp',
    'kumbhalgarh': '/assets/destinations/must-visit/Jaisalmer.webp',
    'konark': '/assets/destinations/must-visit/Agra.webp',
    'chettinad': '/assets/destinations/weekend/Muannar.webp',
    'lucknow': '/assets/destinations/must-visit/Agra.webp',
    'mussoorie': '/assets/destinations/must-visit/darjeeling.webp',
    'taj madikeri': '/assets/destinations/weekend/Coorg.webp',
    'singapore': '/assets/destinations/quick-visa/Singapore.webp',
    'dubai': '/assets/destinations/trending/dubai.webp',
    'switzerland': '/assets/destinations/trending/Japan.webp',
    'japan': '/assets/destinations/trending/Japan.webp',
    'qatar': '/assets/destinations/quick-visa/Qatar.webp',
    'new zealand': '/assets/destinations/trending/Japan.webp',
    'jaipur': '/assets/destinations/must-visit/Jaisalmer.webp',
    'wayanad': '/assets/destinations/weekend/Wayanad.webp',
    'jibhi': '/assets/destinations/must-visit/Ladakh.webp',
    'kumarakom': '/assets/destinations/weekend/Muannar.webp',
    'mumbai': '/assets/destinations/weekend/Gokarna.webp',
    'hyderabad': '/assets/destinations/must-visit/Agra.webp',
  };
  
  const lowerName = cleanName.toLowerCase();
  for (const [key, imagePath] of Object.entries(nameVariations)) {
    if (lowerName.includes(key)) {
      return imagePath;
    }
  }
  
  // Default fallback image
  return '/assets/destinations/must-visit/Agra.webp';
}

// Transform travel style destinations to component format
function transformDestinations(
  styleDestinations: typeof travelStyleDestinations[0]
): Array<{ title: string; image: string; price: string }> {
  const transformed: Array<{ title: string; image: string; price: string }> = [];
  
  styleDestinations.categories.forEach(category => {
    category.destinations.forEach(dest => {
      transformed.push({
        title: dest.name,
        image: getDestinationImage(dest.name),
        price: `${dest.duration} • ${dest.price}`,
      });
    });
  });
  
  return transformed;
}

export default async function TravelStylePage({ searchParams }: TravelStylePageProps) {
  const params = await searchParams;
  const selectedStyle = params.style || 'romantic';
  
  // Map URL style to data style
  const styleMap: Record<string, 'Romantic' | 'Beach' | 'Adventure' | 'Heritage' | 'Luxury'> = {
    romantic: 'Romantic',
    beach: 'Beach',
    adventure: 'Adventure',
    heritage: 'Heritage',
    luxury: 'Luxury',
  };
  
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
  const internationalCategory = styleData.categories.find(c => 
    c.title === 'Top International' || c.title === 'International Luxury'
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
  
  const internationalDestinations = internationalCategory
    ? internationalCategory.destinations.map(dest => ({
        title: dest.name,
        image: getDestinationImage(dest.name),
        price: `${dest.duration} • ${dest.price}`,
      }))
    : [];
  
  // Determine section titles based on style
  const getSectionTitles = () => {
    switch (dataStyle) {
      case 'Romantic':
        return {
          first: "Experience love in the world's most romantic places.",
          second: "Top Honeymoon Destinations In India",
        };
      case 'Beach':
        return {
          first: "Discover Paradise on Earth",
          second: "Island Hopping Adventures",
        };
      case 'Adventure':
        return {
          first: "Embrace the Thrill of Adventure",
          second: "Best of India Adventures",
        };
      case 'Heritage':
        return {
          first: "Journey Through Time and Culture",
          second: "Must Visit Heritage Sites",
        };
      case 'Luxury':
        return {
          first: "Indulge in Unparalleled Luxury",
          second: mustVisitCategory?.title === 'Domestic Luxury' ? "Domestic Luxury Escapes" : "International Luxury Escapes",
        };
      default:
        return {
          first: "Explore Amazing Destinations",
          second: "Featured Destinations",
        };
    }
  };
  
  const titles = getSectionTitles();
  
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
      {/* Third Cards Section for International (if available) */}
      {internationalDestinations.length > 0 && (
        <div className="order-4 lg:order-4">
          <TravelStyleDestinationsSection
            title={dataStyle === 'Luxury' ? 'International Luxury Escapes' : 'Top International Destinations'}
            destinations={internationalDestinations}
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

