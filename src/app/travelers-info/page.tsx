'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TravelersInfoForm, type TravelersInfoFormRef } from '@/components/features/travelers-info/travelers-info-form';
import { HotelTravelModeForm, type HotelTravelModeFormRef } from '@/components/features/travelers-info/hotel-travel-mode-form';
import { BackButton } from '@/components/features/back-button';
import { useTravelersInfoStore } from '@/store/travelers-info-store';
import { ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';

export default function TravelersInfoPage() {
    const step1FormRef = useRef<TravelersInfoFormRef>(null);
    const step2FormRef = useRef<HotelTravelModeFormRef>(null);
    
    const currentStep = useTravelersInfoStore((state) => state.currentStep);
    const nextStep = useTravelersInfoStore((state) => state.nextStep);
    const previousStep = useTravelersInfoStore((state) => state.previousStep);
    const getFormData = useTravelersInfoStore((state) => state.getFormData);
    const getHotelTravelModeData = useTravelersInfoStore((state) => state.getHotelTravelModeData);

    const stepTitles = ['Travelers Info', 'Hotel & Travel Mode', 'Review'];
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
        } else {
            // Step 3 - Final submission
            console.log('All form data:', {
                step1: getFormData(),
                step2: getHotelTravelModeData(),
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
                        {[1, 2, 3].map((step) => (
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
                {currentStep === 3 && (
                    <div className="mb-8">
                        <p className="text-center text-gray-600">Review your information</p>
                    </div>
                )}

                {/* Continue Button */}
                <motion.button
                    onClick={handleContinue}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-yellow-400 text-black font-bold py-4 rounded-[30px] shadow-none hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                    {currentStep === 3 ? 'Submit' : 'Continue'}
                    {currentStep !== 3 && <ArrowRightIcon className="w-4 h-4" />}
                </motion.button>
            </div>
        </div>
    );
}
