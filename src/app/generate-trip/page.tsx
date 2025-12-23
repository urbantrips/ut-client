'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeftIcon, MessageCircle, Calendar, Loader2, Send, ChevronDown, ChevronUp, UtensilsCrossed } from 'lucide-react';
import { useTravelersInfoStore } from '@/store/travelers-info-store';

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  imageUrl?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  itineraryUpdate?: DayItinerary[];
}

export default function GenerateTripPage() {
  const router = useRouter();
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

  // Get data from store
  const getFormData = useTravelersInfoStore((state) => state.getFormData);
  const getHotelTravelModeData = useTravelersInfoStore((state) => state.getHotelTravelModeData);
  const getTravelStyleActivitiesData = useTravelersInfoStore((state) => state.getTravelStyleActivitiesData);

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
    // Handle plan confirmation
    console.log('Plan confirmed', itinerary);
  };

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
      const hotelData = getHotelTravelModeData();

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
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div className="px-4 pt-4 pb-3">
          <div className="relative flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="text-black hover:opacity-70 transition-opacity flex items-center z-10"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="absolute left-0 right-0 text-xl font-bold text-black text-center pointer-events-none" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              Customize your plan
            </h1>
            <div className="ml-auto z-10">
              {!isLoading && itinerary.length > 0 ? (
                <motion.button
                  onClick={handleConfirmPlan}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-500 text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-primary-600 transition-colors whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Confirm this Plan
                </motion.button>
              ) : (
                <div className="w-6"></div>
              )}
            </div>
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
          <>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mb-4" />
                <p className="text-gray-600 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Generating your personalized itinerary...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md">
                  <p className="text-red-600 text-center text-sm" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {error}
                  </p>
                </div>
              </div>
            ) : itinerary.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <p className="text-gray-500 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  No itinerary available
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {itinerary.map((day, index) => (
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
                            onError={() => setImageErrors((prev) => ({ ...prev, [day.day]: true }))}
                            onLoad={() => setImageLoaded((prev) => ({ ...prev, [day.day]: true }))}
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
          </>
        )}

        {selectedTab === 'chat' && (
          <div className="flex flex-col h-full">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mb-4" />
                <p className="text-gray-600 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Generating your personalized itinerary...
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pb-32 space-y-4">
                {chatMessages.length === 0 && !isLoading && (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                      Start chatting to customize your plan
                    </p>
                  </div>
                )}
                {chatMessages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    {/* Message Bubble */}
                    <div
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>

                    {/* Itinerary Update Cards */}
                    {message.itineraryUpdate && message.itineraryUpdate.length > 0 && (
                      <div className="space-y-3">
                        {message.itineraryUpdate.map((day) => (
                          <motion.div
                            key={day.day}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-yellow-200 rounded-2xl overflow-hidden"
                          >
                            <button
                              onClick={() => toggleDayExpansion(day.day)}
                              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-yellow-100 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                {day.title.toLowerCase().includes('food') && (
                                  <UtensilsCrossed className="w-4 h-4 text-black flex-shrink-0" />
                                )}
                                <span className="font-semibold text-black text-sm" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                  Day {day.day} - {day.title}
                                </span>
                              </div>
                              {expandedDays.has(day.day) ? (
                                <ChevronUp className="w-4 h-4 text-black flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-black flex-shrink-0" />
                              )}
                            </button>
                            {expandedDays.has(day.day) && (
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
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isSendingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                        <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                          Updating your plan...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Input */}
      {selectedTab === 'chat' && !isLoading && itinerary.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20">
          <div className="px-4 py-3">
            <div className="relative flex items-center bg-white border border-blue-200 rounded-2xl focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me what you'd like to change or add..."
                disabled={isSendingMessage}
                className="flex-1 bg-transparent border-0 rounded-2xl px-4 py-3 text-sm focus:outline-none disabled:opacity-50 placeholder:text-gray-400 placeholder:italic pr-12"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isSendingMessage}
                className="absolute right-2 bg-primary-500 p-2 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSendingMessage ? (
                  <Loader2 className="w-6 h-6 animate-spin text-black" />
                ) : (
                  <Send className="w-6 h-6 text-black" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button for Itinerary Tab - At bottom for better visibility */}
      {selectedTab === 'itinerary' && !isLoading && itinerary.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-10">
          <motion.button
            onClick={handleConfirmPlan}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-primary-500 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-primary-600 transition-colors"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Confirm this Plan
          </motion.button>
        </div>
      )}
    </div>
  );
}

