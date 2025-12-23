'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, UtensilsCrossed } from 'lucide-react';
import { DayItinerary } from './day-card';

interface ItineraryUpdateCardProps {
  day: DayItinerary;
  isExpanded: boolean;
  onToggle: (day: number) => void;
}

export function ItineraryUpdateCard({
  day,
  isExpanded,
  onToggle,
}: ItineraryUpdateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => onToggle(day.day)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-yellow-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          {day.title.toLowerCase().includes('food') && (
            <UtensilsCrossed className="w-4 h-4 text-black flex-shrink-0" />
          )}
          <span
            className="font-semibold text-black text-sm"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Day {day.day} - {day.title}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-black flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-black flex-shrink-0" />
        )}
      </button>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4 bg-white"
        >
          <ul className="space-y-2 mt-2">
            {day.activities.map((activity, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-700"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                • {activity}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}



