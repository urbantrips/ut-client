'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full">
      {/* Top border */}
      <div className="h-px bg-gray-300" />
      
      {/* Main header content */}
      <div className="bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            Urbantrips
          </Link>
          
          {/* Navigation links */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/account" 
              className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors"
            >
              <Star className="w-4 h-4 text-gray-400" />
              <span>My Account</span>
            </Link>
            
            <Link 
              href="/trips" 
              className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors"
            >
              <Star className="w-4 h-4 text-gray-400" />
              <span>My Trips</span>
            </Link>
          </nav>
        </div>
      </div>
      
    </header>
  );
}

