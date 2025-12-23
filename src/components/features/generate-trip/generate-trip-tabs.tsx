'use client';

import { BotMessageSquare, ListTodo } from 'lucide-react';

interface GenerateTripTabsProps {
    selectedTab: 'chat' | 'itinerary';
    onTabChange: (tab: 'chat' | 'itinerary') => void;
}

export function GenerateTripTabs({
    selectedTab,
    onTabChange,
}: GenerateTripTabsProps) {
    return (
        <div className="flex gap-2 sm:gap-4 px-2 sm:px-4 pb-3 ">
            <button
                onClick={() => onTabChange('chat')}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-t-lg transition-colors relative flex-1 ${selectedTab === 'chat'
                        ? 'text-primary font-semibold border-b-2 border-primary -mb-[3px] rounded-b-none'
                        : 'text-gray-600 hover:text-black'
                    }`}
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
                <BotMessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Chat Assist</span>
            </button>
            <button
                onClick={() => onTabChange('itinerary')}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-t-lg transition-colors relative flex-1 ${selectedTab === 'itinerary'
                        ? 'text-primary font-semibold border-b-2 border-primary -mb-[3px] rounded-b-none'
                        : 'text-gray-600 hover:text-black'
                    }`}
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
                <ListTodo className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Itinerary</span>
            </button>
        </div>
    );
}

