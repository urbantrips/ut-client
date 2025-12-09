'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date;
  className?: string;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = 'DD/MM/YY',
  dateFormat = 'dd/MM/yy',
  minDate,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'w-full px-6 py-2 rounded-3xl border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm text-left flex items-center justify-between',
            !date && 'text-gray-400 italic',
            className
          )}
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          <span>{date ? format(date, dateFormat) : placeholder}</span>
          <CalendarIcon className="h-4 w-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          disabled={minDate ? (date) => date < minDate : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}

