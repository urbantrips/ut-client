'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import { env } from '@/lib/env';
import { LoadingState } from '@/components/features/generate-trip/loading-state';
import { ItineraryView } from '@/components/features/generate-trip/itinerary-view';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/user-store';

interface TripResponse {
  id: string;
  bookingId: string;
  destination: string;
  departureCity?: string;
  startDate?: string;
  endDate?: string;
  travelStyle?: string;
  travelerCounts: {
    adults: number;
    children: number;
    infants: number;
  };
  hotelCategory?: string;
  roomType?: string;
  preferredTravelMode?: string;
  selectedActivities: string[];
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    imageUrl?: string;
  }>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate || !endDate) {
    return 'Dates TBD';
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const endDay = end.getDate();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  } catch {
    return 'Dates TBD';
  }
}

export default function TripDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = params?.id as string;
  const [isHydrated, setIsHydrated] = useState(false);
  const accessToken = useUserStore((state) => state.accessToken);
  
  const apiUrl = env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  
  // Wait for Zustand persist to hydrate from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if localStorage has user data
      const stored = localStorage.getItem('user-storage');
      if (stored) {
        try {
          JSON.parse(stored);
          // Wait a bit for Zustand to hydrate
          const timer = setTimeout(() => {
            setIsHydrated(true);
          }, 100);
          return () => clearTimeout(timer);
        } catch {
          setIsHydrated(true);
        }
      } else {
        // No stored data, proceed immediately
        setIsHydrated(true);
      }
    } else {
      setIsHydrated(true);
    }
  }, []);
  
  const { data: trip, isLoading, error } = useQuery<TripResponse>({
    queryKey: queryKeys.trips.detail(tripId),
    queryFn: async () => {
      return apiGet<TripResponse>(`${apiUrl}/trips/${tripId}`);
    },
    enabled: isHydrated && !!tripId, // Only run query after hydration - let API client handle token retrieval
    retry: 1,
  });

  // Redirect to login if authentication error occurs
  useEffect(() => {
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      const isAuthError = errorMessage.includes('authentication') || 
                        errorMessage.includes('authorization') ||
                        errorMessage.includes('log in') ||
                        errorMessage.includes('bearer token');
      
      if (isAuthError && !accessToken) {
        // Redirect to signin page with return URL
        router.push(`/signin?redirect=${encodeURIComponent(`/trips/${tripId}`)}`);
      }
    }
  }, [error, accessToken, router, tripId]);

  const handleBack = () => {
    router.back();
  };

  const totalTravelers = trip
    ? (trip.travelerCounts?.adults || 0) + 
      (trip.travelerCounts?.children || 0) + 
      (trip.travelerCounts?.infants || 0)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>
            <h1 className="text-xl font-bold text-black flex-1 text-center">
              Trip Details
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-20">
        {!isHydrated ? (
          <LoadingState message="Loading..." />
        ) : isLoading ? (
          <LoadingState message="Loading trip details..." />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <p className="text-sm text-red-600 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {error instanceof Error ? error.message : 'Failed to load trip details. Please try again later.'}
            </p>
            {error instanceof Error && (
              error.message.toLowerCase().includes('authentication') || 
              error.message.toLowerCase().includes('authorization') ||
              error.message.toLowerCase().includes('log in')
            ) && (
              <button
                onClick={() => router.push(`/signin?redirect=${encodeURIComponent(`/trips/${tripId}`)}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Sign In
              </button>
            )}
          </div>
        ) : trip ? (
          <div className="space-y-6">
            {/* Trip Info Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                {trip.departureCity ? `${trip.departureCity} to ${trip.destination}` : trip.destination}
              </h2>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Booking ID:</span>
                  <span className="font-medium" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{trip.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Dates:</span>
                  <span className="font-medium" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {formatDateRange(trip.startDate, trip.endDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Travelers:</span>
                  <span className="font-medium" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {totalTravelers} {totalTravelers === 1 ? 'person' : 'people'}
                  </span>
                </div>
                {trip.travelStyle && (
                  <div className="flex justify-between">
                    <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Travel Style:</span>
                    <span className="font-medium" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{trip.travelStyle}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Status:</span>
                  <span className={`font-medium px-2 py-1 rounded ${
                    trip.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    trip.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    trip.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {trip.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Itinerary Section */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Itinerary
              </h3>
              <ItineraryView
                itinerary={trip.itinerary || []}
                isLoading={false}
                error={null}
                selectedDay={selectedDay}
                imageErrors={imageErrors}
                imageLoaded={imageLoaded}
                onSelectDay={setSelectedDay}
                onImageError={(day) => setImageErrors((prev) => ({ ...prev, [day]: true }))}
                onImageLoad={(day) => setImageLoaded((prev) => ({ ...prev, [day]: true }))}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm text-gray-600 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Trip not found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

