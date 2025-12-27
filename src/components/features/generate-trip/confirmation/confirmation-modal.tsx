'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm }: ConfirmationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
                        className="fixed top-1/2 left-1/2 w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl z-50 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                        <h3 className="text-xl font-bold text-center mb-2 text-black">
                            Confirm Trip Plan
                        </h3>
                        <p className="text-gray-600 text-center mb-6 text-sm">
                            Are you sure you want to confirm this itinerary? Our team will review and reach out to you shortly.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 py-3 px-4 rounded-xl bg-primary-500 font-bold text-black hover:bg-primary-600 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
