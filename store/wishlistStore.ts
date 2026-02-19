import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
    items: string[]; // product IDs
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    toggleWishlist: (productId: string) => void;
    isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addToWishlist: (productId: string) => {
                const { items } = get();
                if (!items.includes(productId)) {
                    set({ items: [...items, productId] });
                }
            },

            removeFromWishlist: (productId: string) => {
                set({ items: get().items.filter((id) => id !== productId) });
            },

            toggleWishlist: (productId: string) => {
                const { items } = get();
                if (items.includes(productId)) {
                    set({ items: items.filter((id) => id !== productId) });
                } else {
                    set({ items: [...items, productId] });
                }
            },

            isWishlisted: (productId: string) => {
                return get().items.includes(productId);
            },
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
