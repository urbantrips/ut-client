'use client';

import { Loader2, Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  isSending: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function ChatInput({
  value,
  isSending,
  onChange,
  onSend,
  onKeyPress,
}: ChatInputProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-20">
      <div className="px-4 py-3">
        <div className="relative flex items-center bg-white border border-blue-200 rounded-2xl focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Tell me what you'd like to change or add..."
            disabled={isSending}
            className="flex-1 bg-transparent border-0 rounded-2xl px-4 py-3 text-sm focus:outline-none disabled:opacity-50 placeholder:text-gray-400 placeholder:italic pr-12"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          />
          <button
            onClick={onSend}
            disabled={!value.trim() || isSending}
            className="absolute right-2 bg-primary-500 p-2 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSending ? (
              <Loader2 className="w-6 h-6 animate-spin text-black" />
            ) : (
              <Send className="w-6 h-6 text-black" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}



