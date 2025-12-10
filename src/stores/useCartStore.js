import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            totalAmount: 0,

            addToCart: (product, quantity = 1) => {
                const cart = get().cart;
                const existingItem = cart.find((item) => item.id === product.id);

                if (existingItem) {
                    const updatedCart = cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                    set({ cart: updatedCart });
                } else {
                    set({ cart: [...cart, { ...product, quantity }] });
                }
                get().calculateTotal();
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== productId),
                }));
                get().calculateTotal();
            },

            clearCart: () => set({ cart: [], totalAmount: 0 }),

            calculateTotal: () => {
                const cart = get().cart;
                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                set({ totalAmount: total });
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;
