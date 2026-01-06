'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MobileLoginForm } from '@/components/features/auth/mobile-login-form';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';


export default function SigninPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // We'll use this store just to persist any data if needed or access future auth state

    const handleLoginSuccess = () => {
        // Check if there's a redirect parameter in the URL
        const redirectTo = searchParams.get('redirect');
        // Navigate to the referring page or a dashboard.
        // If redirect parameter exists, use it; otherwise default to root.
        router.push(redirectTo || '/');
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
