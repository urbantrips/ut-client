'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TravelersInfoForm, type TravelersInfoFormRef } from '@/components/features/travelers-info/travelers-info-form';
import { HotelTravelModeForm, type HotelTravelModeFormRef } from '@/components/features/travelers-info/hotel-travel-mode-form';
import { TravelStyleActivitiesForm, type TravelStyleActivitiesFormRef } from '@/components/features/travelers-info/travel-style-activities-form';
import { BackButton } from '@/components/features/back-button';
import { useTravelersInfoStore } from '@/store/travelers-info-store';
import { ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';

export default function TravelersInfoPage() {
    const step1FormRef = useRef<TravelersInfoFormRef>(null);
    const step2FormRef = useRef<HotelTravelModeFormRef>(null);
    const step3FormRef = useRef<TravelStyleActivitiesFormRef>(null);
    
    const currentStep = useTravelersInfoStore((state) => state.currentStep);
    const nextStep = useTravelersInfoStore((state) => state.nextStep);
    const previousStep = useTravelersInfoStore((state) => state.previousStep);
    const getFormData = useTravelersInfoStore((state) => state.getFormData);
    const getHotelTravelModeData = useTravelersInfoStore((state) => state.getHotelTravelModeData);
    const getTravelStyleActivitiesData = useTravelersInfoStore((state) => state.getTravelStyleActivitiesData);

    const stepTitles = ['Travelers Info', 'Hotel & Travel Mode', 'Travel Style & Activities', 'Review'];
    const currentTitle = stepTitles[currentStep - 1] || 'Travelers Info';

    const handleContinue = () => {
        if (currentStep === 1) {
            const formData = getFormData();
            console.log('Step 1 data:', formData);
            step1FormRef.current?.handleContinue();
            nextStep();
        } else if (currentStep === 2) {
            const formData = getHotelTravelModeData();
            console.log('Step 2 data:', formData);
            step2FormRef.current?.handleContinue();
            nextStep();
        } else if (currentStep === 3) {
            const formData = getTravelStyleActivitiesData();
            console.log('Step 3 data:', formData);
            step3FormRef.current?.handleContinue();
            nextStep();
        } else {
            // Step 4 - Final submission
            console.log('All form data:', {
                step1: getFormData(),
                step2: getHotelTravelModeData(),
                step3: getTravelStyleActivitiesData(),
            });
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            previousStep();
        }
    };

    return (
        <div className="min-h-screen bg-white sm:bg-[#FFFBF0] flex items-center justify-center sm:p-6 font-sans">
            <div className="w-full max-w-[500px] bg-white sm:rounded-[30px] sm:shadow-sm sm:border border-gray-100 p-6 relative min-h-screen sm:min-h-0">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between gap-4 mb-4">
                        {currentStep === 1 ? (
                            <BackButton />
                        ) : (
                            <button
                                onClick={handleBack}
                                className="text-black hover:opacity-70 transition-opacity flex items-center"
                            >
                                <ArrowLeftIcon className="w-6 h-6" />
                            </button>
                        )}
                        <h1 className="text-xl font-bold text-black flex-1 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            {currentTitle}
                        </h1>
                        <div className="w-6"></div> {/* Spacer to balance the back button */}
                    </div>

                    {/* Progress Bars */}
                    <div className="flex gap-2 px-2">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`h-1 flex-1 rounded-full ${
                                    step <= currentStep ? 'bg-yellow-400' : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                {currentStep === 1 && <TravelersInfoForm ref={step1FormRef} />}
                {currentStep === 2 && <HotelTravelModeForm ref={step2FormRef} />}
                {currentStep === 3 && <TravelStyleActivitiesForm ref={step3FormRef} />}
                {currentStep === 4 && (
                    <div className="mb-8">
                        <p className="text-center text-gray-600">Review your information</p>
                    </div>
                )}

                {/* Continue Button */}
                <motion.button
                    onClick={handleContinue}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-yellow-400 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 text-sm"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                    {currentStep === 3 ? 'Generate My Trip' : currentStep === 4 ? 'Submit' : 'Continue'}
                    {currentStep !== 3 && currentStep !== 4 && <ArrowRightIcon className="w-4 h-4" />}
                </motion.button>
            </div>
        </div>
    );
}
