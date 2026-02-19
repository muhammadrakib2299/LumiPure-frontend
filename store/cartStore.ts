import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface CartItem {
    product: {
        _id: string;
        name: string;
        price: number;
        images: { url: string }[];
        stock: number;
    };
    quantity: number;
    selectedVariant?: Record<string, string>;
    price: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isLoading: boolean;
    fetchCart: () => Promise<void>;
    addToCart: (productId: string, quantity?: number, selectedVariant?: Record<string, string>) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

// Helper: the axios interceptor already returns response.data,
// so the resolved value is { success, message, data: { cart } }.
// This helper extracts the cart object safely.
function extractCart(response: unknown): { items: CartItem[]; totalItems: number; totalPrice: number } {
    const res = response as { data?: { cart?: { items?: CartItem[]; totalItems?: number; totalPrice?: number } } };
    const cart = res?.data?.cart;
    return {
        items: cart?.items || [],
        totalItems: cart?.totalItems || 0,
        totalPrice: cart?.totalPrice || 0,
    };
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,
            isLoading: false,

            fetchCart: async () => {
                try {
                    set({ isLoading: true });
                    const response = await api.get('/cart');
                    const cart = extractCart(response);
                    set({ ...cart, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                    console.error('Error fetching cart:', error);
                }
            },

            addToCart: async (productId: string, quantity = 1, selectedVariant) => {
                try {
                    set({ isLoading: true });
                    const response = await api.post('/cart/items', {
                        productId,
                        quantity,
                        selectedVariant,
                    });
                    const cart = extractCart(response);
                    set({ ...cart, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            updateQuantity: async (productId: string, quantity: number) => {
                try {
                    set({ isLoading: true });
                    const response = await api.put(`/cart/items/${productId}`, { quantity });
                    const cart = extractCart(response);
                    set({ ...cart, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            removeFromCart: async (productId: string) => {
                try {
                    set({ isLoading: true });
                    const response = await api.delete(`/cart/items/${productId}`);
                    const cart = extractCart(response);
                    set({ ...cart, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            clearCart: async () => {
                try {
                    set({ isLoading: true });
                    await api.delete('/cart');
                    set({
                        items: [],
                        totalItems: 0,
                        totalPrice: 0,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
