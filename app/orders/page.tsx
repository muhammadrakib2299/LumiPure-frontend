'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Package,
    Eye,
    Loader2,
    ShoppingBag,
    ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';
import api from '@/lib/api';

interface OrderItem {
    product: {
        _id: string;
        name: string;
    };
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    orderNumber: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    processing: { bg: 'bg-blue-100', text: 'text-blue-700' },
    shipped: { bg: 'bg-purple-100', text: 'text-purple-700' },
    delivered: { bg: 'bg-green-100', text: 'text-green-700' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function OrdersPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=/orders');
            return;
        }

        async function fetchOrders() {
            try {
                const response = await api.get('/orders/my-orders');
                setOrders(response.data.orders || response.data || []);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Failed to load orders');
            } finally {
                setIsLoading(false);
            }
        }

        fetchOrders();
    }, [isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    // Empty State
    if (!isLoading && orders.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--color-gray-50)] py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)] mb-8">
                        My Orders
                    </h1>
                    <div className="max-w-md mx-auto text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-gray-100)] flex items-center justify-center">
                            <ShoppingBag size={40} className="text-[var(--color-gray-400)]" />
                        </div>
                        <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-2">
                            No orders yet
                        </h2>
                        <p className="text-[var(--color-gray-500)] mb-8">
                            You haven&apos;t placed any orders. Start shopping to see your orders here.
                        </p>
                        <Link href="/shop">
                            <Button size="lg">
                                Start Shopping
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
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)]">
                        My Orders
                    </h1>
                    <p className="text-[var(--color-gray-500)] mt-1">
                        Track and manage your orders
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.map((order) => {
                        const statusStyle = statusColors[order.status] || statusColors.pending;
                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    {/* Order Info */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                                            <Package size={24} className="text-[var(--color-primary)]" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-semibold text-[var(--color-gray-900)]">
                                                    Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                                                </h3>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[var(--color-gray-500)]">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                            <p className="text-sm text-[var(--color-gray-500)] mt-1">
                                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="flex items-center justify-between lg:justify-end gap-6">
                                        <div className="text-right">
                                            <p className="text-sm text-[var(--color-gray-500)]">Total</p>
                                            <p className="text-lg font-semibold text-[var(--color-gray-900)]">
                                                ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                        <Link href={`/order-confirmation/${order._id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye size={16} />
                                                View Details
                                                <ChevronRight size={16} />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Order Items Preview */}
                                <div className="mt-4 pt-4 border-t border-[var(--color-gray-100)]">
                                    <div className="flex flex-wrap gap-2">
                                        {order.items.slice(0, 3).map((item, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[var(--color-gray-50)] rounded-full text-sm text-[var(--color-gray-600)]"
                                            >
                                                {item.product.name} × {item.quantity}
                                            </span>
                                        ))}
                                        {order.items.length > 3 && (
                                            <span className="px-3 py-1 bg-[var(--color-gray-50)] rounded-full text-sm text-[var(--color-gray-500)]">
                                                +{order.items.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
