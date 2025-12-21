'use client';

import { forwardRef, useImperativeHandle, useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { CountryPicker } from '@/components/ui/country-picker';
import { useTravelersInfoStore } from '@/store/travelers-info-store';
import { getCountryByCode } from '@/lib/countries';

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
        const [isSending, setIsSending] = useState(false);
        const [isVerifying, setIsVerifying] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

        const selectedCountry = useMemo(() => {
            const countryCode = verificationCountryCode || 'IN';
            return getCountryByCode(countryCode) || getCountryByCode('IN');
        }, [verificationCountryCode]);

        const dialCode = selectedCountry?.dialCode || '+91';

        const handleSendOtp = async () => {
            if (!verificationName.trim() || !verificationPhone.trim()) {
                return;
            }
            
            setIsSending(true);
            setError(null);
            
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
                const response = await fetch(`${apiUrl}/auth/phone/send-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phoneNumber: verificationPhone,
                        countryCode: dialCode,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to send OTP');
                }

                setIsOtpSent(true);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.');
                console.error('Error sending OTP:', err);
            } finally {
                setIsSending(false);
            }
        };

        const handleResendOtp = async () => {
            setIsResending(true);
            setError(null);
            setOtp(['', '', '', '', '', '']);
            
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
                const response = await fetch(`${apiUrl}/auth/phone/resend-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phoneNumber: verificationPhone,
                        countryCode: dialCode,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to resend OTP');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to resend OTP. Please try again.');
                console.error('Error resending OTP:', err);
            } finally {
                setIsResending(false);
            }
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

        const handleContinue = async () => {
            if (!isOtpSent) {
                handleSendOtp();
                return;
            }

            const otpString = otp.join('');
            if (otpString.length !== 6) {
                return;
            }

            setIsVerifying(true);
            setError(null);

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
                const response = await fetch(`${apiUrl}/auth/phone/verify-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phoneNumber: verificationPhone,
                        countryCode: dialCode,
                        otp: otpString,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to verify OTP');
                }

                const authData = await response.json();
                console.log('OTP Verification successful:', authData);

                const formData = {
                    name: verificationName,
                    phone: verificationPhone,
                    countryCode: dialCode,
                    otp: otpString,
                };

                onContinue?.(formData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to verify OTP. Please try again.');
                console.error('Error verifying OTP:', err);
            } finally {
                setIsVerifying(false);
            }
        };

        useImperativeHandle(ref, () => ({
            handleContinue,
            getFormData: () => ({
                name: verificationName,
                phone: verificationPhone,
                countryCode: dialCode,
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
                            <CountryPicker
                                value={verificationCountryCode || 'IN'}
                                onValueChange={setVerificationCountryCode}
                                disabled={isOtpSent}
                                className="w-[120px]"
                            />
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

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            {error}
                        </div>
                    )}

                    {/* Send OTP Button (shown when OTP not sent) */}
                    {!isOtpSent && (
                        <motion.button
                            onClick={handleSendOtp}
                            disabled={!verificationName.trim() || !verificationPhone.trim() || verificationPhone.length !== 10 || isSending}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm mb-6"
                            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                        >
                            {isSending ? 'Sending OTP...' : 'Send OTP'}
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
                            disabled={otp.join('').length !== 6 || isVerifying}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-3xl shadow-none hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                        >
                            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                            {!isVerifying && <ArrowRightIcon className="w-4 h-4" />}
                        </motion.button>
                    )}
                </div>
            </>
        );
    }
);

OtpVerificationForm.displayName = 'OtpVerificationForm';

