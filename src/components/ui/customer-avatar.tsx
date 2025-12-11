'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CustomerAvatarProps {
  name: string;
  image: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function CustomerAvatar({
  name,
  image,
  size = 'medium',
  className = ''
}: CustomerAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const firstLetter = name.charAt(0).toUpperCase();

  const sizeClasses = {
    small: 'w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[6px] sm:text-[10px] md:text-xs',
    medium: 'w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-sm md:text-lg',
    large: 'w-12 h-12 md:w-16 md:h-16 text-lg md:text-xl',
  };

  const getAvatarColor = (letter: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-green-500',
      'bg-red-500',
    ];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (imageError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full border border-white sm:border-2 shadow-sm flex items-center justify-center flex-shrink-0 ${getAvatarColor(firstLetter)} text-white font-semibold ${className}`}
      >
        {firstLetter}
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border border-white sm:border-2 shadow-sm overflow-hidden relative flex-shrink-0 ${className}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        quality={85}
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

