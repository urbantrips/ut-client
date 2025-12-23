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
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="px-5 py-4 bg-white border-t border-yellow-300/30"
        >
          <ul className="space-y-3">
            {day.activities.map((activity, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                <p
                  className="text-sm text-gray-800 leading-relaxed flex-1"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  {activity}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}



