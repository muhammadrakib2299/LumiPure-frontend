'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
    CheckCircle,
    Package,
    Truck,
    MapPin,
    CreditCard,
    Loader2,
    ArrowRight,
    Mail,
} from 'lucide-react';
import { Button } from '@/components/ui';
import api from '@/lib/api';

interface OrderItem {
    product: {
        _id: string;
        name: string;
        price: number;
    };
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    orderNumber: string;
    items: OrderItem[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        address: string;
        apartment?: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
    };
    paymentMethod: string;
    totalPrice: number;
    status: string;
    createdAt: string;
}

interface OrderConfirmationPageProps {
    params: Promise<{ id: string }>;
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
    const { id } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await api.get(`/orders/${id}`);
                setOrder(response.data.order || response.data);
            } catch (err) {
                console.error('Failed to fetch order:', err);
                setError('Order not found');
            } finally {
                setIsLoading(false);
            }
        }
        fetchOrder();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold text-[var(--color-gray-900)]">Order Not Found</h1>
                <p className="text-[var(--color-gray-500)]">{error || 'Unable to find this order.'}</p>
                <Link href="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)] py-12">
            <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
                {/* Success Header */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)] mb-2">
                        Thank you for your order!
                    </h1>
                    <p className="text-[var(--color-gray-600)]">
                        Your order has been successfully placed and is being processed.
                    </p>
                </div>

                {/* Order Number */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--color-gray-500)]">Order Number</p>
                            <p className="text-xl font-semibold text-[var(--color-gray-900)]">
                                #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-[var(--color-gray-500)]">Order Date</p>
                            <p className="font-medium text-[var(--color-gray-900)]">
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Status Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-semibold text-[var(--color-gray-900)] mb-6">Order Status</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                                <CheckCircle size={20} />
                            </div>
                            <p className="text-xs mt-2 text-[var(--color-gray-600)]">Confirmed</p>
                        </div>
                        <div className="flex-1 h-1 mx-2 bg-[var(--color-gray-200)]" />
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-[var(--color-gray-200)] text-[var(--color-gray-400)]'
                                }`}>
                                <Package size={20} />
                            </div>
                            <p className="text-xs mt-2 text-[var(--color-gray-600)]">Processing</p>
                        </div>
                        <div className="flex-1 h-1 mx-2 bg-[var(--color-gray-200)]" />
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'shipped' || order.status === 'delivered'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-[var(--color-gray-200)] text-[var(--color-gray-400)]'
                                }`}>
                                <Truck size={20} />
                            </div>
                            <p className="text-xs mt-2 text-[var(--color-gray-600)]">Shipped</p>
                        </div>
                        <div className="flex-1 h-1 mx-2 bg-[var(--color-gray-200)]" />
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-[var(--color-gray-200)] text-[var(--color-gray-400)]'
                                }`}>
                                <CheckCircle size={20} />
                            </div>
                            <p className="text-xs mt-2 text-[var(--color-gray-600)]">Delivered</p>
                        </div>
                    </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin size={20} className="text-[var(--color-primary)]" />
                            <h3 className="font-semibold text-[var(--color-gray-900)]">Shipping Address</h3>
                        </div>
                        <div className="text-sm text-[var(--color-gray-600)] space-y-1">
                            <p className="font-medium text-[var(--color-gray-900)]">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                            </p>
                            <p>{order.shippingAddress.address}</p>
                            {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                            <p>
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </p>
                            <p>{order.shippingAddress.country}</p>
                            <p className="mt-2">{order.shippingAddress.phone}</p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard size={20} className="text-[var(--color-primary)]" />
                            <h3 className="font-semibold text-[var(--color-gray-900)]">Payment Method</h3>
                        </div>
                        <p className="text-sm text-[var(--color-gray-600)]">
                            {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                        </p>
                        <div className="mt-4 pt-4 border-t border-[var(--color-gray-100)]">
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--color-gray-600)]">Total Paid</span>
                                <span className="font-semibold text-[var(--color-gray-900)]">
                                    ${order.totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <h3 className="font-semibold text-[var(--color-gray-900)] mb-4">Order Items</h3>
                    <div className="space-y-4">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-3 border-b border-[var(--color-gray-100)] last:border-0">
                                <div>
                                    <p className="font-medium text-[var(--color-gray-900)]">{item.product.name}</p>
                                    <p className="text-sm text-[var(--color-gray-500)]">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium text-[var(--color-gray-900)]">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Notification */}
                <div className="bg-[var(--color-primary)]/5 rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-4">
                        <Mail size={24} className="text-[var(--color-primary)] flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-[var(--color-gray-900)] mb-1">
                                Confirmation email sent
                            </h3>
                            <p className="text-sm text-[var(--color-gray-600)]">
                                We&apos;ve sent an order confirmation to your email address with all the details.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/orders" className="flex-1">
                        <Button variant="outline" fullWidth size="lg">
                            View All Orders
                        </Button>
                    </Link>
                    <Link href="/shop" className="flex-1">
                        <Button fullWidth size="lg">
                            Continue Shopping
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
