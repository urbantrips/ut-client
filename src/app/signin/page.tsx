'use client';

import { useRouter } from 'next/navigation';
import { MobileLoginForm } from '@/components/features/auth/mobile-login-form';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';


export default function SigninPage() {
    const router = useRouter();
    // We'll use this store just to persist any data if needed or access future auth state

    const handleLoginSuccess = () => {
        // Navigate to the referring page or a dashboard.
        // For now, let's assume they might be coming to check their trip or plan one.
        // If they were in the middle of planning, we might want to redirect there.
        // Defaulting to root for now or user dashboard if it existed.
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            {/* Top Section with Back Button */}
            <div className="pt-6 px-6 pb-4">
                <Link
                    href="/"
                    className="text-black hover:opacity-70 transition-opacity flex items-center w-fit"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col items-center pt-10 px-6">
                <div className="w-full max-w-[400px]">
                    <MobileLoginForm
                        onLoginSuccess={handleLoginSuccess}
                    // onSwitchMode is not needed for unified flow
                    />
                </div>
            </div>
        </div>
    );
}
