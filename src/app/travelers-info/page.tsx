'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { TravelersInfoForm, type TravelersInfoFormRef } from '@/components/features/travelers-info/travelers-info-form';
import { HotelTravelModeForm, type HotelTravelModeFormRef } from '@/components/features/travelers-info/hotel-travel-mode-form';
import { TravelStyleActivitiesForm, type TravelStyleActivitiesFormRef } from '@/components/features/travelers-info/travel-style-activities-form';
import { OtpVerificationForm, type OtpVerificationFormRef } from '@/components/features/travelers-info/otp-verification-form';
import { BackButton } from '@/components/features/back-button';
import { useTravelersInfoStore } from '@/store/travelers-info-store';
import { ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';

export default function TravelersInfoPage() {
    const router = useRouter();
    const step1FormRef = useRef<TravelersInfoFormRef>(null);
    const step2FormRef = useRef<HotelTravelModeFormRef>(null);
    const step3FormRef = useRef<TravelStyleActivitiesFormRef>(null);
    const step4FormRef = useRef<OtpVerificationFormRef>(null);
    
    const currentStep = useTravelersInfoStore((state) => state.currentStep);
    const nextStep = useTravelersInfoStore((state) => state.nextStep);
    const previousStep = useTravelersInfoStore((state) => state.previousStep);
    const getFormData = useTravelersInfoStore((state) => state.getFormData);
    const getHotelTravelModeData = useTravelersInfoStore((state) => state.getHotelTravelModeData);
    const getTravelStyleActivitiesData = useTravelersInfoStore((state) => state.getTravelStyleActivitiesData);
    
    // Track form validity for step 1
    const [isFormValid, setIsFormValid] = useState(false);
    
    // Get form data to watch for changes
    const departureCity = useTravelersInfoStore((state) => state.departureCity);
    const travelStyle = useTravelersInfoStore((state) => state.travelStyle);
    const startDate = useTravelersInfoStore((state) => state.startDate);
    const endDate = useTravelersInfoStore((state) => state.endDate);
    const travelerCounts = useTravelersInfoStore((state) => state.travelerCounts);
    
    // Check form validity whenever form data changes (only for step 1)
    useEffect(() => {
        if (currentStep === 1 && step1FormRef.current) {
            const isValid = step1FormRef.current.isValid();
            setIsFormValid(isValid);
        } else {
            setIsFormValid(true); // Enable button for other steps
        }
    }, [currentStep, departureCity, travelStyle, startDate, endDate, travelerCounts]);

    const stepTitles = ['Travelers Info', 'Hotel & Travel Mode', 'Travel Style & Activities', 'Verify Details'];
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
            console.log('All form data:', {
                step1: getFormData(),
                step2: getHotelTravelModeData(),
                step3: getTravelStyleActivitiesData(),
            });
            step3FormRef.current?.handleContinue();
            // Navigate to step 4 (OTP form)
            nextStep();
        } else if (currentStep === 4) {
            // Step 4 - OTP Verification (handled by form component)
            step4FormRef.current?.handleContinue();
        }
    };

    const handleOtpVerificationSuccess = () => {
        // After OTP verification, navigate to generate-trip page
        router.push('/generate-trip');
    };

    const handleBack = () => {
        if (currentStep > 1) {
            previousStep();
        }
    };

    // Special layout for OTP verification step (step 4)
    if (currentStep === 4) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-end font-sans">
                {/* Top Section with Back Button */}
                <div className="bg-gray-100 pt-6 px-6 pb-4 absolute top-0 left-0 right-0 z-10">
                    <button
                        onClick={handleBack}
                        className="text-black hover:opacity-70 transition-opacity flex items-center"
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* White Card Section (Lower Half) */}
                <div className="bg-white rounded-t-[30px] px-6 pt-6 pb-8 mt-auto" style={{ minHeight: '55%' }}>
                    <OtpVerificationForm ref={step4FormRef} onContinue={handleOtpVerificationSuccess} />
                </div>
            </div>
        );
    }

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
                        <h1 className="text-xl font-bold text-black flex-1 text-center" >
                            {currentTitle}
                        </h1>
                        <div className="w-6"></div> {/* Spacer to balance the back button */}
                    </div>

                    {/* Progress Bars */}
                    {currentStep <= 3 && (
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
                    )}
                </div>

                {/* Step Content */}
                {currentStep === 1 && <TravelersInfoForm ref={step1FormRef} />}
                {currentStep === 2 && <HotelTravelModeForm ref={step2FormRef} />}
                {currentStep === 3 && <TravelStyleActivitiesForm ref={step3FormRef} />}

                {/* Continue Button */}
                <motion.button
                    onClick={handleContinue}
                    disabled={!isFormValid}
                    whileHover={isFormValid ? { scale: 1.01 } : {}}
                    whileTap={isFormValid ? { scale: 0.99 } : {}}
                    className={`w-full font-bold py-3 rounded-3xl shadow-none transition-colors flex items-center justify-center gap-2 text-sm ${
                        isFormValid
                            ? 'bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                    Continue
                    <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
            </div>
        </div>
    );
}
