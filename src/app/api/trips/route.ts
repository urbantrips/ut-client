import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function GET() {
  try {
    console.log('[API Route /api/trips] Request received');
    
    // Get access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    console.log('[API Route /api/trips] Token check:', {
      hasToken: !!accessToken,
      tokenLength: accessToken?.length || 0,
    });

    if (!accessToken) {
      console.warn('[API Route /api/trips] No access token found in cookies');
      return NextResponse.json(
        { error: 'No access token found. Please sign in.' },
        { status: 401 }
      );
    }

    // Fetch trips from backend API
    console.log('[API Route /api/trips] Fetching from backend:', `${API_URL}/trips`);
    const response = await fetch(`${API_URL}/trips`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    console.log('[API Route /api/trips] Backend response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[API Route /api/trips] Backend error:', errorData);
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch trips' },
        { status: response.status }
      );
    }

    const trips = await response.json();
    console.log('[API Route /api/trips] Successfully fetched trips:', trips?.length || 0);
    return NextResponse.json(trips);
  } catch (error) {
    console.error('[API Route /api/trips] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

