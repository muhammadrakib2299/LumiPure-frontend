'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Search, Eye, Download, Filter } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

interface Order {
    _id: string;
    orderNumber: string;
    user: { name: string; email: string };
    totalAmount: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
    items: any[];
}

// Demo data for testing
const demoOrders: Order[] = [
    {
        _id: '1',
        orderNumber: 'ORD-2024-001',
        user: { name: 'Sarah Johnson', email: 'sarah@example.com' },
        totalAmount: 149.97,
        status: 'delivered',
        paymentMethod: 'credit_card',
        createdAt: '2024-12-10T10:30:00Z',
        items: [{}, {}, {}],
    },
    {
        _id: '2',
        orderNumber: 'ORD-2024-002',
        user: { name: 'Michael Chen', email: 'michael@example.com' },
        totalAmount: 89.99,
        status: 'processing',
        paymentMethod: 'paypal',
        createdAt: '2024-12-11T14:20:00Z',
        items: [{}, {}],
    },
    {
        _id: '3',
        orderNumber: 'ORD-2024-003',
        user: { name: 'Emma Williams', email: 'emma@example.com' },
        totalAmount: 234.50,
        status: 'shipped',
        paymentMethod: 'credit_card',
        createdAt: '2024-12-11T16:45:00Z',
        items: [{}, {}, {}, {}],
    },
    {
        _id: '4',
        orderNumber: 'ORD-2024-004',
        user: { name: 'James Brown', email: 'james@example.com' },
        totalAmount: 59.99,
        status: 'pending',
        paymentMethod: 'bank_transfer',
        createdAt: '2024-12-12T09:15:00Z',
        items: [{}],
    },
    {
        _id: '5',
        orderNumber: 'ORD-2024-005',
        user: { name: 'Olivia Davis', email: 'olivia@example.com' },
        totalAmount: 179.99,
        status: 'processing',
        paymentMethod: 'credit_card',
        createdAt: '2024-12-12T11:30:00Z',
        items: [{}, {}, {}],
    },
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);

            // Check if in demo mode
            const isDemoMode = localStorage.getItem('admin_demo_mode') === 'true';

            if (isDemoMode) {
                // Use demo data
                setTimeout(() => {
                    setOrders(demoOrders);
                    setIsLoading(false);
                }, 500);
            } else {
                // Fetch real data
                const response = await api.get('/orders');
                setOrders(response.data || []);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            // Fallback to demo data
            setOrders(demoOrders);
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-gray-600 mt-1">
                            Manage customer orders and fulfillment
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download size={20} />
                        Export
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search by order number, customer name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="
                                    w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
                                    focus:border-[var(--color-primary)]
                                "
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="
                                    w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
                                    focus:border-[var(--color-primary)]
                                "
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-500">
                            Loading orders...
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <p className="text-lg mb-2">No orders found</p>
                            <p className="text-sm">
                                {searchQuery || statusFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Orders will appear here once customers place them'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Payment
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">
                                                    #{order.orderNumber || order._id.slice(-8)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {order.items?.length || 0} items
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {order.user?.name || 'Guest'}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {order.user?.email || 'N/A'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">
                                                    ${order.totalAmount?.toFixed(2) || '0.00'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600 capitalize">
                                                    {order.paymentMethod || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/orders/${order._id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                                                >
                                                    <Eye size={16} />
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Summary */}
                {!isLoading && filteredOrders.length > 0 && (
                    <div className="text-sm text-gray-600">
                        Showing {filteredOrders.length} of {orders.length} orders
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
