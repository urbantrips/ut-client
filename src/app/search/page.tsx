'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { destinationsByCategory } from '@/data/destinations';

export default function SearchDestinationPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTitle, setSelectedTitle] = useState<string>('');

    // Flatten and deduplicate destinations
    const allDestinations = useMemo(() => {
        const unique = new Set<string>();
        const list: { title: string }[] = [];

        Object.values(destinationsByCategory).forEach(categoryDests => {
            categoryDests.forEach(dest => {
                if (!unique.has(dest.title)) {
                    unique.add(dest.title);
                    list.push({ title: dest.title });
                }
            });
        });

        return list.sort((a, b) => a.title.localeCompare(b.title));
    }, []);

    const filteredDestinations = allDestinations.filter(dest =>
        dest.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        type="text"
                        placeholder="Search Destination..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-4 rounded-[20px] border placeholder:italic border-primary-500 outline-none placeholder-gray-500 text-base font-medium shadow-sm focus:ring-1 focus:ring-primary-500"
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
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2 h-2 rounded-full bg-primary-500"
                                    />
                                )}
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
