'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Lock } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { env } from '@/lib/env';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';

const SECRET_PASSWORD = 'QWERTY@#$qwerty123';

export default function ExportCsvPage() {
  const router = useRouter();
  const { accessToken } = useUserStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(null);
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleDownload = () => {
    if (!accessToken) {
      setError('Please log in to download trips data');
      return;
    }

    setIsDownloading(true);
    setError(null);

    const apiUrl = env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    let url = `${apiUrl}/trips/download-csv`;

    // Add query parameters if dates are provided
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', format(startDate, 'yyyy-MM-dd'));
    if (endDate) params.append('endDate', format(endDate, 'yyyy-MM-dd'));
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    // Just fetch and download - no parsing, no validation
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to download: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        const url_blob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url_blob;
        link.download = 'trips-export.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url_blob);
        setIsDownloading(false);
      })
      .catch(() => {
        setError('Failed to download CSV');
        setIsDownloading(false);
      });
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-black" />
              </button>
              <h1 className="text-xl font-bold text-black flex-1 text-center">
                Export Trips Data
              </h1>
              <div className="w-10" />
            </div>
          </div>
        </div>

        {/* Password Form */}
        <div className="px-4 py-6 max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 mt-12">
            <div className="text-center">
              <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Password Required
              </h2>
              <p className="text-sm text-gray-600">
                Please enter the password to access the export page.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  autoFocus
                />
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>
            <h1 className="text-xl font-bold text-black flex-1 text-center">
              Export Trips Data
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="text-center">
            <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Download Trips CSV
            </h2>
            <p className="text-sm text-gray-600">
              Export all your trips data to a CSV file. Optionally filter by date range.
            </p>
          </div>

          {/* Date Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date (Optional)
              </label>
              <DatePicker
                date={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  // Clear end date if it's before the new start date
                  if (date && endDate && endDate < date) {
                    setEndDate(undefined);
                  }
                }}
                placeholder="DD/MM/YY"
                dateFormat="dd/MM/yy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date (Optional)
              </label>
              <DatePicker
                date={endDate}
                onSelect={(date) => setEndDate(date)}
                placeholder="DD/MM/YY"
                dateFormat="dd/MM/yy"
                minDate={startDate}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading || !accessToken}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download CSV
              </>
            )}
          </button>

          {!accessToken && (
            <p className="text-xs text-center text-gray-500">
              Please log in to download your trips data
            </p>
          )}

          {/* Info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              The CSV file will include all trip details, itineraries, and chat history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

