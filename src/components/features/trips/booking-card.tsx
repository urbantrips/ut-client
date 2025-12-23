'use client';

import { Calendar, Users, Tag } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export interface BookingCardProps {
  id: string;
  title: string;
  dates: string;
  travelers: number;
  image?: string;
  status: 'Payment Pending' | 'Confirmed' | 'Upcoming' | 'Cancelled' | string;
  onCompleteBooking?: () => void;
  onCancel?: () => void;
  onViewDetails?: () => void;
  index?: number;
}

export function BookingCard({
  id,
  title,
  dates,
  travelers,
  image,
  status,
  onCompleteBooking,
  onCancel,
  onViewDetails,
  index = 0,
}: BookingCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Payment Pending':
        return 'bg-red-500 text-white';
      case 'Confirmed':
        return 'bg-green-500 text-white';
      case 'Upcoming':
        return 'bg-blue-500 text-white';
      case 'Cancelled':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPrimaryButtonText = (status: string) => {
    switch (status) {
      case 'Payment Pending':
        return 'Complete Booking';
      default:
        return 'View Details';
    }
  };

  const handlePrimaryAction = () => {
    if (status === 'Payment Pending' && onCompleteBooking) {
      onCompleteBooking();
    } else if (onViewDetails) {
      onViewDetails();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 w-full"
    >
      {/* Top Section - Trip Details */}
      <div className="flex gap-3 mb-3">
        {/* Thumbnail Image */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
          {image && !imageError ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                className={`object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 640px) 80px, 96px"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-primary/30" />
            </div>
          )}
        </div>

        {/* Trip Details */}
        <div className="flex-1 min-w-0">
          {/* Trip Title */}
          <h3 className="text-sm font-bold text-black mb-1.5 leading-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{title}</h3>

          {/* Dates */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
            <span className="text-gray-600" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{dates}</span>
          </div>

          {/* Travelers */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
            <Users className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
            <span className="text-gray-600" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{travelers} Travelers</span>
          </div>

          {/* Booking ID */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Tag className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
            <span className="text-gray-600" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>{id}</span>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-200 my-3" />

      {/* Bottom Section - Status and Actions */}
      <div className="flex flex-col gap-3">

      <div className="flex items-center">
          <span className={`text-xs font-medium px-3 py-1.5 rounded-3xl whitespace-nowrap ${getStatusStyles(status)}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            {status}
          </span>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handlePrimaryAction}
            className="bg-yellow-400 text-black font-semibold w-2/3 py-2.5 px-4 rounded-3xl text-sm hover:bg-yellow-500 transition-colors whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            {getPrimaryButtonText(status)}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2.5 w-1/3 bg-gray-200 text-black font-semibold rounded-3xl text-sm hover:bg-gray-300 transition-colors whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

