import { getDestinationImage } from '@/data/travel-style-destinations';

/**
 * Fetches an image URL for a destination using multiple sources with fallbacks
 * Priority: 1. Google Places API Photos (always tried first), 2. Unsplash API, 3. Local images, 4. Placeholder
 * 
 * Production apps typically use:
 * - CDN + Image Storage (AWS S3 + CloudFront, Cloudinary, Imgix)
 * - Cached image databases
 * - Google Places API for place photos (primary source)
 * - Aggressive caching strategies
 */
export async function fetchDestinationImage(
  keywords: string,
  destinationName?: string
): Promise<string> {
  const searchQuery = keywords.trim() || destinationName || 'travel destination';
  const keywordsArray = searchQuery.split(',').map(k => k.trim()).filter(k => k.length > 0);
  const primaryKeyword = keywordsArray[0] || 'travel';

  // Always try Google Places API first (gets actual place photos)
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!googleMapsApiKey) {
    console.log(`  ✗ Google Maps API key not configured`);
  } else {
    // Filter out invalid location names
    const invalidLocations = ['not specified', 'undefined', 'null', 'none', 'travel', 'destination', 'trip', 'tour'];
    const isInvalidLocation = (loc: string | undefined): boolean => {
      if (!loc) return true;
      const normalized = loc.toLowerCase().trim();
      return invalidLocations.includes(normalized) || normalized.length < 2;
    };
    
    // Build list of potential locations to try
    const locationsToTry: string[] = [];
    
    // 1. Try destination name first
    if (destinationName && !isInvalidLocation(destinationName)) {
      const cleaned = destinationName
        .replace(/\b(travel|destination|trip|tour|visit|explore|departure|arrival)\b/gi, '')
        .trim();
      if (cleaned && !isInvalidLocation(cleaned)) {
        locationsToTry.push(cleaned);
      }
    }
    
    // 2. Try keywords (prioritize capitalized words, then all keywords)
    const validKeywords = keywordsArray.filter(k => 
      k.length > 2 && !isInvalidLocation(k) && !invalidLocations.includes(k.toLowerCase())
    );
    locationsToTry.push(...validKeywords);
    
    // 3. Try primary keyword if it's valid
    if (primaryKeyword && !isInvalidLocation(primaryKeyword) && !locationsToTry.includes(primaryKeyword)) {
      locationsToTry.push(primaryKeyword);
    }
    
    // Try each location until we find a photo
    for (const location of locationsToTry) {
      if (!location || isInvalidLocation(location)) continue;
      
      try {
        // Step 1: Search for the place using Places API Text Search
        const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;
        
        const searchResponse = await fetch(textSearchUrl, {
          signal: AbortSignal.timeout(5000),
        });

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          
          if (searchData.results && searchData.results.length > 0) {
            const place = searchData.results[0];
            
            // Check if photos are already in the text search response (optimization)
            if (place.photos && place.photos.length > 0) {
              const photoReference = place.photos[0].photo_reference;
              // Use proxy endpoint to avoid CORS and keep API key server-side
              const photoUrl = `/api/places/image?photo_reference=${encodeURIComponent(photoReference)}&maxwidth=800`;
              
              console.log(`  ✓ Google Places photo found for: ${location}`);
              console.log(`  📷 Photo URL: ${photoUrl}`);
              return photoUrl;
            }
            
            // If no photos in text search, get place details with photos
            const placeId = place.place_id;
            const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${googleMapsApiKey}`;
            
            const detailsResponse = await fetch(placeDetailsUrl, {
              signal: AbortSignal.timeout(5000),
            });

            if (detailsResponse.ok) {
              const detailsData = await detailsResponse.json();
              
              if (detailsData.result && detailsData.result.photos && detailsData.result.photos.length > 0) {
                // Get the photo URL using Place Photos API via proxy
                const photoReference = detailsData.result.photos[0].photo_reference;
                // Use proxy endpoint to avoid CORS and keep API key server-side
                const photoUrl = `/api/places/image?photo_reference=${encodeURIComponent(photoReference)}&maxwidth=800`;
                
                console.log(`  ✓ Google Places photo found for: ${location}`);
                console.log(`  📷 Photo URL: ${photoUrl}`);
                return photoUrl;
              }
            }
          }
        }
      } catch (error) {
        // Continue to next location if this one fails
        console.log(`  ✗ Google Places API failed for "${location}": ${error instanceof Error ? error.message : 'Unknown error'}`);
        continue;
      }
    }
    
    console.log(`  ✗ Google Places API: No photos found for any location`);
  }


  // Try Unsplash API (fallback if Google Places doesn't work)
  const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;
  if (unsplashApiKey) {
    try {
      const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(primaryKeyword)}&per_page=1&orientation=landscape`;
      const response = await fetch(unsplashUrl, {
        headers: {
          Authorization: `Client-ID ${unsplashApiKey}`,
        },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          // Return regular-sized image (800px width)
          const imageUrl = data.results[0].urls.regular || data.results[0].urls.small;
          console.log(`  ✓ Unsplash image found for: ${primaryKeyword}`);
          return imageUrl;
        }
      }
    } catch (error) {
      console.log(`  ✗ Unsplash API failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Try local images using destination name matching (production apps cache these)
  if (destinationName) {
    try {
      const localImage = getDestinationImage(destinationName);
      if (localImage && localImage.startsWith('/')) {
        // Return full URL for local images (they'll be served by Next.js)
        console.log(`  ✓ Local image found for: ${destinationName}`);
        return localImage;
      }
    } catch (error) {
      console.log(`  ✗ Local image lookup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Fallback: Try Unsplash Source API (deprecated but still works, no key needed)
  try {
    const unsplashSourceUrl = `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(searchQuery)}`;
    console.log(`  ⚠ Using Unsplash Source API (deprecated) for: ${primaryKeyword}`);
    return unsplashSourceUrl;
  } catch (error) {
    console.log(`  ✗ Unsplash Source API failed`);
  }

  // Final fallback: Picsum Photos with seed (consistent placeholder)
  const seed = `${primaryKeyword}-${Date.now()}`.replace(/[^a-z0-9]/gi, '');
  const placeholderUrl = `https://picsum.photos/seed/${seed}/800/600`;
  console.log(`  ⚠ Using placeholder image for: ${primaryKeyword}`);
  return placeholderUrl;
}

/**
 * Extracts destination name from itinerary day data
 */
export function extractDestinationFromItinerary(
  title: string,
  activities: string[],
  departureCity?: string
): string | undefined {
  // Try to extract location names from title
  const locationPatterns = [
    /(?:visit|explore|discover|tour|in|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:palace|temple|fort|lake|beach|mountain|valley)/gi,
  ];

  for (const pattern of locationPatterns) {
    const match = title.match(pattern);
    if (match) {
      return match[0].replace(/(?:visit|explore|discover|tour|in|at)\s+/gi, '').trim();
    }
  }

  // Try first activity
  if (activities.length > 0) {
    const activityMatch = activities[0].match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
    if (activityMatch) {
      return activityMatch[0];
    }
  }

  return departureCity;
}
