'use client';

import { forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { useTravelersInfoStore, type TravelStyleActivitiesFormData } from '@/store/travelers-info-store';
import { Utensils, Theater, ShoppingBag, Heart, Camera, Music } from 'lucide-react';

export type { TravelStyleActivitiesFormData };

export interface TravelStyleActivitiesFormRef {
    handleContinue: () => void;
    getFormData: () => TravelStyleActivitiesFormData;
}

interface TravelStyleActivitiesFormProps {
    onContinue?: (data: TravelStyleActivitiesFormData) => void;
}

type TravelStyleType = 'relaxation' | 'nightlife' | 'heritage' | 'adventure';

interface TravelStyleConfig {
    label: string;
    emoji: string;
    key: TravelStyleType;
}

const travelStyles: TravelStyleConfig[] = [
    { label: 'Relaxation', emoji: '🧘', key: 'relaxation' },
    { label: 'Nightlife', emoji: '🌃', key: 'nightlife' },
    { label: 'Heritage & Culture', emoji: '🏰', key: 'heritage' },
    { label: 'Adventure', emoji: '🧗', key: 'adventure' },
];

const activities = [
    { label: 'Local Cuisine', icon: Utensils },
    { label: 'Cultural Shows', icon: Theater },
    { label: 'Shopping', icon: ShoppingBag },
    { label: 'Spa & Wellness', icon: Heart },
    { label: 'Photography', icon: Camera },
    { label: 'Clubs & Parties', icon: Music },
];

export const TravelStyleActivitiesForm = forwardRef<TravelStyleActivitiesFormRef, TravelStyleActivitiesFormProps>(
    ({ onContinue }, ref) => {
    const {
        travelStylePreferences,
        selectedActivities,
        setTravelStylePreference,
        toggleActivity,
        getTravelStyleActivitiesData,
    } = useTravelersInfoStore();

    const handleContinue = () => {
        const formData = getTravelStyleActivitiesData();
        console.log(formData);
        onContinue?.(formData);
    };

    useImperativeHandle(ref, () => ({
        handleContinue,
        getFormData: getTravelStyleActivitiesData,
    }));

    const handleSliderChange = (key: TravelStyleType, value: number) => {
        setTravelStylePreference(key, value);
    };

    return (
        <>
            {/* Travel Style Section */}
            <div className="mb-8">
    
                <div className="space-y-5">
                    {travelStyles.map((style) => {
                        const value = travelStylePreferences[style.key] || 0;
                        
                        return (
                            <div key={style.key} className="flex items-center gap-4">
                                <div className="flex-shrink-0 text-2xl">
                                    {style.emoji}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-semibold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                            {style.label}
                                        </span>
                                        {/* <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                            {value}%
                                        </span> */}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={value}
                                            onChange={(e) => handleSliderChange(style.key, parseInt(e.target.value))}
                                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #FACC15 0%, #FACC15 ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Activities Section */}
            <div className="mb-8">
                <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Activities (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {activities.map((activity) => {
                        const Icon = activity.icon;
                        const isSelected = selectedActivities.includes(activity.label);
                        
                        return (
                            <motion.button
                                key={activity.label}
                                onClick={() => toggleActivity(activity.label)}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    flex items-center justify-center gap-2 px-4 py-2 rounded-2xl font-semibold text-sm transition-all border
                                    ${isSelected
                                        ? 'bg-yellow-400 text-black border-yellow-400'
                                        : 'bg-white text-black border-gray-200 hover:border-gray-300'
                                    }
                                `}
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{activity.label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </>
    );
});

TravelStyleActivitiesForm.displayName = 'TravelStyleActivitiesForm';

