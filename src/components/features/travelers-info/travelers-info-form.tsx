'use client';

import { forwardRef, useImperativeHandle, useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DatePicker } from '@/components/ui/date-picker';
import { useTravelersInfoStore, type TravelStyle, type TravelersInfoFormData } from '@/store/travelers-info-store';
import { travelersInfoSchema } from '@/schemas/travelers-info-schema';
import { ZodError } from 'zod';
import { getAllDestinationsIncludingCombos, getDestinationTag } from '@/data/all-destinations';
import { filterDestinations } from '@/lib/destination-utils';

export type { TravelersInfoFormData };

export interface TravelersInfoFormRef {
    handleContinue: () => void;
    getFormData: () => TravelersInfoFormData;
    isValid: () => boolean;
}

interface TravelersInfoFormProps {
    onContinue?: (data: TravelersInfoFormData) => void;
}

interface ValidationErrors {
    departureCity?: string;
    travelStyle?: string;
    startDate?: string;
    endDate?: string;
    travelerCounts?: {
        adults?: string;
        children?: string;
        infants?: string;
    };
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

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [citySearchQuery, setCitySearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const cityInputRef = useRef<HTMLInputElement>(null);

    const travelStyles: TravelStyle[] = ['Couple', 'Friends', 'Family', 'Solo'];

    // Get all destinations (same as search page) - convert to DestinationWithTag format
    const allDestinations = useMemo(() => {
        const destinationStrings = getAllDestinationsIncludingCombos();
        return destinationStrings.map(title => ({ 
            title,
            tag: getDestinationTag(title)
        }));
    }, []);

    // Filter cities based on search query (using same filterDestinations as search page)
    const filteredCities = useMemo(() => {
        if (!citySearchQuery.trim()) {
            return [];
        }
        const filtered = filterDestinations(citySearchQuery, allDestinations);
        return filtered.map(dest => dest.title);
    }, [citySearchQuery, allDestinations]);

    // Update city search query when departureCity changes externally
    useEffect(() => {
        if (departureCity && !citySearchQuery) {
            setCitySearchQuery(departureCity);
            setSelectedCity(departureCity);
        }
    }, [departureCity]);

    const handleCitySelect = (city: string) => {
        setDepartureCity(city);
        setCitySearchQuery(city);
        setSelectedCity(city);
        handleFieldChange('departureCity');
    };

    const handleCityInputChange = (value: string) => {
        setCitySearchQuery(value);
        setDepartureCity(value);
        handleFieldChange('departureCity');
    };

    // Helper function to convert dates
    const convertDate = (date: Date | string | null): Date | null => {
        if (!date) return null;
        if (date instanceof Date) {
            // Check if it's a valid date
            return isNaN(date.getTime()) ? null : date;
        }
        // If it's a string, try to convert it
        const converted = new Date(date);
        return isNaN(converted.getTime()) ? null : converted;
    };

    // Check if form is valid without setting errors (for button state)
    const checkFormValidity = (): boolean => {
        try {
            const formData = getFormData();
            const dataToValidate = {
                ...formData,
                startDate: convertDate(formData.startDate),
                endDate: convertDate(formData.endDate),
            };
            travelersInfoSchema.parse(dataToValidate);
            return true;
        } catch {
            return false;
        }
    };

    const validateForm = (): boolean => {
        try {
            const formData = getFormData();
            const dataToValidate = {
                ...formData,
                startDate: convertDate(formData.startDate),
                endDate: convertDate(formData.endDate),
            };

            travelersInfoSchema.parse(dataToValidate);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors: ValidationErrors = {};
                
                error.errors.forEach((err) => {
                    const path = err.path;
                    if (path.length === 1) {
                        const field = path[0] as keyof ValidationErrors;
                        if (field === 'travelerCounts') {
                            newErrors.travelerCounts = {};
                        } else {
                            (newErrors[field] as string) = err.message;
                        }
                    } else if (path.length === 2 && path[0] === 'travelerCounts') {
                        if (!newErrors.travelerCounts) {
                            newErrors.travelerCounts = {};
                        }
                        const travelerType = path[1] as keyof typeof newErrors.travelerCounts;
                        newErrors.travelerCounts[travelerType] = err.message;
                    }
                });
                
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleContinue = () => {
        if (validateForm()) {
            const formData = getFormData();
            console.log(formData);
            onContinue?.(formData);
        }
    };

    const handleFieldChange = (field: keyof ValidationErrors) => {
        // Clear error when user starts typing/selecting
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleTravelerCountChange = (type: keyof typeof travelerCounts, increment: boolean) => {
        updateTravelerCount(type, increment);
        // Clear error for this traveler type
        if (errors.travelerCounts?.[type]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                if (newErrors.travelerCounts) {
                    const newTravelerCounts = { ...newErrors.travelerCounts };
                    delete newTravelerCounts[type];
                    newErrors.travelerCounts = Object.keys(newTravelerCounts).length > 0 ? newTravelerCounts : undefined;
                }
                return newErrors;
            });
        }
    };

    useImperativeHandle(ref, () => ({
        handleContinue,
        getFormData,
        isValid: checkFormValidity,
    }));

    return (
        <>
            {/* Departure City */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Departure city
                    </label>
                    <div className="mb-4">
                        <input
                            ref={cityInputRef}
                            type="text"
                            placeholder="Search your departure city"
                            value={citySearchQuery}
                            onChange={(e) => handleCityInputChange(e.target.value)}
                            className={`w-full px-6 py-2 rounded-3xl border outline-none focus:ring-1 transition-all text-sm italic placeholder:text-gray-400 bg-white text-black ${
                                errors.departureCity
                                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                                    : 'border-gray-300 focus:border-yellow-400 focus:ring-yellow-400'
                            }`}
                            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                        />
                    </div>
                    
                    {/* Cities List - Same style as search destination */}
                    {citySearchQuery.trim() && (
                        <div className="w-full space-y-4 max-h-60 overflow-y-auto">
                            {filteredCities.length > 0 ? (
                                filteredCities.map((city) => {
                                    const isSelected = selectedCity === city;
                                    return (
                                        <motion.div
                                            key={city}
                                            onClick={() => handleCitySelect(city)}
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
                                            <span className={`text-sm md:text-base font-bold ${isSelected ? 'text-black' : 'text-gray-900'}`}>
                                                {city}
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
                                })
                            ) : (
                                <div className="text-center text-gray-500 py-4 font-medium">
                                    No cities found matching &quot;{citySearchQuery}&quot;
                                </div>
                            )}
                        </div>
                    )}
                    {errors.departureCity && (
                        <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            {errors.departureCity}
                        </p>
                    )}
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
                                type="button"
                                onClick={() => {
                                    setTravelStyle(style);
                                    handleFieldChange('travelStyle');
                                }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                  px-4 py-2 rounded-3xl font-semibold text-sm transition-all border
                  ${travelStyle === style
                                        ? 'border-yellow-400 text-black bg-white shadow-sm ring-1 ring-yellow-400'
                                        : 'border-gray-200 text-black bg-white hover:border-gray-300'
                                    }
                  ${errors.travelStyle ? 'border-red-400' : ''}
                `}
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                {style}
                            </motion.button>
                        ))}
                    </div>
                    {errors.travelStyle && (
                        <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            {errors.travelStyle}
                        </p>
                    )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            Start Date
                        </label>
                        <DatePicker
                            date={startDate || undefined}
                            onSelect={(date) => {
                                setStartDate(date || null);
                                handleFieldChange('startDate');
                            }}
                            placeholder="DD/MM/YY"
                            dateFormat="dd/MM/yy"
                        />
                        {errors.startDate && (
                            <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                {errors.startDate}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            End Date
                        </label>
                        <DatePicker
                            date={endDate || undefined}
                            onSelect={(date) => {
                                setEndDate(date || null);
                                handleFieldChange('endDate');
                            }}
                            placeholder="DD/MM/YY"
                            dateFormat="dd/MM/yy"
                            minDate={startDate || undefined}
                        />
                        {errors.endDate && (
                            <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                {errors.endDate}
                            </p>
                        )}
                    </div>
                </div>

                {/* Number of Travelers */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Number of Travelers
                    </label>
                    <div className={`border rounded-[20px] p-5 space-y-6 ${
                        errors.travelerCounts ? 'border-red-400' : 'border-gray-300'
                    }`}>
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                Adults
                            </span>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleTravelerCountChange('adults', false)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">-</span>
                                </button>
                                <span className="text-sm font-bold text-black w-4 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                    {travelerCounts.adults}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleTravelerCountChange('adults', true)}
                                    className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">+</span>
                                </button>
                            </div>
                        </div>
                        {errors.travelerCounts?.adults && (
                            <p className="text-xs text-red-500 -mt-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                {errors.travelerCounts.adults}
                            </p>
                        )}

                        {/* Children */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                Children
                            </span>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleTravelerCountChange('children', false)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">-</span>
                                </button>
                                <span className="text-sm font-bold text-black w-4 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                    {travelerCounts.children}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleTravelerCountChange('children', true)}
                                    className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">+</span>
                                </button>
                            </div>
                        </div>
                        {errors.travelerCounts?.children && (
                            <p className="text-xs text-red-500 -mt-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                {errors.travelerCounts.children}
                            </p>
                        )}

                        {/* Infants */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                Infants
                            </span>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleTravelerCountChange('infants', false)}
                                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">-</span>
                                </button>
                                <span className="text-sm font-bold text-black w-4 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                    {travelerCounts.infants}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleTravelerCountChange('infants', true)}
                                    className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-500 transition-colors"
                                >
                                    <span className="text-lg leading-none mb-0.5">+</span>
                                </button>
                            </div>
                        </div>
                        {errors.travelerCounts?.infants && (
                            <p className="text-xs text-red-500 -mt-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                {errors.travelerCounts.infants}
                            </p>
                        )}
                    </div>
                </div>
        </>
    );
    }
);

TravelersInfoForm.displayName = 'TravelersInfoForm';
