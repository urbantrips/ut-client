'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookingCard } from '@/components/features/trips/booking-card';
import { apiGet, apiPatch } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import { getDestinationImage } from '@/lib/destination-utils';
import { env } from '@/lib/env';
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
  tripId: string; // MongoDB ID for navigation
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

  // Get image from itinerary first day, or destination image, or undefined
  const imageUrl = 
    trip.itinerary?.[0]?.imageUrl || 
    getDestinationImage(trip.destination) ||
    undefined;

  // Create title from destination and departure city
  const title = trip.departureCity 
    ? `${trip.departureCity} to ${trip.destination}`
    : trip.destination;

  return {
    id: trip.bookingId,
    tripId: trip.id, // MongoDB ID for API calls and navigation
    title,
    dates: formatDateRange(trip.startDate, trip.endDate),
    travelers: totalTravelers,
    image: imageUrl,
    status: trip.status || 'Confirmed',
  };
}

export default function TripsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [tripToCancel, setTripToCancel] = useState<BookingCardData | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const accessToken = useUserStore((state) => state.accessToken);
  
  const apiUrl = env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
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
  
  const { data: trips, isLoading, error } = useQuery<TripResponse[]>({
    queryKey: queryKeys.trips.all,
    queryFn: async () => {
      return apiGet<TripResponse[]>(`${apiUrl}/trips`);
    },
    retry: 1,
    enabled: isHydrated && !!accessToken, // Only run query after hydration and if we have an access token
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
        router.push(`/signin?redirect=${encodeURIComponent('/trips')}`);
      }
    }
  }, [error, accessToken, router]);

  // Cancel trip mutation
  const cancelTripMutation = useMutation({
    mutationFn: async (tripId: string) => {
      return apiPatch(`${apiUrl}/trips/${tripId}`, { status: 'Cancelled' });
    },
    onSuccess: () => {
      // Invalidate and refetch trips list
      queryClient.invalidateQueries({ queryKey: queryKeys.trips.all });
      setCancelModalOpen(false);
      setTripToCancel(null);
    },
    onError: (error: Error) => {
      console.error('Failed to cancel trip:', error);
      alert(`Failed to cancel trip: ${error.message}`);
    },
  });

  // Transform trips to booking card format
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
            <h1 className="text-xl font-bold text-black flex-1 text-center" >
              My Trips</h1>
            <div className="w-10" /> {/* Spacer to balance the back button */}
          </div>
        </div>

        {/* Tabs */}
        {/* <TripsTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} /> */}
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-20 ">
        {!isHydrated ? (
          <LoadingState message="Loading..." />
        ) : isLoading ? (
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
                  // Handle complete booking action
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

      {/* Cancel Confirmation Modal */}
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

