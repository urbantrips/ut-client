import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const BackButton = () => {
    // this is a button that goes back to the previous page
    return (
        <Link href="/" className="text-black hover:opacity-70 transition-opacity flex items-center">
            <ArrowLeftIcon className="w-6 h-6" />
        </Link>
    );
};