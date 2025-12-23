'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Menu } from 'lucide-react';
import { BookingCard } from '@/components/features/booking-card';
import { TripsTabs, type TabType } from '@/components/features/trips-tabs';

export default function TripsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Pending');
  const tabs: TabType[] = ['Pending', 'Upcoming', 'Live', 'Completed'];

  // Mock booking cards data - in real app, this would come from API/store
  const allBookings = [
    {
      id: 'UT2024002',
      title: 'Delhi to Manali Getaway',
      dates: 'June 22 - June 27',
      travelers: 4,
      image: '/assets/destinations/must-visit/manali.png',
      status: 'Payment Pending' as const,
      tab: 'Pending' as TabType
    },
    {
      id: 'UT2024003',
      title: 'Delhi to Manali Getaway',
      dates: 'June 22 - June 27',
      travelers: 4,
      image: '/assets/destinations/must-visit/manali.png',
      status: 'Payment Pending' as const,
      tab: 'Pending' as TabType
    },
    {
      id: 'UT2024004',
      title: 'Delhi to Manali Getaway',
      dates: 'June 22 - June 27',
      travelers: 4,
      image: '/assets/destinations/must-visit/manali.png',
      status: 'Payment Pending' as const,
      tab: 'Pending' as TabType
    },
    {
      id: 'UT2024005',
      title: 'Goa Beach Escape',
      dates: 'July 15 - July 20',
      travelers: 2,
      image: '/assets/destinations/must-visit/goa.png',
      status: 'Confirmed' as const,
      tab: 'Upcoming' as TabType
    },
    {
      id: 'UT2024006',
      title: 'Kerala Backwaters',
      dates: 'August 10 - August 15',
      travelers: 3,
      image: '/assets/destinations/must-visit/kerala.png',
      status: 'Upcoming' as const,
      tab: 'Upcoming' as TabType
    },
    {
      id: 'UT2024007',
      title: 'Rajasthan Heritage Tour',
      dates: 'September 5 - September 10',
      travelers: 2,
      image: '/assets/destinations/must-visit/rajasthan.png',
      status: 'Confirmed' as const,
      tab: 'Live' as TabType
    },
    {
      id: 'UT2024008',
      title: 'Himachal Adventure',
      dates: 'May 10 - May 15',
      travelers: 4,
      image: '/assets/destinations/must-visit/himachal.png',
      status: 'Confirmed' as const,
      tab: 'Completed' as TabType
    }
  ];

  const filteredBookings = allBookings.filter(booking => booking.tab === activeTab);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>
            <h1 className="text-xl font-bold text-black flex-1 text-center" >
              My Trips</h1>
            <button
              className="p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <TripsTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-20 bg-gray-50">
        {filteredBookings.length > 0 ? (
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
                onCancel={() => {
                  // Handle cancel action
                  console.log('Cancel booking for:', booking.id);
                }}
                onViewDetails={() => {
                  // Handle view details action
                  console.log('View details for:', booking.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm text-gray-600 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>No trips found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

