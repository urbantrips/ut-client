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
  const { accessToken } = useUserStore.getState();
  
  // Add authorization header if we have a token
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // Make the initial request
  let response = await fetch(url, {
    ...options,
    headers,
  });

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

