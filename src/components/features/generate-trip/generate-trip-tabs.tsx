'use client';

import { MessageCircle, Calendar } from 'lucide-react';

interface GenerateTripTabsProps {
  selectedTab: 'chat' | 'itinerary';
  onTabChange: (tab: 'chat' | 'itinerary') => void;
}

export function GenerateTripTabs({
  selectedTab,
  onTabChange,
}: GenerateTripTabsProps) {
  return (
    <div className="flex gap-4 px-4 pb-3">
      <button
        onClick={() => onTabChange('chat')}
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
        onClick={() => onTabChange('itinerary')}
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
  );
}

