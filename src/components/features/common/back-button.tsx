import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const BackButton = () => {
    return (
        <Link href="/" className="text-black hover:opacity-70 transition-opacity flex items-center">
            <ArrowLeftIcon className="w-6 h-6" />
        </Link>
    );
};