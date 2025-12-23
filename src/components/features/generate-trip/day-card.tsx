'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  imageUrl?: string;
}

interface DayCardProps {
  day: DayItinerary;
  index: number;
  isSelected: boolean;
  imageErrors: Record<number, boolean>;
  imageLoaded: Record<number, boolean>;
  onSelect: (day: number) => void;
  onImageError: (day: number) => void;
  onImageLoad: (day: number) => void;
}

export function DayCard({
  day,
  index,
  isSelected,
  imageErrors,
  imageLoaded,
  onSelect,
  onImageError,
  onImageLoad,
}: DayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onSelect(day.day)}
      className={`bg-gray-50 rounded-2xl p-4 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {/* Day Label */}
      <div className="mb-3">
        <span
          className="inline-block bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full text-sm"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Day {day.day}
        </span>
      </div>

      {/* Image */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
        {day.imageUrl && !imageErrors[day.day] ? (
          <>
            <Image
              src={day.imageUrl}
              alt={day.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded[day.day] ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, 800px"
              onError={() => onImageError(day.day)}
              onLoad={() => onImageLoad(day.day)}
              unoptimized
            />
            {!imageLoaded[day.day] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image not available</span>
          </div>
        )}
      </div>

      {/* Itinerary Details */}
      <div className="space-y-2">
        <h3
          className="font-bold text-black text-base"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          {day.title}
        </h3>
        <ul className="space-y-1.5">
          {day.activities.map((activity, idx) => (
            <li
              key={idx}
              className="text-sm text-gray-700"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}



