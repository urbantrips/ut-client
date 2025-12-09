'use client';

import { forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { useTravelersInfoStore, type HotelCategory, type TravelMode, type RoomType, type HotelTravelModeFormData } from '@/store/travelers-info-store';
import { ChevronDown, Plane, Train, Bus, Car } from 'lucide-react';

export type { HotelTravelModeFormData };

export interface HotelTravelModeFormRef {
    handleContinue: () => void;
    getFormData: () => HotelTravelModeFormData;
}

interface HotelTravelModeFormProps {
    onContinue?: (data: HotelTravelModeFormData) => void;
}

export const HotelTravelModeForm = forwardRef<HotelTravelModeFormRef, HotelTravelModeFormProps>(
    ({ onContinue }, ref) => {
    const {
        hotelCategory,
        roomType,
        preferredTravelMode,
        needReturnTicket,
        setHotelCategory,
        setRoomType,
        setPreferredTravelMode,
        setNeedReturnTicket,
        getHotelTravelModeData,
    } = useTravelersInfoStore();

    const hotelCategories: HotelCategory[] = ['Budget', 'Mid', 'Luxury'];
    const roomTypes: RoomType[] = ['Single Room', 'Double Room', 'Twin Room', 'Suite', 'Family Room'];
    const travelModes: TravelMode[] = ['Flight', 'Train', 'Bus', 'Self-drive'];
    
    const travelModeIcons = {
        'Flight': Plane,
        'Train': Train,
        'Bus': Bus,
        'Self-drive': Car,
    };

    const handleContinue = () => {
        const formData = getHotelTravelModeData();
        console.log(formData);
        onContinue?.(formData);
    };

    useImperativeHandle(ref, () => ({
        handleContinue,
        getFormData: getHotelTravelModeData,
    }));

    return (
        <>
            {/* Hotel Category */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Hotel Category
                </label>
                <div className="flex border border-gray-200 rounded-[30px] overflow-hidden bg-white p-1">
                    {hotelCategories.map((category) => {
                        const isSelected = hotelCategory === category;
                        
                        return (
                            <motion.button
                                key={category}
                                onClick={() => setHotelCategory(category)}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    flex-1 px-4 py-3.5 font-semibold text-sm transition-all relative
                                    ${isSelected ? 'rounded-[26px]' : ''}
                                    ${isSelected
                                        ? 'text-black bg-yellow-400'
                                        : 'text-gray-400 bg-white hover:text-gray-600'
                                    }
                                `}
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                {category}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Room Type */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Room Type
                </label>
                <div className="relative">
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value as RoomType)}
                        className="w-full px-6 py-3.5 rounded-[30px] border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm appearance-none bg-white pr-10"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Preferred Travel Mode */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Preferred Travel Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {travelModes.map((mode) => {
                        const Icon = travelModeIcons[mode];
                        return (
                            <motion.button
                                key={mode}
                                onClick={() => setPreferredTravelMode(mode)}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-3xl font-semibold text-sm transition-all border min-h-[100px]
                                    ${preferredTravelMode === mode
                                        ? 'border-yellow-400 text-black bg-white shadow-sm ring-1 ring-yellow-400'
                                        : 'border-gray-200 text-black bg-white hover:border-gray-300'
                                    }
                                `}
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                <Icon className="w-8 h-8" />
                                <span>{mode}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Need Return Ticket */}
            <div className="mb-8">
                <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Need Return Ticket?
                </label>
                <div className="flex gap-2">
                    {(['Yes', 'No'] as const).map((option) => {
                        const value = option === 'Yes';
                        return (
                            <motion.button
                                key={option}
                                onClick={() => setNeedReturnTicket(value)}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    flex-1 px-4 py-3.5 rounded-[30px] font-semibold text-sm transition-all border
                                    ${needReturnTicket === value
                                        ? 'border-yellow-400 text-black bg-yellow-400 shadow-sm'
                                        : 'border-gray-200 text-black bg-white hover:border-gray-300'
                                    }
                                `}
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                {option}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </>
    );
});

HotelTravelModeForm.displayName = 'HotelTravelModeForm';

