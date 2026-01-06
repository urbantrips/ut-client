import { getQueryClient } from '@/lib/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { queryKeys } from '@/lib/query-keys';
import { TripsClient } from './trips-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getTrips() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  console.log('[TripsPage Server] Fetching trips:', {
    hasToken: !!accessToken,
    apiUrl: `${API_URL}/trips`,
  });

  if (!accessToken) {
    console.warn('[TripsPage Server] No access token found in cookies');
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/trips`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log('[TripsPage Server] Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[TripsPage Server] Failed to fetch trips:', errorData);
      return null;
    }

    const trips = await response.json();
    console.log('[TripsPage Server] Successfully fetched trips:', trips?.length || 0);
    return trips;
  } catch (error) {
    console.error('[TripsPage Server] Error fetching trips:', error);
    return null;
  }
}

export default async function TripsPage() {
  const queryClient = getQueryClient();

  // Prefetch trips on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.trips.all,
    queryFn: getTrips,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TripsClient />
    </HydrationBoundary>
  );
}
