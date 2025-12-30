// Constants
const INVALID_LOCATIONS = ['not specified', 'undefined', 'null', 'none', 'travel', 'destination', 'trip', 'tour'];
const COMMON_WORDS_TO_REMOVE = /\b(travel|destination|trip|tour|visit|explore|departure|arrival)\b/gi;
const FETCH_TIMEOUT = 5000;
const IMAGE_MAX_WIDTH = 800;
const IMAGE_HEIGHT = 600;

// Types for Unsplash API
interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  width: number;
  height: number;
}

interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

/**
 * Validates if a location string is valid for searching
 */
function isValidLocation(location: string | undefined): boolean {
  if (!location) return false;
  const normalized = location.toLowerCase().trim();
  return normalized.length >= 2 && !INVALID_LOCATIONS.includes(normalized);
}

/**
 * Cleans a location name by removing common travel-related words
 */
function cleanLocationName(location: string): string {
  return location.replace(COMMON_WORDS_TO_REMOVE, '').trim();
}

/**
 * Builds a list of potential location names to search for
 */
function buildLocationSearchList(
  destinationName: string | undefined,
  keywords: string[]
): string[] {
  const locations: string[] = [];

  // Priority 1: Cleaned destination name
  if (destinationName && isValidLocation(destinationName)) {
    const cleaned = cleanLocationName(destinationName);
    if (isValidLocation(cleaned)) {
      locations.push(cleaned);
    }
  }

  // Priority 2: Valid keywords
  const validKeywords = keywords.filter(
    (k) => k.length > 2 && isValidLocation(k) && !INVALID_LOCATIONS.includes(k.toLowerCase())
  );
  locations.push(...validKeywords);

  // Priority 3: Primary keyword (if not already included)
  const primaryKeyword = keywords[0];
  if (primaryKeyword && isValidLocation(primaryKeyword) && !locations.includes(primaryKeyword)) {
    locations.push(primaryKeyword);
  }

  return locations;
}

/**
 * Searches for photos using Unsplash API
 */
async function searchUnsplashPhotos(
  query: string,
  accessKey: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashPhoto[] | null> {
  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${accessKey}`,
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!response.ok) {
      console.error(`[Image Fetcher] Unsplash API error for query "${query}": ${response.status} ${response.statusText}`);
      return null;
    }

    const data: UnsplashSearchResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`[Image Fetcher] Error searching Unsplash for "${query}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Gets an Unsplash photo URL with proper sizing
 */
function getUnsplashPhotoUrl(photo: UnsplashPhoto): string {
  // Use regular size which is typically 1080px wide, good quality
  // Unsplash provides different sizes: raw, full, regular, small, thumb
  return photo.urls.regular;
}

/**
 * Fetches an image URL from Unsplash API
 */
export async function fetchDestinationImage(
  keywords: string,
  destinationName?: string,
  photoIndex: number = 0
): Promise<string> {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
  
  if (!unsplashAccessKey) {
    // Return placeholder if API key is not configured
    const placeholderUrl = `https://picsum.photos/${IMAGE_MAX_WIDTH}/${IMAGE_HEIGHT}`;
    console.error(`[Image Fetcher] ❌ Unsplash API key not configured! Check your .env file for UNSPLASH_ACCESS_KEY`);
    return placeholderUrl;
  }

  // Parse and prepare search terms
  const searchQuery = keywords.trim() || destinationName || 'travel destination';
  const keywordsArray = searchQuery.split(',').map((k) => k.trim()).filter((k) => k.length > 0);

  // Build location search list
  const locationsToTry = buildLocationSearchList(destinationName, keywordsArray);

  if (locationsToTry.length === 0) {
    // Return placeholder if no valid locations to search
    return `https://picsum.photos/${IMAGE_MAX_WIDTH}/${IMAGE_HEIGHT}`;
  }

  // Try each location until we find a photo
  for (const location of locationsToTry) {
    if (!isValidLocation(location)) continue;

    // Build search query - add "travel" or "destination" for better results
    const searchTerms = [`${location} travel`, `${location} destination`, location];
    
    for (const searchTerm of searchTerms) {
      const photos = await searchUnsplashPhotos(searchTerm, unsplashAccessKey, 1, 20);
      
      if (photos && photos.length > 0) {
        // Try to get a good photo index, skip first few if needed
        const indexToUse = Math.min(photoIndex + 2, photos.length - 1);
        const photo = photos[indexToUse];
        
        if (photo) {
          return getUnsplashPhotoUrl(photo);
        }
        
        // Fallback to first photo if index is out of range
        if (photos[0]) {
          return getUnsplashPhotoUrl(photos[0]);
        }
      }
    }
  }

  // Return placeholder if Unsplash search fails
  return `https://picsum.photos/${IMAGE_MAX_WIDTH}/${IMAGE_HEIGHT}`;
}

/**
 * Extracts destination name from itinerary day data
 */
export function extractDestinationFromItinerary(
  title: string,
  activities: string[],
  departureCity?: string
): string | undefined {
  // Patterns to extract location names from title
  const titlePatterns = [
    /(?:visit|explore|discover|tour|in|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:palace|temple|fort|lake|beach|mountain|valley)/gi,
  ];

  for (const pattern of titlePatterns) {
    const match = title.match(pattern);
    if (match) {
      return match[0].replace(/(?:visit|explore|discover|tour|in|at)\s+/gi, '').trim();
    }
  }

  // Patterns to extract attraction names from activities
  if (activities.length > 0) {
    const attractionPatterns = [
      /(?:visit|explore|see|tour)\s+(?:to\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi,
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:palace|temple|fort|lake|beach|mountain|valley|museum|park|garden|market)/gi,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)$/g,
    ];

    const excludedWords = ['Location', 'Visit', 'Return', 'Overnight', 'Optional'];

    for (const activity of activities) {
      for (const pattern of attractionPatterns) {
        const match = activity.match(pattern);
        if (match?.[0]) {
          const location = match[0].replace(/(?:visit|explore|see|tour)\s+(?:to\s+)?/gi, '').trim();
          if (location && !excludedWords.includes(location)) {
            return location;
          }
        }
      }
    }

    // Fallback: Extract from first activity
    const activityMatch = activities[0].match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
    if (activityMatch) {
      return activityMatch[0];
    }
  }

  return departureCity;
}
