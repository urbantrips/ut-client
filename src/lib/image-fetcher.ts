// Constants
const INVALID_LOCATIONS = ['not specified', 'undefined', 'null', 'none', 'travel', 'destination', 'trip', 'tour'];
const COMMON_WORDS_TO_REMOVE = /\b(travel|destination|trip|tour|visit|explore|departure|arrival)\b/gi;
const FETCH_TIMEOUT = 5000;
const IMAGE_MAX_WIDTH = 800;

// Types for New Places API
interface PlacePhoto {
  name: string;
  widthPx?: number;
  heightPx?: number;
  authorAttributions?: Array<{
    displayName?: string;
    uri?: string;
    photoUri?: string;
  }>;
}

interface Place {
  id: string;
  displayName?: {
    text?: string;
    languageCode?: string;
  };
  photos?: PlacePhoto[];
}

interface PlacesSearchResponse {
  places?: Place[];
}

interface PlaceDetailsResponse {
  photos?: PlacePhoto[];
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
 * Searches for a place using Google Places API (New) - searchText endpoint
 */
async function searchPlace(
  location: string,
  apiKey: string
): Promise<Place | null> {
  try {
    const url = 'https://places.googleapis.com/v1/places:searchText';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.photos',
      },
      body: JSON.stringify({
        textQuery: location,
        maxResultCount: 1,
      }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!response.ok) {
      console.error(`[Image Fetcher] API error for location "${location}": ${response.status} ${response.statusText}`);
      return null;
    }

    const data: PlacesSearchResponse = await response.json();
    return data.places?.[0] || null;
  } catch (error) {
    console.error(`[Image Fetcher] Error searching for place "${location}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Gets place details with photos from Google Places API (New)
 */
async function getPlaceDetails(
  placeId: string,
  apiKey: string
): Promise<PlacePhoto[] | null> {
  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'photos',
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });

    if (!response.ok) {
      console.error(`[Image Fetcher] API error for place ${placeId}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: PlaceDetailsResponse = await response.json();
    return data.photos || null;
  } catch (error) {
    console.error(`[Image Fetcher] Error fetching place details for ${placeId}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Gets a photo URL from Google Places API (New)
 * The new API uses photo name (format: places/{PLACE_ID}/photos/{PHOTO_ID})
 */
function getGooglePlacesPhotoUrl(photoName: string): string {
  // Photo name format from API is "places/{PLACE_ID}/photos/{PHOTO_ID}"
  // Pass the full photo name to the proxy as-is (it's already in the correct format)
  // URL encode it to handle special characters in the photo ID
  return `/api/places/image?photo_reference=${encodeURIComponent(photoName)}&maxwidth=${IMAGE_MAX_WIDTH}`;
}

/**
 * Fetches an image URL from Google Places API (New) only
 */
export async function fetchDestinationImage(
  keywords: string,
  destinationName?: string,
  photoIndex: number = 0
): Promise<string> {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!googleMapsApiKey) {
    // Return placeholder if API key is not configured
    const placeholderUrl = `https://picsum.photos/${IMAGE_MAX_WIDTH}/600`;
    console.error(`[Image Fetcher] ❌ Google Maps API key not configured! Check your .env file for GOOGLE_MAPS_API_KEY`);
    return placeholderUrl;
  }

  // Parse and prepare search terms
  const searchQuery = keywords.trim() || destinationName || 'travel destination';
  const keywordsArray = searchQuery.split(',').map((k) => k.trim()).filter((k) => k.length > 0);

  // Build location search list
  const locationsToTry = buildLocationSearchList(destinationName, keywordsArray);

  if (locationsToTry.length === 0) {
    // Return placeholder if no valid locations to search
    return `https://picsum.photos/${IMAGE_MAX_WIDTH}/600`;
  }

  // Try each location until we find a photo
  for (const location of locationsToTry) {
    if (!isValidLocation(location)) continue;

    const place = await searchPlace(location, googleMapsApiKey);
    if (!place) continue;

    // Try photos from search response first
    if (place.photos && place.photos.length > 0) {
      const photoIdx = Math.min(photoIndex, place.photos.length - 1);
      const photo = place.photos[photoIdx];
      if (photo.name) {
        return getGooglePlacesPhotoUrl(photo.name);
      }
    }

    // If no photos in search response, get place details
    if (place.id) {
      const photos = await getPlaceDetails(place.id, googleMapsApiKey);
      if (photos && photos.length > 0) {
        const photoIdx = Math.min(photoIndex, photos.length - 1);
        const photo = photos[photoIdx];
        if (photo.name) {
          return getGooglePlacesPhotoUrl(photo.name);
        }
      }
    }
  }

  // Return placeholder if Google Maps search fails
  return `https://picsum.photos/${IMAGE_MAX_WIDTH}/600`;
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
