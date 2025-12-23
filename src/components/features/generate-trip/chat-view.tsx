'use client';

import { Loader2 } from 'lucide-react';
import { DayItinerary } from './day-card';
import { ChatMessageBubble } from './chat-message';
import { ItineraryUpdateCard } from './itinerary-update-card';
import { LoadingState } from './loading-state';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  itineraryUpdate?: DayItinerary[];
}

interface ChatViewProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isSendingMessage: boolean;
  expandedDays: Set<number>;
  onToggleDayExpansion: (day: number) => void;
}

export function ChatView({
  messages,
  isLoading,
  isSendingMessage,
  expandedDays,
  onToggleDayExpansion,
}: ChatViewProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-32 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full">
            <p
              className="text-gray-500 text-center"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            >
              Start chatting to customize your plan
            </p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            {/* Message Bubble */}
            <ChatMessageBubble message={message} />

            {/* Itinerary Update Cards */}
            {message.itineraryUpdate && message.itineraryUpdate.length > 0 && (
              <div className="space-y-3">
                {message.itineraryUpdate.map((day) => (
                  <ItineraryUpdateCard
                    key={day.day}
                    day={day}
                    isExpanded={expandedDays.has(day.day)}
                    onToggle={onToggleDayExpansion}
                  />
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
                <span
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Updating your plan...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



