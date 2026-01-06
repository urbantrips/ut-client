import { useUserStore } from '@/store/user-store';

/**
 * API client utility that automatically handles token refresh on 401 errors
 */

let isRefreshing = false;
let refreshPromise: Promise<{ accessToken: string; refreshToken: string } | null> | null = null;

/**
 * Refreshes the access token using the refresh token
 */
async function refreshAccessToken(): Promise<{ accessToken: string; refreshToken: string } | null> {
  const { refreshToken } = useUserStore.getState();
  
  if (!refreshToken) {
    return null;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const response = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[API Client] Token refresh failed:', errorData);
      // Clear tokens if refresh fails
      useUserStore.getState().clearUser();
      return null;
    }

    const data = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = data;

    // Update tokens in store
    useUserStore.getState().setTokens({
      accessToken,
      refreshToken: newRefreshToken,
    });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error('[API Client] Error refreshing token:', error);
    useUserStore.getState().clearUser();
    return null;
  }
}

/**
 * Makes an API request with automatic token refresh on 401 errors
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  // Get access token - try multiple times to ensure hydration is complete
  let accessToken = useUserStore.getState().accessToken;
  
  // If no token, try to get it directly from localStorage (especially important in production SSR)
  if (!accessToken && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('user-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.accessToken) {
          accessToken = parsed.state.accessToken;
          // Update the store with the token we found
          useUserStore.getState().setTokens({
            accessToken: parsed.state.accessToken,
            refreshToken: parsed.state.refreshToken || '',
          });
        }
      }
    } catch (e) {
      // Ignore parse errors
      if (process.env.NODE_ENV === 'development') {
        console.warn('[API Client] Error reading token from localStorage:', e);
      }
    }
  }
  
  // Add authorization header if we have a token
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
    console.log('[API Client] Token found, making request to:', url);
  } else {
    // Log warning to help debug (both dev and prod for troubleshooting)
    console.warn('[API Client] No access token available for request to:', url);
    console.warn('[API Client] Check localStorage for user-storage key');
    
    // Try one more time to get token from store
    const retryToken = useUserStore.getState().accessToken;
    if (retryToken) {
      headers['Authorization'] = `Bearer ${retryToken}`;
      console.log('[API Client] Token found on retry');
    } else {
      // Check localStorage one more time
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('user-storage');
          console.log('[API Client] localStorage user-storage exists:', !!stored);
          if (stored) {
            const parsed = JSON.parse(stored);
            console.log('[API Client] Parsed storage has accessToken:', !!parsed?.state?.accessToken);
            if (parsed?.state?.accessToken) {
              headers['Authorization'] = `Bearer ${parsed.state.accessToken}`;
              console.log('[API Client] Using token from localStorage directly');
            }
          }
        } catch (e) {
          console.error('[API Client] Error reading localStorage:', e);
        }
      }
    }
  }

  // Log the headers being sent (without the token value for security)
  console.log('[API Client] Request headers:', {
    ...headers,
    Authorization: headers['Authorization'] ? 'Bearer ***' : 'NOT SET'
  });

  // Make the initial request
  let response = await fetch(url, {
    ...options,
    headers,
  });
  
  console.log('[API Client] Response status:', response.status, 'for', url);

  // If we get a 401, try to refresh the token and retry
  if (response.status === 401) {
    // Check if this is a token expiry error or missing auth header
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || '';
    const isTokenExpired = errorMessage.includes('expired') || 
                          errorMessage.includes('refresh');
    const isMissingAuth = errorMessage.includes('No authorization header') ||
                         errorMessage.includes('authorization header');

    // Try to refresh if we have a refresh token and it's a token-related error
    const { refreshToken } = useUserStore.getState();
    if (refreshToken && (isTokenExpired || isMissingAuth)) {
      // Prevent multiple simultaneous refresh attempts
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
          // Reset refresh state after refresh completes
          isRefreshing = false;
          refreshPromise = null;
        });
      }

      const newTokens = await refreshPromise;

      if (newTokens) {
        // Retry the original request with the new token
        const retryHeaders: Record<string, string> = {
          ...headers,
          'Authorization': `Bearer ${newTokens.accessToken}`,
        };
        response = await fetch(url, {
          ...options,
          headers: retryHeaders,
        });
        
        // If retry still fails with 401, throw the error
        if (response.status === 401) {
          const retryErrorData = await response.json().catch(() => ({}));
          throw new Error(retryErrorData.message || 'Authentication failed. Please log in again.');
        }
      } else {
        // Refresh failed, clear user and throw error
        useUserStore.getState().clearUser();
        throw new Error('Authentication failed. Please log in again.');
      }
    } else {
      // No refresh token or not a refreshable error, clear user and throw
      if (!refreshToken) {
        useUserStore.getState().clearUser();
      }
      throw new Error(errorMessage || 'Authentication failed. Please log in again.');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * Convenience method for GET requests
 */
export async function apiGet<T = any>(url: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(url, { ...options, method: 'GET' });
}

/**
 * Convenience method for POST requests
 */
export async function apiPost<T = any>(url: string, body?: any, options?: RequestInit): Promise<T> {
  return apiRequest<T>(url, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Convenience method for PUT requests
 */
export async function apiPut<T = any>(url: string, body?: any, options?: RequestInit): Promise<T> {
  return apiRequest<T>(url, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Convenience method for PATCH requests
 */
export async function apiPatch<T = any>(url: string, body?: any, options?: RequestInit): Promise<T> {
  return apiRequest<T>(url, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Convenience method for DELETE requests
 */
export async function apiDelete<T = any>(url: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(url, { ...options, method: 'DELETE' });
}

