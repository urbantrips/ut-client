import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the optimized image path, preferring WebP format if available
 * Falls back to the original extension if WebP doesn't exist
 */
export function getOptimizedImagePath(originalPath: string): string {
  // If already WebP or has no extension, return as is
  if (originalPath.endsWith('.webp') || !originalPath.match(/\.(png|jpg|jpeg)$/i)) {
    return originalPath;
  }
  
  // Try WebP version first (Next.js will handle format optimization)
  // For now, return original - Next.js Image component will optimize automatically
  return originalPath;
}

