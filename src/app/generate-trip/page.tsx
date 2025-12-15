'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, MessageCircle, Calendar } from 'lucide-react';

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  imageUrl?: string;
}

const mockItinerary: DayItinerary[] = [
  {
    day: 1,
    title: 'Arrival & Exploration',
    activities: [
      'Arrival at Srinagar Airport',
      'Transfer to houseboat',
      'Dal Lake Shikara Ride',
      'Floating gardens & Mughal gardens',
      'Local Market Visit',
      'Lal Chowk & Traditional crafts',
    ],
  },
  {
    day: 2,
    title: 'Arrival & Exploration',
    activities: [
      'Arrival at Srinagar Airport',
      'Transfer to houseboat',
      'Dal Lake Shikara Ride',
      'Floating gardens & Mughal gardens',
      'Local Market Visit',
      'Lal Chowk & Traditional crafts',
    ],
  },
  {
    day: 3,
    title: 'Arrival & Exploration',
    activities: [
      'Arrival at Srinagar Airport',
      'Transfer to houseboat',
      'Dal Lake Shikara Ride',
      'Floating gardens & Mughal gardens',
      'Local Market Visit',
      'Lal Chowk & Traditional crafts',
    ],
  },
];

export default function GenerateTripPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'chat' | 'itinerary'>('itinerary');
  const [selectedDay, setSelectedDay] = useState<number>(2);

  const handleConfirmPlan = () => {
    // Handle plan confirmation
    console.log('Plan confirmed');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="text-black hover:opacity-70 transition-opacity flex items-center"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-black flex-1 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Customize your plan
            </h1>
            <div className="w-6"></div> {/* Spacer to balance the back button */}
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTab('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTab === 'chat'
                  ? 'bg-gray-100 text-black font-semibold'
                  : 'text-gray-600 hover:text-black'
              }`}
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Chat Assist</span>
            </button>
            <button
              onClick={() => setSelectedTab('itinerary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTab === 'itinerary'
                  ? 'bg-gray-100 text-black font-semibold'
                  : 'text-gray-600 hover:text-black'
              }`}
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Itinerary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {selectedTab === 'itinerary' && (
          <div className="space-y-4">
            {mockItinerary.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedDay(day.day)}
                className={`bg-gray-50 rounded-2xl p-4 cursor-pointer transition-all ${
                  selectedDay === day.day ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Day Label */}
                <div className="mb-3">
                  <span className="inline-block bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full text-sm" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Day {day.day}
                  </span>
                </div>

                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image placeholder</span>
                </div>

                {/* Itinerary Details */}
                <div className="space-y-2">
                  <h3 className="font-bold text-black text-base" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {day.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {day.activities.map((activity, idx) => (
                      <li key={idx} className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'chat' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Chat Assist feature coming soon
            </p>
          </div>
        )}
      </div>

      {/* Confirm Button */}
      {selectedTab === 'itinerary' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <motion.button
            onClick={handleConfirmPlan}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-yellow-500 transition-colors"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Confirm this Plan
          </motion.button>
        </div>
      )}
    </div>
  );
}

