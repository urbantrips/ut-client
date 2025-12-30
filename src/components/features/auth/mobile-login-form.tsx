'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CountryPicker } from '@/components/ui/country-picker';
import { apiPost } from '@/lib/api-client';
import { useUserStore } from '@/store/user-store';
import { getCountryByCode } from '@/lib/countries';
import { env } from '@/lib/env';

interface MobileLoginFormProps {
    onLoginSuccess?: () => void;
    onSwitchMode?: () => void; // If we want to switch between Signup/Login visuals
}

export const MobileLoginForm = ({ onLoginSuccess }: MobileLoginFormProps) => {
    const [countryCode, setCountryCode] = useState('IN');
    const [mobileNumber, setMobileNumber] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));
    const { setUser } = useUserStore();

    const handleSendOtp = async () => {
        if (mobileNumber.length < 10) {
            return;
        }

        setIsSendingOtp(true);
        setError(null);

        try {
            const country = getCountryByCode(countryCode);
            if (!country) {
                throw new Error('Invalid country code');
            }

            const apiUrl = env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            await apiPost(`${apiUrl}/auth/phone/send-otp`, {
                phoneNumber: mobileNumber,
                countryCode: country.dialCode,
            });

            setShowOtp(true);
            // Focus first OTP input
            setTimeout(() => {
                otpInputRefs.current[0]?.focus();
            }, 100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.');
            console.error('Error sending OTP:', err);
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) {
            // Handle paste
            const pastedOtp = value.slice(0, 6).split('').filter(d => /^\d$/.test(d));
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

    const handleVerifyOtp = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            return;
        }

        setIsVerifyingOtp(true);
        setError(null);

        try {
            const country = getCountryByCode(countryCode);
            if (!country) {
                throw new Error('Invalid country code');
            }

            const apiUrl = env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const authData = await apiPost<{
                accessToken: string;
                refreshToken: string;
                user: {
                    _id: string;
                    name?: string;
                    email?: string;
                };
            }>(`${apiUrl}/auth/phone/verify-otp`, {
                phoneNumber: mobileNumber,
                countryCode: country.dialCode,
                otp: otpString,
            });

            // Store user data and tokens in user store
            if (authData.user) {
                setUser(
                    {
                        id: authData.user._id,
                        name: authData.user.name || '',
                        email: authData.user.email || '',
                    },
                    {
                        accessToken: authData.accessToken,
                        refreshToken: authData.refreshToken,
                    }
                );
            }

            onLoginSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to verify OTP. Please try again.');
            console.error('Error verifying OTP:', err);
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] bg-white rounded-[30px] p-8 mx-auto font-sans">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>Urban Trips</h1>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {showOtp ? 'Verify OTP' : 'Login or Create Account'}
                </h2>
                <p className="text-gray-500 text-xs px-4" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {showOtp
                        ? `Enter the code sent to your mobile number ending in ${mobileNumber.slice(-4)}`
                        : 'Enter your mobile number to proceed.'
                    }
                </p>
            </div>

            {/* Form Section */}
            {!showOtp ? (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-black" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            Phone*
                        </label>
                        <div className="flex gap-2">
                            <CountryPicker
                                value={countryCode}
                                onValueChange={setCountryCode}
                                className="w-[110px] shrink-0 bg-white"
                            />
                            <input
                                type="tel"
                                placeholder="Enter your Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setMobileNumber(val);
                                }}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm bg-white"
                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                            />
                        </div>
                    </div>

                    {error && !showOtp && (
                        <div className="text-red-500 text-sm text-center mt-2" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            {error}
                        </div>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleSendOtp}
                        disabled={mobileNumber.length < 10 || isSendingOtp}
                        className={`w-full font-bold py-3 rounded-3xl text-black transition-colors flex items-center justify-center gap-2 mt-4 ${mobileNumber.length >= 10 && !isSendingOtp
                            ? 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                        {isSendingOtp ? 'Sending...' : 'Continue'}
                    </motion.button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="mb-6">
                        <div className="flex gap-2 justify-center">
                            {Array.from({ length: 6 }, (_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        otpInputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={otp[index] || ''}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    className="w-12 h-12 text-center rounded-lg border border-gray-300 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all text-lg font-semibold"
                                    style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                />
                            ))}
                        </div>
                    </div>

                    {error && showOtp && (
                        <div className="text-red-500 text-sm text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                            {error}
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleVerifyOtp}
                        disabled={otp.join('').length < 6 || isVerifyingOtp}
                        className={`w-full font-bold py-3 rounded-3xl text-black transition-colors flex items-center justify-center gap-2 mt-4 ${otp.join('').length >= 6 && !isVerifyingOtp
                            ? 'bg-yellow-400 hover:bg-yellow-500 cursor-pointer'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                        {isVerifyingOtp ? 'Verifying...' : 'Verify & Continue'}
                    </motion.button>
                    <p className="text-center text-xs mt-4 cursor-pointer text-gray-500 hover:text-black" onClick={() => {
                        setShowOtp(false);
                        setOtp(['', '', '', '', '', '']);
                        setError(null);
                    }} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Change Mobile Number
                    </p>
                </div>
            )}
        </div>
    );
};
