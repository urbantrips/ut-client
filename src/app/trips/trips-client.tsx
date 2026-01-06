'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { BookingCard } from '@/components/features/trips/booking-card';
import { apiGet, apiPatch } from '@/lib/api-client';
import { getDestinationImage } from '@/lib/destination-utils';
import { LoadingState } from '@/components/features/generate-trip/loading-state';
import { CancelConfirmationModal } from '@/components/features/trips/cancel-confirmation-modal';
import { useUserStore } from '@/store/user-store';

interface TripResponse {
  id: string;
  bookingId: string;
  destination: string;
  departureCity?: string;
  startDate?: string;
  endDate?: string;
  travelerCounts: {
    adults: number;
    children: number;
    infants: number;
  };
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    imageUrl?: string;
  }>;
  status: string;
}

interface BookingCardData {
  id: string;
  tripId: string;
  title: string;
  dates: string;
  travelers: number;
  image?: string;
  status: 'Payment Pending' | 'Confirmed' | 'Upcoming' | 'Cancelled' | string;
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

function transformTripToBooking(trip: TripResponse): BookingCardData {
  const totalTravelers = 
    (trip.travelerCounts?.adults || 0) + 
    (trip.travelerCounts?.children || 0) + 
    (trip.travelerCounts?.infants || 0);

  const imageUrl = 
    trip.itinerary?.[0]?.imageUrl || 
    getDestinationImage(trip.destination) ||
    undefined;

  const title = trip.departureCity 
    ? `${trip.departureCity} to ${trip.destination}`
    : trip.destination;

  return {
    id: trip.bookingId,
    tripId: trip.id,
    title,
    dates: formatDateRange(trip.startDate, trip.endDate),
    travelers: totalTravelers,
    image: imageUrl,
    status: trip.status || 'Confirmed',
  };
}

export function TripsClient() {
  const router = useRouter();
  const [trips, setTrips] = useState<TripResponse[] | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Start as false, will be set to true when actually fetching
  const [error, setError] = useState<Error | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [tripToCancel, setTripToCancel] = useState<BookingCardData | null>(null);
  const accessToken = useUserStore((state) => state.accessToken);

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wait for Zustand persist to hydrate from localStorage (client-side only)
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') {
      return;
    }

    const stored = localStorage.getItem('user-storage');
    if (stored) {
      try {
        JSON.parse(stored);
        const timer = setTimeout(() => {
          setIsHydrated(true);
        }, 100);
        return () => clearTimeout(timer);
      } catch {
        setIsHydrated(true);
      }
    } else {
      setIsHydrated(true);
    }
  }, [isMounted]);

  // Fetch trips - ONLY on client side after mount and hydration
  useEffect(() => {
    // Strict check: must be mounted, in browser, hydrated
    if (!isMounted || typeof window === 'undefined' || !isHydrated) {
      return;
    }

    const fetchTrips = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const data = await apiGet<TripResponse[]>(`${apiUrl}/trips`);
        setTrips(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch trips');
        setError(error);
        
        const errorMessage = error.message.toLowerCase();
        const isAuthError = errorMessage.includes('authentication') || 
                          errorMessage.includes('authorization') ||
                          errorMessage.includes('log in') ||
                          errorMessage.includes('bearer token') ||
                          errorMessage.includes('no authorization header');
        
        if (isAuthError && !accessToken) {
          router.push(`/signin?redirect=${encodeURIComponent('/trips')}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [isMounted, isHydrated, accessToken, router]);

  const cancelTripMutation = useMutation({
    mutationFn: async (tripId: string) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      return apiPatch(`${apiUrl}/trips/${tripId}`, { status: 'Cancelled' });
    },
    onSuccess: async () => {
      // Refetch trips after successful cancellation
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const data = await apiGet<TripResponse[]>(`${apiUrl}/trips`);
        setTrips(data);
      } catch (err) {
        console.error('Failed to refetch trips after cancellation:', err);
      }
      setCancelModalOpen(false);
      setTripToCancel(null);
    },
    onError: (error: Error) => {
      console.error('Failed to cancel trip:', error);
      alert(`Failed to cancel trip: ${error.message}`);
    },
  });

  const filteredBookings = trips?.map(transformTripToBooking) || [];

  const handleBack = () => {
    router.back();
  };

  const handleViewDetails = (booking: BookingCardData) => {
    router.push(`/trips/${booking.tripId}`);
  };

  const handleCancel = (booking: BookingCardData) => {
    setTripToCancel(booking);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (tripToCancel) {
      cancelTripMutation.mutate(tripToCancel.tripId);
    }
  };

  return (
    <div className="min-h-screen">
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
              My Trips
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="px-4 py-4 pb-20">
        {!isMounted || !isHydrated || isLoading ? (
          <LoadingState message="Loading your trips..." />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <p className="text-sm text-red-600 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {error instanceof Error ? error.message : 'Failed to load trips. Please try again later.'}
            </p>
            {error instanceof Error && (
              error.message.toLowerCase().includes('authentication') || 
              error.message.toLowerCase().includes('authorization') ||
              error.message.toLowerCase().includes('log in')
            ) && (
              <button
                onClick={() => router.push(`/signin?redirect=${encodeURIComponent('/trips')}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Sign In
              </button>
            )}
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <BookingCard
                key={`${booking.id}-${index}`}
                id={booking.id}
                title={booking.title}
                dates={booking.dates}
                travelers={booking.travelers}
                image={booking.image}
                status={booking.status}
                index={index}
                onCompleteBooking={() => {
                  console.log('Complete booking for:', booking.id);
                }}
                onCancel={() => handleCancel(booking)}
                onViewDetails={() => handleViewDetails(booking)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm text-gray-600 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              No trips found in this category
            </p>
          </div>
        )}
      </div>

      <CancelConfirmationModal
        isOpen={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setTripToCancel(null);
        }}
        onConfirm={handleConfirmCancel}
        isLoading={cancelTripMutation.isPending}
        tripTitle={tripToCancel?.title}
      />
    </div>
  );
}

