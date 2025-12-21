import { findAllMatchingCategories, getDestinationsByCategory, getDestinationTag, trendingDestinations, popularComboDestinations, allDestinationsByRegion } from '@/data/all-destinations';

export interface DestinationWithTag {
  title: string;
  tag: string | null;
}

export function getTagStyle(tag: string | null): string {
  if (!tag) return '';
  switch (tag) {
    case 'Trending':
      return 'bg-orange-100 text-orange-600';
    case 'Most Visited':
      return 'bg-blue-100 text-blue-600';
    case 'Weekend':
      return 'bg-green-100 text-green-600';
    case 'New Discoveries':
      return 'bg-purple-100 text-purple-600';
    case 'Quick Visa Getaways':
      return 'bg-pink-100 text-pink-600';
    case 'Spiritual':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function filterDestinations(
  searchQuery: string,
  allDestinations: DestinationWithTag[]
): DestinationWithTag[] {
  if (!searchQuery.trim()) {
    // Show trending destinations on initial render
    return trendingDestinations.map(dest => ({
      title: dest.title,
      tag: dest.tag
    }));
  }

  const query = searchQuery.toLowerCase().trim();
  const uniqueDestinationsMap = new Map<string, DestinationWithTag>();
  const foundCategoryNames = new Set<string>();
  
  // Check if search query matches any categories (regions or combos)
  const matchingCategories = findAllMatchingCategories(query);
  
  if (matchingCategories.length > 0) {
    // Collect destinations from all matching categories
    matchingCategories.forEach(category => {
      foundCategoryNames.add(category);
      const categoryDestinations = getDestinationsByCategory(category);
      categoryDestinations.forEach(dest => {
        if (!uniqueDestinationsMap.has(dest)) {
          uniqueDestinationsMap.set(dest, {
            title: dest,
            tag: getDestinationTag(dest)
          });
        }
      });
    });
  }
  
  // Also include individual destinations that match the search query
  allDestinations.forEach(dest => {
    if (dest.title.toLowerCase().includes(query)) {
      if (!uniqueDestinationsMap.has(dest.title)) {
        uniqueDestinationsMap.set(dest.title, dest);
      }
      
      // Check if this destination belongs to any category and add that category name
      // Check combo categories
      Object.keys(popularComboDestinations).forEach(categoryName => {
        const categoryDestinations = popularComboDestinations[categoryName].destinations;
        if (categoryDestinations.includes(dest.title)) {
          foundCategoryNames.add(categoryName);
        }
      });
      
      // Check regions
      Object.keys(allDestinationsByRegion).forEach(regionName => {
        const regionDestinations = allDestinationsByRegion[regionName];
        if (regionDestinations.includes(dest.title)) {
          foundCategoryNames.add(regionName);
        }
      });
    }
  });
  
  // Add category names to the results
  foundCategoryNames.forEach(categoryName => {
    if (!uniqueDestinationsMap.has(categoryName)) {
      uniqueDestinationsMap.set(categoryName, {
        title: categoryName,
        tag: getDestinationTag(categoryName)
      });
    }
  });
  
  // Convert to array and sort
  return Array.from(uniqueDestinationsMap.values())
    .sort((a, b) => a.title.localeCompare(b.title));
}

