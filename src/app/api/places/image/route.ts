import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy endpoint for Google Places API photos
 * This keeps the API key server-side and avoids CORS issues
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const photoReference = searchParams.get('photo_reference');
    const maxWidth = searchParams.get('maxwidth') || '800';

    if (!photoReference) {
      console.error('[Places Image API] ❌ photo_reference parameter is missing');
      return NextResponse.json(
        { error: 'photo_reference is required' },
        { status: 400 }
      );
    }

    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!googleMapsApiKey) {
      console.error('[Places Image API] ❌ Google Maps API key not configured');
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }
    
    console.log(`[Places Image API] Request received - photo_reference: ${photoReference}, maxWidth: ${maxWidth}`);

    // Fetch the image from Google Places API (New) Media endpoint
    // Photo reference should be in format: places/PHOTO_ID
    // Decode the photo reference in case it was URL encoded
    const decodedPhotoRef = decodeURIComponent(photoReference);
    const photoName = decodedPhotoRef.startsWith('places/') 
      ? decodedPhotoRef 
      : `places/${decodedPhotoRef}`;
    
    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}`;
    
    // Log the actual Google Places API URL (for debugging)
    console.log(`[Places Image API] Fetching image from Google Places API:`);
    console.log(`[Places Image API] Decoded photo reference: ${decodedPhotoRef}`);
    console.log(`[Places Image API] Photo Name: ${photoName}`);
    console.log(`[Places Image API] URL: ${photoUrl}`);
    console.log(`[Places Image API] Note: This URL requires 'X-Goog-Api-Key' header to access`);
    
    const response = await fetch(photoUrl, {
      headers: {
        'X-Goog-Api-Key': googleMapsApiKey,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Places Image API] ❌ Failed to fetch image: ${response.status} ${response.statusText}`);
      console.error(`[Places Image API] Error response:`, errorText);
      console.error(`[Places Image API] Request URL: ${photoUrl}`);
      return NextResponse.json(
        { 
          error: 'Failed to fetch image from Google Places API',
          details: errorText,
          status: response.status
        },
        { status: response.status }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    console.log(`[Places Image API] ✅ Successfully fetched image: ${imageBuffer.byteLength} bytes, Content-Type: ${contentType}`);

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
        'Access-Control-Allow-Origin': '*', // Allow CORS for direct browser access
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error) {
    console.error('[Places Image API] ❌ Error proxying Google Places image:', error);
    console.error('[Places Image API] Error details:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

