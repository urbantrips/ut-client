'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllDestinationsIncludingCombos, getDestinationTag } from '@/data/all-destinations';
import { getTagStyle, filterDestinations } from '@/lib/destination-utils';

export default function SearchDestinationPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Auto-focus search input on mount
    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);

    // Get all unique destinations from all-destinations.ts
    const allDestinations = useMemo(() => {
        const destinationStrings = getAllDestinationsIncludingCombos();
        return destinationStrings.map(title => ({ 
            title,
            tag: getDestinationTag(title)
        }));
    }, []);

    // Filter destinations based on search query
    const filteredDestinations = useMemo(() => {
        return filterDestinations(searchQuery, allDestinations);
    }, [searchQuery, allDestinations]);

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6 sm:p-8 flex flex-col font-sans relative">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
                <Link href="/" className="p-2 -mr-2 text-gray-900 hover:opacity-70 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </Link>
            </div>

            <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className="md:text-4xl text-3xl text-primary-500 mb-2"
                        style={{ fontFamily: 'var(--font-dancing-script), cursive' }}
                    >
                        Ready to explore?
                    </h1>
                    <h2 className="md:text-xl text-lg font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Tell us where you&apos;d love to go!
                    </h2>
                </div>

                {/* Search Input */}
                <div className="w-full mb-10 relative">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search Destination..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 rounded-[30px] border placeholder:italic placeholder:text-sm md:placeholder:text-base border-primary-500 outline-none placeholder-gray-500 text-base font-medium shadow-sm focus:ring-1 focus:ring-primary-500"
                        style={{ borderRadius: '25px', fontFamily: 'var(--font-montserrat), sans-serif' }}
                    />
                </div>

                {/* Destinations List */}
                <div className="w-full space-y-4">
                    {filteredDestinations.map((dest) => {
                        const isSelected = selectedTitle === dest.title;

                        return (
                            <motion.div
                                key={dest.title}
                                onClick={() => setSelectedTitle(dest.title)}
                                className={`
                                    relative flex justify-between items-center px-6 py-4 cursor-pointer transition-all duration-200
                                    ${isSelected
                                        ? 'bg-primary-50 border border-primary-500 rounded-[25px]'
                                        : 'bg-transparent border border-gray-200 hover:border-primary-300 rounded-[20px]'
                                    }
                                `}
                                initial={false}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className={`text-base md:text-lg font-bold ${isSelected ? 'text-black' : 'text-gray-900'}`}>
                                    {dest.title}
                                </span>
                                <div className="flex items-center gap-3">
                                    {dest.tag && (
                                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getTagStyle(dest.tag)}`}>
                                            {dest.tag}
                                        </span>
                                    )}
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 rounded-full bg-primary-500"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center text-gray-500 mt-8 font-medium">
                        No destinations found matching &quot;{searchQuery}&quot;
                    </div>
                )}
            </div>
        </div>
    );
}
