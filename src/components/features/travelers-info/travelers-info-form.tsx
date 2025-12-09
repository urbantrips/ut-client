'use client';

import { forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTravelersInfoStore, type TravelStyle, type TravelersInfoFormData } from '@/store/travelers-info-store';

export type { TravelersInfoFormData };

export interface TravelersInfoFormRef {
    handleContinue: () => void;
    getFormData: () => TravelersInfoFormData;
}

interface TravelersInfoFormProps {
    onContinue?: (data: TravelersInfoFormData) => void;
}

export const TravelersInfoForm = forwardRef<TravelersInfoFormRef, TravelersInfoFormProps>(
    ({ onContinue }, ref) => {
    const {
        departureCity,
        travelStyle,
        startDate,
        endDate,
        travelerCounts,
        setDepartureCity,
        setTravelStyle,
        setStartDate,
        setEndDate,
        updateTravelerCount,
        getFormData,
    } = useTravelersInfoStore();

    const travelStyles: TravelStyle[] = ['Couple', 'Friends', 'Family', 'Solo'];

    const handleContinue = () => {
        const formData = getFormData();
        console.log(formData);
        onContinue?.(formData);
    };

    useImperativeHandle(ref, () => ({
        handleContinue,
        getFormData,
    }));

    return (
        <>
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
        </>
    );
    }
);

TravelersInfoForm.displayName = 'TravelersInfoForm';
