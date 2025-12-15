import { getDestinationImage } from '@/data/travel-style-destinations';

/**
 * Fetches an image URL for a destination using multiple sources with fallbacks
 * Priority: 1. Pexels API, 2. Unsplash API, 3. Local images, 4. Placeholder
 * 
 * Production apps typically use:
 * - CDN + Image Storage (AWS S3 + CloudFront, Cloudinary, Imgix)
 * - Cached image databases
 * - Licensed image APIs (Pexels, Unsplash, Getty)
 * - Aggressive caching strategies
 */
export async function fetchDestinationImage(
  keywords: string,
  destinationName?: string
): Promise<string> {
  const searchQuery = keywords.trim() || destinationName || 'travel destination';
  const keywordsArray = searchQuery.split(',').map(k => k.trim()).filter(k => k.length > 0);
  const primaryKeyword = keywordsArray[0] || 'travel';

  // Try Pexels API first (free, reliable, good quality, production-ready)
  const pexelsApiKey = process.env.PEXELS_API_KEY || "TqAFWMr8CsKXDHhQCJXvEdNXQx85Bvr5NgUgLUXSVz2gq1qEVQrKtyr5"
  if (pexelsApiKey) {
    try {
      const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(primaryKeyword)}&per_page=1&orientation=landscape`;
      const response = await fetch(pexelsUrl, {
        headers: {
          Authorization: pexelsApiKey,
        },
        // Add timeout to prevent hanging (production apps use timeouts)
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          // Return large-sized image (good balance of quality and size)
          const imageUrl = data.photos[0].src.large || data.photos[0].src.medium;
          console.log(`  ✓ Pexels image found for: ${primaryKeyword}`);
          return imageUrl;
        }
      }
    } catch (error) {
      console.log(`  ✗ Pexels API failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Try Unsplash API (requires API key, production-grade)
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
