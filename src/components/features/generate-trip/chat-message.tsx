'use client';

import { ChatMessage } from './chat-view';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
  );
}

