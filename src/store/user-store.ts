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
        setUser: (user, tokens) => set({ 
          user, 
          accessToken: tokens?.accessToken || null,
          refreshToken: tokens?.refreshToken || null,
        }),
        setTokens: (tokens) => set({ 
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
        clearUser: () => set({ user: null, accessToken: null, refreshToken: null }),
      }),
      { name: 'user-storage' }
    )
  )
);

