'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';

interface Stats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    revenueChange: number;
    ordersChange: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats>({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
        revenueChange: 0,
        ordersChange: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setIsLoading(true);
            // For now, we'll use mock data
            // TODO: Connect to actual API endpoints
            setStats({
                totalRevenue: 45789.50,
                totalOrders: 234,
                totalCustomers: 1567,
                totalProducts: 10,
                revenueChange: 12.5,
                ordersChange: -3.2,
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Revenue',
            value: `$${stats.totalRevenue.toLocaleString()}`,
            change: stats.revenueChange,
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders.toString(),
            change: stats.ordersChange,
            icon: ShoppingCart,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Total Customers',
            value: stats.totalCustomers.toString(),
            change: 8.3,
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            title: 'Total Products',
            value: stats.totalProducts.toString(),
            change: 0,
            icon: Package,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Overview of your store performance
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        const isPositive = stat.change > 0;

                        return (
                            <div
                                key={stat.title}
                                className="bg-white rounded-lg p-6 border border-gray-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <Icon size={24} className={stat.color} />
                                    </div>
                                    {stat.change !== 0 && (
                                        <div
                                            className={`flex items-center gap-1 text-sm font-medium ${isPositive
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                                }`}
                                        >
                                            {isPositive ? (
                                                <ArrowUp size={16} />
                                            ) : (
                                                <ArrowDown size={16} />
                                            )}
                                            {Math.abs(stat.change)}%
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">
                                    {stat.title}
                                </h3>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/admin/products/new"
                            className="
                                flex items-center gap-3 p-4 rounded-lg border-2 border-dashed
                                border-gray-300 hover:border-[var(--color-primary)]
                                hover:bg-[var(--color-primary)]/5 transition-colors
                            "
                        >
                            <Package size={24} className="text-gray-600" />
                            <div>
                                <p className="font-medium text-gray-900">Add Product</p>
                                <p className="text-sm text-gray-500">
                                    Create a new product
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="
                                flex items-center gap-3 p-4 rounded-lg border-2 border-dashed
                                border-gray-300 hover:border-[var(--color-primary)]
                                hover:bg-[var(--color-primary)]/5 transition-colors
                            "
                        >
                            <ShoppingCart size={24} className="text-gray-600" />
                            <div>
                                <p className="font-medium text-gray-900">View Orders</p>
                                <p className="text-sm text-gray-500">
                                    Manage customer orders
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="/admin/categories"
                            className="
                                flex items-center gap-3 p-4 rounded-lg border-2 border-dashed
                                border-gray-300 hover:border-[var(--color-primary)]
                                hover:bg-[var(--color-primary)]/5 transition-colors
                            "
                        >
                            <TrendingUp size={24} className="text-gray-600" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    Manage Categories
                                </p>
                                <p className="text-sm text-gray-500">
                                    Organize your products
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Activity
                    </h2>
                    <div className="text-center py-12 text-gray-500">
                        <p>Activity feed will appear here</p>
                        <p className="text-sm mt-1">
                            Track recent orders, product updates, and customer activity
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
