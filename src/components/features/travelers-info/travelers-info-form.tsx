'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type TravelStyle = 'Couple' | 'Friends' | 'Family' | 'Solo';

interface TravelerCounts {
    adults: number;
    children: number;
    infants: number;
}

export function TravelersInfoForm() {
    const [departureCity, setDepartureCity] = useState('');
    const [travelStyle, setTravelStyle] = useState<TravelStyle>('Couple');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [travelerCounts, setTravelerCounts] = useState<TravelerCounts>({
        adults: 2,
        children: 1,
        infants: 0,
    });

    const travelStyles: TravelStyle[] = ['Couple', 'Friends', 'Family', 'Solo'];

    const updateTravelerCount = (type: keyof TravelerCounts, increment: boolean) => {
        setTravelerCounts(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
        }));
    };

    const handleContinue = () => {
        // TODO: Navigate to next step or save data
        console.log({
            departureCity,
            travelStyle,
            startDate,
            endDate,
            travelerCounts
        });
    };

    return (
        <div className="min-h-screen bg-white sm:bg-[#FFFBF0] flex items-center justify-center sm:p-6 font-sans">
            <style jsx global>{`
                .react-datepicker-wrapper {
                    width: 100%;
                }
                .react-datepicker__input-container {
                    width: 100%;
                }
                .custom-datepicker {
                    width: 100%;
                    padding: 0.875rem 1.5rem;
                    border-radius: 30px;
                    border: 1px solid #e5e7eb;
                    outline: none;
                    transition: all 0.2s;
                    font-size: 0.875rem;
                    color: #6b7280;
                    font-family: var(--font-montserrat), sans-serif;
                }
                .custom-datepicker:focus {
                    border-color: #facc15;
                    box-shadow: 0 0 0 1px #facc15;
                }
            `}</style>
            <div className="w-full max-w-[500px] bg-white sm:rounded-[30px] sm:shadow-sm sm:border border-gray-100 p-6 relative min-h-screen sm:min-h-0">
                {/* Back Button */}
                <Link href="/" className="absolute top-6 left-6 text-black hover:opacity-70 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>

                {/* Header */}
                <div className="mb-8 mt-12 sm:mt-2">
                    <h1 className="text-xl font-bold text-center text-black mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Travelers Info
                    </h1>

                    {/* Progress Bars */}
                    <div className="flex gap-2 px-2">
                        <div className="h-1 flex-1 bg-yellow-400 rounded-full"></div>
                        <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                        <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                    </div>
                </div>

                {/* Departure City */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Departure city
                    </label>
                    <input
                        type="text"
                        placeholder="Search your departure city"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        className="w-full px-6 py-3.5 rounded-[30px] border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm italic placeholder:text-gray-400"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    />
                </div>

                {/* Travel Style */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Travel Style
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {travelStyles.map((style) => (
                            <motion.button
                                key={style}
                                onClick={() => setTravelStyle(style)}
                                whileTap={{ scale: 0.98 }}
                                className={`
                  px-4 py-3.5 rounded-[30px] font-semibold text-sm transition-all border
                  ${travelStyle === style
                                        ? 'border-yellow-400 text-black bg-white shadow-sm ring-1 ring-yellow-400'
                                        : 'border-gray-200 text-black bg-white hover:border-gray-300'
                                    }
                `}
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                {style}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            Start Date
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="DD/MM/YY"
                            dateFormat="dd/MM/yy"
                            className="custom-datepicker"
                            wrapperClassName="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            End Date
                        </label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="DD/MM/YY"
                            dateFormat="dd/MM/yy"
                            minDate={startDate || undefined}
                            className="custom-datepicker"
                            wrapperClassName="w-full"
                        />
                    </div>
                </div>

                {/* Number of Travelers */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Number of Travelers
                    </label>
                    <div className="border border-gray-300 rounded-[20px] p-5 space-y-6">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                Adults
                            </span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateTravelerCount('adults', false)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">-</span>
                                </button>
                                <span className="text-sm font-bold text-black w-4 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                    {travelerCounts.adults}
                                </span>
                                <button
                                    onClick={() => updateTravelerCount('adults', true)}
                                    className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">+</span>
                                </button>
                            </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                Children
                            </span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateTravelerCount('children', false)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">-</span>
                                </button>
                                <span className="text-sm font-bold text-black w-4 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                    {travelerCounts.children}
                                </span>
                                <button
                                    onClick={() => updateTravelerCount('children', true)}
                                    className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">+</span>
                                </button>
                            </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                Infants
                            </span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateTravelerCount('infants', false)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">-</span>
                                </button>
                                <span className="text-sm font-bold text-black w-4 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                    {travelerCounts.infants}
                                </span>
                                <button
                                    onClick={() => updateTravelerCount('infants', true)}
                                    className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">+</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <motion.button
                    onClick={handleContinue}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-yellow-400 text-black font-bold py-4 rounded-[30px] shadow-none hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                    Continue
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 10h10m-4-4l4 4-4 4" />
                    </svg>
                </motion.button>
            </div>
        </div>
    );
}
