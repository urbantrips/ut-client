import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User, tokens?: { accessToken: string; refreshToken: string }) => void;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        setUser: (user, tokens) => {
          set({ 
            user, 
            accessToken: tokens?.accessToken || null,
            refreshToken: tokens?.refreshToken || null,
          });
          // Also set cookies for server-side access
          if (typeof window !== 'undefined' && tokens?.accessToken && tokens?.refreshToken) {
            document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=${15 * 60}; SameSite=Lax`;
            document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          }
        },
        setTokens: (tokens) => {
          set({ 
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
          // Also update cookies
          if (typeof window !== 'undefined') {
            document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=${15 * 60}; SameSite=Lax`;
            document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          }
        },
        clearUser: () => {
          set({ user: null, accessToken: null, refreshToken: null });
          // Also clear cookies
          if (typeof window !== 'undefined') {
            document.cookie = 'accessToken=; path=/; max-age=0';
            document.cookie = 'refreshToken=; path=/; max-age=0';
          }
        },
      }),
      { name: 'user-storage' }
    )
  )
);

