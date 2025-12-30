'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  tripTitle?: string;
}

export function CancelConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading = false,
  tripTitle 
}: CancelConfirmationModalProps) {
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
              Cancel Trip
            </h3>
            <p className="text-gray-600 text-center mb-6 text-sm">
              {tripTitle ? (
                <>Are you sure you want to cancel <strong>{tripTitle}</strong>? This action cannot be undone.</>
              ) : (
                'Are you sure you want to cancel this trip? This action cannot be undone.'
              )}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Keep Trip
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-3 px-4 rounded-xl bg-red-500 font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Canceling...
                  </>
                ) : (
                  'Cancel Trip'
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

