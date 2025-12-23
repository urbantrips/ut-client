'use client';

export type TabType = string;

interface TripsTabsProps {
  tabs: TabType[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TripsTabs({ tabs, activeTab, onTabChange }: TripsTabsProps) {

  return (
    <div className="px-4 pb-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === tab
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

