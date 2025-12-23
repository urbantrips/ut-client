'use client';

import { DayCard, DayItinerary } from './day-card';
import { LoadingState } from './loading-state';
import { ErrorState } from './error-state';

interface ItineraryViewProps {
  itinerary: DayItinerary[];
  isLoading: boolean;
  error: string | null;
  selectedDay: number;
  imageErrors: Record<number, boolean>;
  imageLoaded: Record<number, boolean>;
  onSelectDay: (day: number) => void;
  onImageError: (day: number) => void;
  onImageLoad: (day: number) => void;
}

export function ItineraryView({
  itinerary,
  isLoading,
  error,
  selectedDay,
  imageErrors,
  imageLoaded,
  onSelectDay,
  onImageError,
  onImageLoad,
}: ItineraryViewProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (itinerary.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <p
          className="text-gray-500 text-center"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          No itinerary available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {itinerary.map((day, index) => (
        <DayCard
          key={day.day}
          day={day}
          index={index}
          isSelected={selectedDay === day.day}
          imageErrors={imageErrors}
          imageLoaded={imageLoaded}
          onSelect={onSelectDay}
          onImageError={onImageError}
          onImageLoad={onImageLoad}
        />
      ))}
    </div>
  );
}



