import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: {
        url: string;
    };
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<void>;
    setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                try {
                    set({ isLoading: true });
                    const response = await api.post('/auth/login', { email, password });

                    const { user, token } = response.data;

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            register: async (name: string, email: string, password: string) => {
                try {
                    set({ isLoading: true });
                    const response = await api.post('/auth/register', { name, email, password });

                    const { user, token } = response.data;

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },

            updateProfile: async (data: Partial<User>) => {
                try {
                    const response = await api.put('/auth/update-profile', data);
                    const { user } = response.data;

                    localStorage.setItem('user', JSON.stringify(user));
                    set({ user });
                } catch (error) {
                    throw error;
                }
            },

            setUser: (user: User, token: string) => {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
