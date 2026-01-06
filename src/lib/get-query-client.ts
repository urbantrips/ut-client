import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

// This ensures we don't create a new QueryClient for every request
// and only create one per request lifecycle
export const getQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
}));

