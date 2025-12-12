'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ArrowLeft,
    CreditCard,
    Truck,
    ShoppingBag,
    Loader2,
    Check,
    Lock,
} from 'lucide-react';
import { checkoutSchema } from '@/lib/checkoutValidation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import api from '@/lib/api';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, isLoading: cartLoading, fetchCart, clearCart } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
    const [orderError, setOrderError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
            address: '',
            apartment: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
            sameAsShipping: true,
            paymentMethod: 'card' as const,
            cardNumber: '',
            cardExpiry: '',
            cardCvc: '',
            cardName: '',
            orderNotes: '',
        },
    });

    // Fetch cart on mount
    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated, fetchCart]);

    // Pre-fill user email if authenticated
    useEffect(() => {
        if (user?.email) {
            setValue('email', user.email);
        }
    }, [user, setValue]);

    // Redirect if cart is empty
    useEffect(() => {
        if (!cartLoading && items.length === 0) {
            router.push('/cart');
        }
    }, [cartLoading, items, router]);

    const shippingCost = 0; // Free shipping
    const taxRate = 0.08; // 8% tax
    const subtotal = totalPrice;
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;

    const onSubmit = async (data: Record<string, unknown>) => {
        try {
            setIsSubmitting(true);
            setOrderError(null);

            // Create order
            const orderData = {
                shippingAddress: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    apartment: data.apartment,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    country: data.country,
                    phone: data.phone,
                },
                paymentMethod: data.paymentMethod,
                orderNotes: data.orderNotes,
            };

            const response = await api.post('/orders', orderData);
            const order = response.data;

            // Clear cart after successful order
            await clearCart();

            // Redirect to confirmation page
            router.push(`/order-confirmation/${order._id}`);
        } catch (error) {
            console.error('Order failed:', error);
            setOrderError('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)] py-8">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline mb-4"
                    >
                        <ArrowLeft size={18} />
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)]">
                        Checkout
                    </h1>
                </div>

                {orderError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {orderError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Contact Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">
                                        1
                                    </span>
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        {...register('email')}
                                        type="email"
                                        label="Email Address"
                                        placeholder="you@example.com"
                                        error={errors.email?.message}
                                        fullWidth
                                    />
                                    <Input
                                        {...register('phone')}
                                        type="tel"
                                        label="Phone Number"
                                        placeholder="+1 (555) 000-0000"
                                        error={errors.phone?.message}
                                        fullWidth
                                    />
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">
                                        2
                                    </span>
                                    <Truck size={20} className="text-[var(--color-gray-500)]" />
                                    Shipping Address
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            {...register('firstName')}
                                            label="First Name"
                                            placeholder="John"
                                            error={errors.firstName?.message}
                                            fullWidth
                                        />
                                        <Input
                                            {...register('lastName')}
                                            label="Last Name"
                                            placeholder="Doe"
                                            error={errors.lastName?.message}
                                            fullWidth
                                        />
                                    </div>
                                    <Input
                                        {...register('address')}
                                        label="Street Address"
                                        placeholder="123 Main St"
                                        error={errors.address?.message}
                                        fullWidth
                                    />
                                    <Input
                                        {...register('apartment')}
                                        label="Apartment, Suite, etc. (optional)"
                                        placeholder="Apt 4B"
                                        fullWidth
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <Input
                                            {...register('city')}
                                            label="City"
                                            placeholder="New York"
                                            error={errors.city?.message}
                                            fullWidth
                                        />
                                        <Input
                                            {...register('state')}
                                            label="State"
                                            placeholder="NY"
                                            error={errors.state?.message}
                                            fullWidth
                                        />
                                        <Input
                                            {...register('zipCode')}
                                            label="ZIP Code"
                                            placeholder="10001"
                                            error={errors.zipCode?.message}
                                            fullWidth
                                        />
                                        <Input
                                            {...register('country')}
                                            label="Country"
                                            placeholder="United States"
                                            error={errors.country?.message}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm">
                                        3
                                    </span>
                                    <CreditCard size={20} className="text-[var(--color-gray-500)]" />
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    {/* Payment Options */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label
                                            className={`
                        flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all
                        ${paymentMethod === 'card'
                                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                                    : 'border-[var(--color-gray-200)] hover:border-[var(--color-gray-300)]'
                                                }
                      `}
                                        >
                                            <input
                                                type="radio"
                                                {...register('paymentMethod')}
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                                className="w-4 h-4 text-[var(--color-primary)]"
                                            />
                                            <CreditCard size={24} className="text-[var(--color-gray-600)]" />
                                            <div>
                                                <p className="font-medium text-[var(--color-gray-900)]">Credit Card</p>
                                                <p className="text-sm text-[var(--color-gray-500)]">Pay securely with card</p>
                                            </div>
                                        </label>
                                        <label
                                            className={`
                        flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all
                        ${paymentMethod === 'cod'
                                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                                    : 'border-[var(--color-gray-200)] hover:border-[var(--color-gray-300)]'
                                                }
                      `}
                                        >
                                            <input
                                                type="radio"
                                                {...register('paymentMethod')}
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                                className="w-4 h-4 text-[var(--color-primary)]"
                                            />
                                            <ShoppingBag size={24} className="text-[var(--color-gray-600)]" />
                                            <div>
                                                <p className="font-medium text-[var(--color-gray-900)]">Cash on Delivery</p>
                                                <p className="text-sm text-[var(--color-gray-500)]">Pay when you receive</p>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Card Details */}
                                    {paymentMethod === 'card' && (
                                        <div className="mt-6 p-4 bg-[var(--color-gray-50)] rounded-xl space-y-4">
                                            <Input
                                                {...register('cardName')}
                                                label="Name on Card"
                                                placeholder="John Doe"
                                                fullWidth
                                            />
                                            <Input
                                                {...register('cardNumber')}
                                                label="Card Number"
                                                placeholder="4242 4242 4242 4242"
                                                fullWidth
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    {...register('cardExpiry')}
                                                    label="Expiry Date"
                                                    placeholder="MM/YY"
                                                    fullWidth
                                                />
                                                <Input
                                                    {...register('cardCvc')}
                                                    label="CVC"
                                                    placeholder="123"
                                                    fullWidth
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Notes */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-4">
                                    Order Notes (Optional)
                                </h2>
                                <textarea
                                    {...register('orderNotes')}
                                    className="w-full p-4 border border-[var(--color-gray-200)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] resize-none"
                                    rows={3}
                                    placeholder="Special instructions for your order..."
                                />
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                                <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-6">
                                    Order Summary
                                </h2>

                                {/* Cart Items */}
                                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6">
                                    {items.map((item) => (
                                        <div key={item.product._id} className="flex gap-4">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[var(--color-gray-100)] flex-shrink-0">
                                                {item.product.images?.[0]?.url ? (
                                                    <Image
                                                        src={item.product.images[0].url}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-[var(--color-gray-400)]">
                                                        No Image
                                                    </div>
                                                )}
                                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gray-600)] text-white text-xs flex items-center justify-center rounded-full">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[var(--color-gray-900)] truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-sm text-[var(--color-gray-500)]">
                                                    ${item.price.toFixed(2)} × {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium text-[var(--color-gray-900)]">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-t border-[var(--color-gray-200)] pt-4 space-y-3">
                                    <div className="flex justify-between text-[var(--color-gray-600)]">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-gray-600)]">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-gray-600)]">
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-[var(--color-gray-200)] pt-3">
                                        <div className="flex justify-between text-lg font-semibold text-[var(--color-gray-900)]">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    className="mt-6"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={18} />
                                            Place Order
                                        </>
                                    )}
                                </Button>

                                {/* Trust Badges */}
                                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[var(--color-gray-500)]">
                                    <span className="flex items-center gap-1">
                                        <Lock size={12} />
                                        Secure
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Check size={12} />
                                        Encrypted
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
