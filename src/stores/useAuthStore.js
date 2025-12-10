import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (userData, token) => set({ user: userData, token, isAuthenticated: true }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
            updateUser: (updatedData) => set((state) => ({ user: { ...state.user, ...updatedData } })),
        }),
        {
            name: 'auth-storage', // unique name
            // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export default useAuthStore;
