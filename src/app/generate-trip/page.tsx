'use client';

import { useState, useEffect } from 'react';
import { useTravelersInfoStore } from '@/store/travelers-info-store';
import { useUserStore } from '@/store/user-store';
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
  const [isSavingTrip, setIsSavingTrip] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Get user store for access token
  const accessToken = useUserStore((state) => state.accessToken);

  // Get data from store - using direct state access to ensure reactivity
  const formData = useTravelersInfoStore((state) => ({
    departureCity: state.departureCity,
    travelStyle: state.travelStyle,
    startDate: state.startDate,
    endDate: state.endDate,
    travelerCounts: state.travelerCounts,
  }));
  const hotelData = useTravelersInfoStore((state) => ({
    hotelCategory: state.hotelCategory,
    roomType: state.roomType,
    preferredTravelMode: state.preferredTravelMode,
    needReturnTicket: state.needReturnTicket,
  }));
  const activitiesData = useTravelersInfoStore((state) => ({
    travelStylePreferences: state.travelStylePreferences,
    selectedActivities: state.selectedActivities,
  }));
  const selectedDestination = useTravelersInfoStore((state) => state.selectedDestination);

  useEffect(() => {
    const generateItinerary = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Prepare request payload with all data including destination
        const payload = {
          departureCity: formData.departureCity || 'Not specified',
          destination: selectedDestination || undefined,
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
  }, [
    formData.departureCity,
    formData.travelStyle,
    formData.startDate,
    formData.endDate,
    formData.travelerCounts,
    hotelData.hotelCategory,
    hotelData.preferredTravelMode,
    activitiesData.selectedActivities,
    activitiesData.travelStylePreferences,
    selectedDestination,
  ]);

  const handleConfirmPlan = () => {
    setShowConfirmationModal(true);
  };

  const handleFinalConfirm = async () => {
    if (!accessToken) {
      setSaveError('You must be logged in to confirm a trip. Please log in and try again.');
      setShowConfirmationModal(false);
      return;
    }

    setIsSavingTrip(true);
    setSaveError(null);
    setShowConfirmationModal(false);

    try {
      // Prepare trip data
      const tripData = {
        destination: selectedDestination || 'Not specified',
        departureCity: formData.departureCity || undefined,
        travelStyle: formData.travelStyle || undefined,
        startDate: formData.startDate?.toISOString() || undefined,
        endDate: formData.endDate?.toISOString() || undefined,
        travelerCounts: formData.travelerCounts || { adults: 2, children: 0, infants: 0 },
        hotelCategory: hotelData.hotelCategory || undefined,
        roomType: hotelData.roomType || undefined,
        preferredTravelMode: hotelData.preferredTravelMode || undefined,
        needReturnTicket: hotelData.needReturnTicket ?? false,
        selectedActivities: activitiesData.selectedActivities || [],
        travelStylePreferences: activitiesData.travelStylePreferences || {
          relaxation: 0,
          nightlife: 0,
          heritage: 0,
          adventure: 0,
        },
        itinerary: itinerary.map((day) => ({
          day: day.day,
          title: day.title,
          activities: day.activities,
          imageUrl: day.imageUrl,
          imageKeywords: day.imageKeywords,
        })),
        chatHistory: chatMessages.map((msg) => {
          const chatMsg: any = {
            id: msg.id,
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString(),
          };
          // Only include itineraryUpdate if it exists, is not null/undefined, and is an object
          if (msg.itineraryUpdate && typeof msg.itineraryUpdate === 'object' && !Array.isArray(msg.itineraryUpdate)) {
            chatMsg.itineraryUpdate = msg.itineraryUpdate;
          }
          return chatMsg;
        }),
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save trip');
      }

      // Trip saved successfully
      setIsConfirmed(true);
    } catch (err) {
      console.error('Error saving trip:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to save trip. Please try again.');
      // Don't set isConfirmed to true on error - let user retry
    } finally {
      setIsSavingTrip(false);
    }
  };

  if (isConfirmed) {
    return (
      <ConfirmationSuccess
        formData={formData}
        destination={selectedDestination}
        durationDays={itinerary.length}
        itinerary={itinerary}
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
            destination: selectedDestination || undefined,
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
        onClose={() => {
          setShowConfirmationModal(false);
          setSaveError(null);
        }}
        onConfirm={handleFinalConfirm}
        isLoading={isSavingTrip}
      />

      {/* Error Display */}
      {saveError && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{saveError}</p>
            </div>
            <button
              onClick={() => setSaveError(null)}
              className="flex-shrink-0 text-red-600 hover:text-red-800"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

