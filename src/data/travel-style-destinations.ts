import { destinationsByCategory } from './destinations';

export interface TravelStyleDestination {
  name: string;
  duration: string;
  price: string;
}

export interface TravelStyleCategory {
  title: string;
  destinations: TravelStyleDestination[];
}

export interface TravelStyle {
  style: 'Romantic' | 'Beach' | 'Adventure' | 'Heritage' | 'Luxury';
  categories: TravelStyleCategory[];
}

export interface TransformedDestination {
  title: string;
  image: string;
  price: string;
}

export type TravelStyleType = 'Romantic' | 'Beach' | 'Adventure' | 'Heritage' | 'Luxury';

// Helper function to extract main destination name from formatted string
export function extractDestinationName(formattedName: string): string {
  // Extract the main destination name (before the em dash or dash)
  const match = formattedName.match(/^([^–—\-]+)/);
  return match ? match[1].trim() : formattedName;
}

// Helper function to find image path for a destination
export function getDestinationImage(destinationName: string): string {
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
export function transformDestinations(
  styleDestinations: TravelStyle
): TransformedDestination[] {
  const transformed: TransformedDestination[] = [];
  
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

// Map URL style to data style
export const styleMap: Record<string, TravelStyleType> = {
  romantic: 'Romantic',
  beach: 'Beach',
  adventure: 'Adventure',
  heritage: 'Heritage',
  luxury: 'Luxury',
};

// Determine section titles based on style
export function getSectionTitles(
  style: TravelStyleType,
  mustVisitCategoryTitle?: string
): { first: string; second: string } {
  switch (style) {
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
        second: mustVisitCategoryTitle === 'Domestic Luxury' ? "Domestic Luxury Escapes" : "International Luxury Escapes",
      };
    default:
      return {
        first: "Explore Amazing Destinations",
        second: "Featured Destinations",
      };
  }
}

export const travelStyleDestinations: TravelStyle[] = [
  {
    style: 'Romantic',
    categories: [
      {
        title: 'Top Selling',
        destinations: [
          { name: 'Udaipur – Royal Romance Awaits', duration: '3N/4D', price: 'From ₹18,999' },
          { name: "Malaysia - Asia's Most Effortless Escape", duration: '4N/5D', price: 'From ₹26,999' },
          { name: 'Manali – Mountains of Love', duration: '4N/5D', price: 'From ₹19,999' },
          { name: 'Kashmir – Heaven for Lovers', duration: '5N/6D', price: 'From ₹24,999' },
          { name: 'Ooty – Misty Moments Together', duration: '3N/4D', price: 'From ₹17,999' },
          { name: 'Pondicherry – French Romance by the Sea', duration: '3N/4D', price: 'From ₹16,499' },
        ],
      },
      {
        title: 'Must Visit in India',
        destinations: [
          { name: 'Munnar – Honeymoon in the Clouds', duration: '3N/4D', price: 'From ₹25,999' },
          { name: 'Andaman – Paradise for Two', duration: '5N/6D', price: 'From ₹24,999' },
          { name: 'Shimla – Classic Hill Romance', duration: '3N/4D', price: 'From ₹16,999' },
          { name: 'Alleppey – Backwater Honeymoon', duration: '3N/4D', price: 'From ₹21,999' },
          { name: 'Darjeeling – Tea Garden Romance', duration: '3N/4D', price: 'From ₹18,999' },
          { name: 'Nainital – Lakeview Romance', duration: '3N/4D', price: 'From ₹17,999' },
          { name: 'Pahalgam – Valley of Meadows', duration: '3N/4D', price: 'From ₹23,999' },
        ],
      },
      {
        title: 'Top International',
        destinations: [
          { name: 'Maldives – Turquoise Dreams', duration: '4N/5D', price: 'From ₹89,999' },
          { name: 'Bali – Island of Romance', duration: '5N/6D', price: 'From ₹55,999' },
          { name: 'Paris – The City of Love', duration: '6N/7D', price: 'From ₹1,49,999' },
          { name: 'Turkey – Bosphorus Romance', duration: '6N/7D', price: 'From ₹1,09,999' },
          { name: 'Mauritius – Crystal Blue Honeymoon', duration: '5N/6D', price: 'From ₹99,999' },
          { name: 'Vietnam – Halong Bay Romance', duration: '5N/6D', price: 'From ₹79,999' },
        ],
      },
    ],
  },
  {
    style: 'Beach',
    categories: [
      {
        title: 'Top Selling',
        destinations: [
          { name: 'Goa – Sun, Sand & Sea', duration: '4N/5D', price: 'From ₹16,999' },
          { name: "Kovalam – Kerala's Beach Gem", duration: '3N/4D', price: 'From ₹25,999' },
          { name: 'Andaman – Azure Waters', duration: '5N/6D', price: 'From ₹34,999' },
          { name: 'Bekal – Quiet Malabar Retreat', duration: '3N/4D', price: 'From ₹22,999' },
          { name: 'Varkala – Cliff & Sea Magic', duration: '3N/4D', price: 'From ₹16,999' },
          { name: 'Gokarna – Chill Beach Vibes', duration: '3N/4D', price: 'From ₹14,999' },
        ],
      },
      {
        title: 'Island Hopping',
        destinations: [
          { name: 'Lakshadweep – Coral Paradise Trail', duration: '4N/5D', price: 'From ₹25,999' },
          { name: 'Andaman Islands Explorer', duration: '6N/7D', price: 'From ₹38,999' },
          { name: 'Thailand Islands (Phuket–Phi Phi–Krabi)', duration: '6N/7D', price: 'From ₹58,999' },
          { name: 'Sri Lanka – Island Heritage & Beaches', duration: '5N/6D', price: 'From ₹44,999' },
          { name: 'Indonesia – Lombok–Gili Islands', duration: '6N/7D', price: 'From ₹69,999' },
          { name: 'Fiji – Tropical Island Circuit', duration: '5N/6D', price: 'From ₹1,09,999' },
        ],
      },
      {
        title: 'Weekend Escape',
        destinations: [
          { name: 'Gokarna – Quick Beach Therapy', duration: '2N/3D', price: 'From ₹12,999' },
          { name: 'Alibaug – Coastal Retreat', duration: '2N/3D', price: 'From ₹12,999' },
          { name: 'Kannur – Hidden Beaches Escape', duration: '2N/3D', price: 'From ₹9,999' },
          { name: 'Daman – Quiet Coastal Break', duration: '2N/3D', price: 'From ₹9,999' },
          { name: 'Kakkadampoyil - Annakampoyil Getaway', duration: '2N/3D', price: 'From ₹8,999' },
          { name: 'Madikeri - Kodagu weekend trip', duration: '2N/3D', price: 'From ₹9,999' },
        ],
      },
      {
        title: 'Budget Friendly',
        destinations: [
          { name: 'Puri – Temple & Beach', duration: '3N/4D', price: 'From ₹12,999' },
          { name: 'Varkala – Cliff Beach Haven', duration: '3N/4D', price: 'From ₹12,999' },
          { name: 'Karwar – Calm Coastal Bliss', duration: '3N/4D', price: 'From ₹10,999' },
          { name: 'Calicut - city of Heritage', duration: '2D/1N', price: 'From ₹5,999' },
          { name: 'Gavi - wildlife safari', duration: '2D/1N', price: 'From ₹5,999' },
          { name: 'Vagamon Thekkady - Camp with stars', duration: '3D/2N', price: 'From ₹7,999' },
          { name: 'Kolukkumalai Munnar - Cloudbed view trek', duration: '3D/2N', price: 'From ₹7,999' },
        ],
      },
    ],
  },
  {
    style: 'Adventure',
    categories: [
      {
        title: 'Top Selling',
        destinations: [
          { name: 'Rishikesh – Adrenaline Rush', duration: '3N/4D', price: 'From ₹17,999' },
          { name: 'Manali – Thrill in the Hills', duration: '5N/6D', price: 'From ₹26,999' },
          { name: 'Ladakh – High Altitude Adventure', duration: '6N/7D', price: 'From ₹42,999' },
          { name: "Kasol–Kheerganga – Trekker's Paradise", duration: '4N/5D', price: 'From ₹18,499' },
          { name: 'Zanskar – Raw Himalayan Adventure', duration: '7N/8D', price: 'From ₹47,999' },
          { name: 'Nagaland – Dzukou Valley Trek', duration: '4N/5D', price: 'From ₹19,999' },
        ],
      },
      {
        title: 'Best of India',
        destinations: [
          { name: 'Bir Billing – Paragliding Capital', duration: '3N/4D', price: 'From ₹19,999' },
          { name: 'Meghalaya – Caves & Waterfalls', duration: '5N/6D', price: 'From ₹32,999' },
          { name: 'Spiti Valley – Mountain Expedition', duration: '7N/8D', price: 'From ₹48,999' },
          { name: 'Tawang – Monastery Mountain Adventure', duration: '6N/7D', price: 'From ₹38,999' },
          { name: 'Chopta–Tungnath – Mini Switzerland Trek', duration: '3N/4D', price: 'From ₹16,999' },
          { name: 'Kodaikanal – Offbeat Trails', duration: '3N/4D', price: 'From ₹19,499' },
          { name: 'Araku Valley – Tribal Hills Adventure', duration: '4N/5D', price: 'From ₹21,999' },
        ],
      },
      {
        title: 'Budget Friendly',
        destinations: [
          { name: 'Rishikesh – River Rafting Special', duration: '2N/3D', price: 'From ₹12,999' },
          { name: 'Solang Valley – Winter Sports', duration: '3N/4D', price: 'From ₹15,999' },
          { name: 'Coorg – Nature Trails', duration: '3N/4D', price: 'From ₹16,999' },
          { name: 'Har Ki Dun – Budget Himalayan Trek', duration: '4N/5D', price: 'From ₹15,999' },
          { name: 'Chikmagalur – Coffee Mountain Hikes', duration: '2N/3D', price: 'From ₹11,999' },
          { name: 'Rajmachi Trek – Maharashtra Classic', duration: '2N/3D', price: 'From ₹8,499' },
        ],
      },
    ],
  },
  {
    style: 'Heritage',
    categories: [
      {
        title: 'Top Selling',
        destinations: [
          { name: 'Golden Triangle (Delhi-Agra-Jaipur)', duration: '4N/5D', price: 'From ₹27,999' },
          { name: 'Rajasthan Triangle (Jaipur–Udaipur–Jodhpur)', duration: '6N/7D', price: 'From ₹38,999' },
          { name: 'Kerala Heritage Trail', duration: '5N/6D', price: 'From ₹29,999' },
          { name: 'Varanasi – Timeless Spiritual Heritage', duration: '3N/4D', price: 'From ₹18,999' },
          { name: 'Amritsar – Golden Legacy', duration: '3N/4D', price: 'From ₹17,999' },
          { name: 'Mahabalipuram – Stone Carved Wonders', duration: '2N/3D', price: 'From ₹15,999' },
        ],
      },
      {
        title: 'Must Visit',
        destinations: [
          { name: 'Jaisalmer – Golden Fort Experience', duration: '3N/4D', price: 'From ₹22,999' },
          { name: 'Hampi – Ancient Kingdom', duration: '3N/4D', price: 'From ₹21,999' },
          { name: 'Khajuraho–Orchha Heritage', duration: '4N/5D', price: 'From ₹24,999' },
          { name: 'Agra – Taj & Mughal Heritage', duration: '3N/4D', price: 'From ₹18,999' },
          { name: 'Mysore – Royal Kingdom Experience', duration: '3N/4D', price: 'From ₹19,499' },
          { name: 'Ujjain – Ancient Temple Trail', duration: '3N/4D', price: 'From ₹17,999' },
          { name: 'Madurai – Dravidian Heritage', duration: '3N/4D', price: 'From ₹18,999' },
        ],
      },
      {
        title: 'Just for You',
        destinations: [
          { name: 'Bikaner – Desert Heritage', duration: '3N/4D', price: 'From ₹20,999' },
          { name: 'Fort Kochi – Colonial Charm', duration: '3N/4D', price: 'From ₹19,999' },
          { name: 'Kumbhalgarh – Hill Fort Majesty', duration: '2N/3D', price: 'From ₹17,999' },
          { name: 'Konark–Puri – Sun Temple Circuit', duration: '4N/5D', price: 'From ₹21,999' },
          { name: 'Chettinad – Heritage Mansions Trail', duration: '2N/3D', price: 'From ₹16,999' },
          { name: 'Lucknow – Nawabi Heritage Walk', duration: '3N/4D', price: 'From ₹17,999' },
        ],
      },
    ],
  },
  {
    style: 'Luxury',
    categories: [
      {
        title: 'Top Selling',
        destinations: [
          { name: 'Udaipur – Palace Luxury Stay', duration: '4N/5D', price: 'From ₹65,999' },
          { name: 'Kerala – Houseboat & Premium Resorts', duration: '5N/6D', price: 'From ₹72,999' },
          { name: 'Goa – Luxury Beach Escape', duration: '4N/5D', price: 'From ₹58,999' },
          { name: 'Mussoorie – Hillside Luxury Villas', duration: '4N/5D', price: 'From ₹55,999' },
          { name: 'Taj Madikeri – Coorg Luxury Escape', duration: '3N/4D', price: 'From ₹59,999' },
        ],
      },
      {
        title: 'International Luxury',
        destinations: [
          { name: 'Singapore – Urban Elegance', duration: '4N/5D', price: 'From ₹99,999' },
          { name: 'Maldives – Overwater Villas', duration: '5N/6D', price: 'From ₹1,49,999' },
          { name: 'Dubai – Arabian Luxury', duration: '5N/6D', price: 'From ₹1,19,999' },
          { name: 'Switzerland – Alps & Lakes', duration: '6N/7D', price: 'From ₹1,59,999' },
          { name: 'Japan – Culture & Comfort Tour', duration: '6N/7D', price: 'From ₹1,79,999' },
          { name: 'Qatar – Arabian Premium Escape', duration: '4N/5D', price: 'From ₹1,24,999' },
          { name: 'New Zealand – Scenic Luxury Escape', duration: '7N/8D', price: 'From ₹2,29,999' },
        ],
      },
      {
        title: 'Domestic Luxury',
        destinations: [
          { name: 'Jaipur – Palace Stay Experience', duration: '3N/4D', price: 'From ₹54,999' },
          { name: 'Udaipur – Lake Palace Luxury', duration: '3N/4D', price: 'From ₹74,999' },
          { name: 'Wayanad – Wildlife Luxury', duration: '3N/4D', price: 'From ₹42,999' },
          { name: 'Jibhi - Himachali luxe', duration: '4N/5D', price: 'From ₹39,999' },
          { name: 'Kumarakom – Lakeview Luxury Retreat', duration: '3N/4D', price: 'From ₹49,999' },
          { name: 'Andaman – Premium Island Luxury', duration: '5N/6D', price: 'From ₹62,999' },
          { name: 'Mumbai – Luxury City Escape (5-Star Stay)', duration: '3N/4D', price: 'From ₹55,999' },
          { name: 'Hyderabad – Nizam Palace Experience', duration: '3N/4D', price: 'From ₹49,999' },
        ],
      },
    ],
  },
];

