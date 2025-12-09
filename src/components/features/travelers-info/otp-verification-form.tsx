'use client';

import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTravelersInfoStore } from '@/store/travelers-info-store';

export interface OtpVerificationFormRef {
    handleContinue: () => void;
    getFormData: () => { name: string; phone: string; countryCode: string; otp: string };
}

interface OtpVerificationFormProps {
    onContinue?: (data: { name: string; phone: string; countryCode: string; otp: string }) => void;
}

export const OtpVerificationForm = forwardRef<OtpVerificationFormRef, OtpVerificationFormProps>(
    ({ onContinue }, ref) => {
        const { 
            verificationName, 
            verificationPhone, 
            verificationCountryCode,
            setVerificationName,
            setVerificationPhone,
            setVerificationCountryCode,
        } = useTravelersInfoStore();

        const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
        const [isOtpSent, setIsOtpSent] = useState(false);
        const [isResending, setIsResending] = useState(false);
        const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

        const countryCode = verificationCountryCode || '+91';

        const handleSendOtp = async () => {
            if (!verificationName.trim() || !verificationPhone.trim()) {
                return;
            }
            
            // Simulate OTP sending
            setIsOtpSent(true);
            // In a real app, you would call an API here
        };

        const handleResendOtp = async () => {
            setIsResending(true);
            setOtp(['', '', '', '', '', '']);
            // Simulate resending OTP
            setTimeout(() => {
                setIsResending(false);
            }, 1000);
        };

        const handleOtpChange = (index: number, value: string) => {
            if (value.length > 1) {
                // Handle paste
                const pastedOtp = value.slice(0, 6).split('');
                const newOtp = [...otp];
                pastedOtp.forEach((digit, i) => {
                    if (index + i < 6) {
                        newOtp[index + i] = digit;
                    }
                });
                setOtp(newOtp);
                
                // Focus on the next empty input or the last one
                const nextIndex = Math.min(index + pastedOtp.length, 5);
                otpInputRefs.current[nextIndex]?.focus();
                return;
            }

            if (!/^\d*$/.test(value)) {
                return;
            }

            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                otpInputRefs.current[index + 1]?.focus();
            }
        };

        const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                otpInputRefs.current[index - 1]?.focus();
            }
        };

        const handleContinue = () => {
            if (!isOtpSent) {
                handleSendOtp();
                return;
            }

            const otpString = otp.join('');
            if (otpString.length !== 6) {
                return;
            }

            const formData = {
                name: verificationName,
                phone: verificationPhone,
                countryCode: countryCode,
                otp: otpString,
            };

            console.log('OTP Verification data:', formData);
            onContinue?.(formData);
        };

        useImperativeHandle(ref, () => ({
            handleContinue,
            getFormData: () => ({
                name: verificationName,
                phone: verificationPhone,
                countryCode: countryCode,
                otp: otp.join(''),
            }),
        }));

        // Focus first OTP input when OTP is sent
        useEffect(() => {
            if (isOtpSent && otpInputRefs.current[0]) {
                setTimeout(() => {
                    otpInputRefs.current[0]?.focus();
                }, 100);
            }
        }, [isOtpSent]);

        return (
            <>
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-black mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Verify your Details to view full itinerary
                    </h2>

                    {/* Name Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            Name*
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={verificationName}
                            onChange={(e) => setVerificationName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm placeholder:text-gray-400"
                            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            disabled={isOtpSent}
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            Phone*
                        </label>
                        <div className="flex gap-2">
                            <Select
                                value={countryCode}
                                onValueChange={setVerificationCountryCode}
                                disabled={isOtpSent}
                            >
                                <SelectTrigger className="w-[100px] px-3 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm">
                                    <SelectValue>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-base">🇮🇳</span>
                                            <span>{countryCode}</span>
                                        </div>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="+91">
                                        <div className="flex items-center gap-2">
                                            <span>🇮🇳</span>
                                            <span>+91</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <input
                                type="tel"
                                placeholder="Enter your Mobile Number"
                                value={verificationPhone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length <= 10) {
                                        setVerificationPhone(value);
                                    }
                                }}
                                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm placeholder:text-gray-400"
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                disabled={isOtpSent}
                            />
                        </div>
                    </div>

                    {/* Send OTP Button (shown when OTP not sent) */}
                    {!isOtpSent && (
                        <motion.button
                            onClick={handleSendOtp}
                            disabled={!verificationName.trim() || !verificationPhone.trim() || verificationPhone.length !== 10}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm mb-6"
                            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                        >
                            Send OTP
                        </motion.button>
                    )}

                    {/* OTP Sent Status Button */}
                    {isOtpSent && (
                        <motion.button
                            disabled
                            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-3xl shadow-none opacity-75 cursor-not-allowed text-sm mb-6"
                            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                        >
                            OTP Sent!
                        </motion.button>
                    )}

                    {/* OTP Input Fields */}
                    {isOtpSent && (
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-black mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                                Enter OTP*
                            </label>
                            <div className="flex gap-2 justify-center">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            otpInputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-12 h-12 text-center rounded-lg border border-gray-300 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all text-lg font-semibold"
                                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={handleResendOtp}
                                    disabled={isResending}
                                    className="text-sm text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50"
                                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                >
                                    {isResending ? 'Resending...' : 'Resend OTP'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Verify & Continue Button (shown when OTP is sent) */}
                    {isOtpSent && (
                        <motion.button
                            onClick={handleContinue}
                            disabled={otp.join('').length !== 6}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                        >
                            Verify & Continue
                            <ArrowRightIcon className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>
            </>
        );
    }
);

OtpVerificationForm.displayName = 'OtpVerificationForm';

