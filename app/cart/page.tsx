'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowRight,
    Loader2,
    ArrowLeft,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';

export default function CartPage() {
    const router = useRouter();
    const { items, totalItems, totalPrice, isLoading, fetchCart, updateQuantity, removeFromCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated, fetchCart]);

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            await updateQuantity(productId, newQuantity);
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const handleRemove = async (productId: string) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    // Empty Cart State
    if (!isLoading && items.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--color-gray-50)] py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-md mx-auto text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-gray-100)] flex items-center justify-center">
                            <ShoppingBag size={40} className="text-[var(--color-gray-400)]" />
                        </div>
                        <h1 className="text-2xl font-display font-semibold text-[var(--color-gray-900)] mb-2">
                            Your cart is empty
                        </h1>
                        <p className="text-[var(--color-gray-500)] mb-8">
                            Looks like you haven&apos;t added any products to your cart yet.
                        </p>
                        <Link href="/shop">
                            <Button size="lg">
                                Start Shopping
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)] py-8 lg:py-12">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)]">
                            Shopping Cart
                        </h1>
                        <p className="text-[var(--color-gray-500)] mt-1">
                            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                    >
                        <ArrowLeft size={18} />
                        Continue Shopping
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.product._id}
                                    className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm flex gap-4 lg:gap-6"
                                >
                                    {/* Product Image */}
                                    <Link
                                        href={`/products/${item.product._id}`}
                                        className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--color-gray-100)]"
                                    >
                                        {item.product.images?.[0]?.url ? (
                                            <Image
                                                src={item.product.images[0].url}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                                sizes="128px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[var(--color-gray-400)] text-sm">
                                                No Image
                                            </div>
                                        )}
                                    </Link>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/products/${item.product._id}`}>
                                            <h3 className="font-medium text-[var(--color-gray-900)] hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                                                {item.product.name}
                                            </h3>
                                        </Link>

                                        <p className="text-lg font-semibold text-[var(--color-primary)] mt-2">
                                            ${item.price.toFixed(2)}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-[var(--color-gray-200)] rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="p-2 hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-4 py-2 font-medium text-sm">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.product.stock}
                                                    className="p-2 hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item.product._id)}
                                                className="p-2 text-[var(--color-gray-400)] hover:text-[var(--color-error)] transition-colors"
                                                title="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total - Desktop */}
                                    <div className="hidden lg:flex flex-col items-end justify-between">
                                        <span className="text-lg font-semibold text-[var(--color-gray-900)]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                                <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-[var(--color-gray-600)]">
                                        <span>Subtotal</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-gray-600)]">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-gray-600)]">
                                        <span>Tax</span>
                                        <span>Calculated at checkout</span>
                                    </div>

                                    <div className="border-t border-[var(--color-gray-200)] pt-4">
                                        <div className="flex justify-between text-lg font-semibold text-[var(--color-gray-900)]">
                                            <span>Total</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    fullWidth
                                    size="lg"
                                    className="mt-6"
                                    onClick={() => router.push('/checkout')}
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={18} />
                                </Button>

                                {/* Trust Badges */}
                                <div className="mt-6 pt-6 border-t border-[var(--color-gray-200)]">
                                    <p className="text-xs text-center text-[var(--color-gray-500)]">
                                        🔒 Secure checkout powered by SSL encryption
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
