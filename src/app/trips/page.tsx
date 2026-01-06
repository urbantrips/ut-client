'use client';

import { TripsClient } from './trips-client';

// Disable SSR completely for this page
export const dynamic = 'force-dynamic';

export default function TripsPage() {
  return <TripsClient />;
}
