'use client';

import { motion } from 'framer-motion';
import { Download, Plus, Home } from 'lucide-react';
import Link from 'next/link';
import { TravelersInfoFormData, useTravelersInfoStore } from '@/store/travelers-info-store';

interface ConfirmationSuccessProps {
    formData: TravelersInfoFormData;
    destination: string;
    durationDays: number;
}

export function ConfirmationSuccess({ formData, destination, durationDays }: ConfirmationSuccessProps) {
    const resetForm = useTravelersInfoStore((state) => state.resetForm);
    const bookingId = `UT-${destination.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-001`;

    // Format dates
    const formatDate = (date: Date | null | string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const dateRange = formData.startDate && formData.endDate
        ? `${formatDate(formData.startDate)}-${formatDate(formData.endDate)}, ${new Date(formData.endDate).getFullYear()}`
        : 'Date pending';

    const handleNewTrip = () => {
        resetForm();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-black mb-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    You&apos;re All Set!
                </h1>
                <h2 className="text-xl font-bold text-yellow-500 mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Your Plan is Confirmed!
                </h2>

                <p className="text-gray-600 text-sm mb-8 px-4">
                    Your travel itinerary has been saved. Our team will reach out soon.
                </p>

                {/* Details Card */}
                <div className="bg-gray-50 rounded-3xl p-6 mb-8 mx-2 border border-gray-100">
                    <h3 className="text-sm font-bold text-black mb-6 text-center" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        Confirmation Details
                    </h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                            <span className="text-sm text-gray-500 font-medium">Booking ID</span>
                            <span className="text-sm font-bold text-black">{bookingId}</span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                            <span className="text-sm text-gray-500 font-medium">Destination</span>
                            <span className="text-sm font-bold text-black">{destination || 'Your Trip'}</span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                            <span className="text-sm text-gray-500 font-medium">Travel Dates</span>
                            <span className="text-sm font-bold text-black">{dateRange}</span>
                        </div>

                        <div className="flex justify-between items-center text-left">
                            <span className="text-sm text-gray-500 font-medium">Duration</span>
                            <span className="text-sm font-bold text-black">{durationDays} Days, {Math.max(0, durationDays - 1)} Nights</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 mb-8 px-2">
                    <button className="w-full bg-black text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold hover:bg-gray-900 transition-colors shadow-lg shadow-black/10">
                        <Download size={18} />
                        Download Itinerary
                    </button>

                    <div className="flex gap-3">
                        <Link href="/" className="flex-1" onClick={handleNewTrip}>
                            <button className="w-full bg-yellow-400 text-black rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/20">
                                <Plus size={18} />
                                New Trip
                            </button>
                        </Link>

                        <Link href="/" className="flex-1">
                            <button className="w-full bg-white border border-gray-200 text-gray-500 rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold hover:bg-gray-50 transition-colors">
                                <Home size={18} />
                                Home
                            </button>
                        </Link>
                    </div>
                </div>

                <button className="text-black font-bold text-sm hover:underline">
                    Share Itinerary
                </button>
            </motion.div>
        </div>
    );
}
