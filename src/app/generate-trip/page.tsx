'use client';

import { useState, useEffect } from 'react';
import { useTravelersInfoStore } from '@/store/travelers-info-store';
import { GenerateTripHeader } from '@/components/features/generate-trip/generate-trip-header';
import { GenerateTripTabs } from '@/components/features/generate-trip/generate-trip-tabs';
import { ItineraryView } from '@/components/features/generate-trip/itinerary-view';
import { ChatView, ChatMessage } from '@/components/features/generate-trip/chat-view';
import { ChatInput } from '@/components/features/generate-trip/chat-input';
import { ConfirmPlanButton } from '@/components/features/generate-trip/confirm-plan-button';
import { DayItinerary } from '@/components/features/generate-trip/day-card';
import { ConfirmationModal } from '@/components/features/generate-trip/confirmation/confirmation-modal';
import { ConfirmationSuccess } from '@/components/features/generate-trip/confirmation/confirmation-success';

export default function GenerateTripPage() {
  const [selectedTab, setSelectedTab] = useState<'chat' | 'itinerary'>('itinerary');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [itinerary, setItinerary] = useState<DayItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  // Confirmation state
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Get data from store
  const getFormData = useTravelersInfoStore((state) => state.getFormData);
  const getHotelTravelModeData = useTravelersInfoStore((state) => state.getHotelTravelModeData);
  const getTravelStyleActivitiesData = useTravelersInfoStore((state) => state.getTravelStyleActivitiesData);
  const selectedDestination = useTravelersInfoStore((state) => state.selectedDestination);

  useEffect(() => {
    const generateItinerary = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const formData = getFormData();
        const hotelData = getHotelTravelModeData();
        const activitiesData = getTravelStyleActivitiesData();

        // Prepare request payload
        const payload = {
          departureCity: formData.departureCity || 'Not specified',
          travelStyle: formData.travelStyle || 'Couple',
          startDate: formData.startDate?.toISOString() || null,
          endDate: formData.endDate?.toISOString() || null,
          travelerCounts: formData.travelerCounts || { adults: 2, children: 0, infants: 0 },
          hotelCategory: hotelData.hotelCategory || 'Mid',
          preferredTravelMode: hotelData.preferredTravelMode || 'Flight',
          selectedActivities: activitiesData.selectedActivities || [],
          travelStylePreferences: activitiesData.travelStylePreferences || {
            relaxation: 0,
            nightlife: 0,
            heritage: 0,
            adventure: 0,
          },
        };

        // Call API to generate itinerary
        const response = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate itinerary');
        }

        const data = await response.json();

        if (data.itinerary && Array.isArray(data.itinerary)) {
          setItinerary(data.itinerary);
          if (data.itinerary.length > 0) {
            setSelectedDay(data.itinerary[0].day);
            // Initialize chat with welcome message
            setChatMessages([
              {
                id: 'welcome',
                role: 'assistant',
                content: "Hi! I'm your Urbantrips AI assistant. I've created a personalized travel plan for you! 👋",
                timestamp: new Date(),
                itineraryUpdate: data.itinerary,
              },
            ]);
          }
        } else {
          throw new Error('Invalid itinerary format received');
        }
      } catch (err) {
        console.error('Error generating itinerary:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        // Set a fallback itinerary
        setItinerary([
          {
            day: 1,
            title: 'Day 1',
            activities: ['Itinerary generation failed. Please try again.'],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    generateItinerary();
  }, [getFormData, getHotelTravelModeData, getTravelStyleActivitiesData]);

  const handleConfirmPlan = () => {
    setShowConfirmationModal(true);
  };

  const handleFinalConfirm = () => {
    setShowConfirmationModal(false);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <ConfirmationSuccess
        formData={getFormData()}
        destination={selectedDestination}
        durationDays={itinerary.length}
      />
    );
  }

  const toggleDayExpansion = (day: number) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSendingMessage) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsSendingMessage(true);

    try {
      const formData = getFormData();

      const response = await fetch('/api/modify-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentItinerary: itinerary,
          userMessage: userMessage.content,
          travelContext: {
            departureCity: formData.departureCity || 'Not specified',
            travelStyle: formData.travelStyle || 'Couple',
            startDate: formData.startDate?.toISOString() || null,
            endDate: formData.endDate?.toISOString() || null,
            travelerCounts: formData.travelerCounts || { adults: 2, children: 0, infants: 0 },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to modify itinerary');
      }

      const data = await response.json();

      // Update itinerary
      if (data.itinerary && Array.isArray(data.itinerary)) {
        setItinerary(data.itinerary);
      }

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || "I've updated your itinerary!",
        timestamp: new Date(),
        itineraryUpdate: data.itinerary,
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error modifying itinerary:', err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 bg-white z-10">
        <GenerateTripHeader
        />
        <GenerateTripTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {selectedTab === 'itinerary' && (
          <ItineraryView
            itinerary={itinerary}
            isLoading={isLoading}
            error={error}
            selectedDay={selectedDay}
            imageErrors={imageErrors}
            imageLoaded={imageLoaded}
            onSelectDay={setSelectedDay}
            onImageError={(day) => setImageErrors((prev) => ({ ...prev, [day]: true }))}
            onImageLoad={(day) => setImageLoaded((prev) => ({ ...prev, [day]: true }))}
          />
        )}

        {selectedTab === 'chat' && (
          <ChatView
            messages={chatMessages}
            isLoading={isLoading}
            isSendingMessage={isSendingMessage}
            expandedDays={expandedDays}
            onToggleDayExpansion={toggleDayExpansion}
          />
        )}
      </div>

      {/* Chat Input */}
      {selectedTab === 'chat' && !isLoading && itinerary.length > 0 && (
        <ChatInput
          value={inputMessage}
          isSending={isSendingMessage}
          onChange={setInputMessage}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      )}

      {/* Confirm Button for Itinerary Tab */}
      {selectedTab === 'itinerary' && !isLoading && itinerary.length > 0 && (
        <ConfirmPlanButton onConfirm={handleConfirmPlan} />
      )}

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleFinalConfirm}
      />
    </div>
  );
}

