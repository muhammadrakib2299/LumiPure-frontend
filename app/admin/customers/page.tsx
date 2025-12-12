'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Search, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    totalOrders: number;
    totalSpent: number;
    joinedDate: string;
    status: 'active' | 'inactive';
}

// Demo customers
const demoCustomers: Customer[] = [
    {
        _id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        totalOrders: 12,
        totalSpent: 1240.50,
        joinedDate: '2024-01-15',
        status: 'active',
    },
    {
        _id: '2',
        name: 'Michael Chen',
        email: 'michael@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, USA',
        totalOrders: 8,
        totalSpent: 680.00,
        joinedDate: '2024-02-20',
        status: 'active',
    },
    {
        _id: '3',
        name: 'Emma Williams',
        email: 'emma@example.com',
        phone: '+1 (555) 345-6789',
        location: 'Los Angeles, USA',
        totalOrders: 15,
        totalSpent: 1850.75,
        joinedDate: '2023-11-10',
        status: 'active',
    },
    {
        _id: '4',
        name: 'James Brown',
        email: 'james@example.com',
        phone: '+1 (555) 456-7890',
        location: 'Chicago, USA',
        totalOrders: 5,
        totalSpent: 425.30,
        joinedDate: '2024-03-05',
        status: 'active',
    },
    {
        _id: '5',
        name: 'Olivia Davis',
        email: 'olivia@example.com',
        phone: '+1 (555) 567-8901',
        location: 'Miami, USA',
        totalOrders: 20,
        totalSpent: 2340.00,
        joinedDate: '2023-09-18',
        status: 'active',
    },
    {
        _id: '6',
        name: 'William Miller',
        email: 'william@example.com',
        phone: '+1 (555) 678-9012',
        location: 'Boston, USA',
        totalOrders: 3,
        totalSpent: 189.99,
        joinedDate: '2024-04-22',
        status: 'inactive',
    },
];

export default function AdminCustomersPage() {
    const [customers] = useState<Customer[]>(demoCustomers);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-600 mt-1">Manage your customer base</p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="relative">
                        <Search
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search customers by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="
                                w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
                                focus:border-[var(--color-primary)]
                            "
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                        <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <p className="text-sm text-gray-600 mb-1">Active</p>
                        <p className="text-3xl font-bold text-green-600">
                            {customers.filter((c) => c.status === 'active').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-[var(--color-primary)]">
                            ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Customers Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Orders
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Total Spent
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-medium">
                                                    {customer.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{customer.name}</p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <MapPin size={12} />
                                                        {customer.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <Mail size={14} />
                                                    {customer.email}
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <Phone size={14} />
                                                    {customer.phone}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">
                                                {customer.totalOrders}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">
                                                ${customer.totalSpent.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                                <Calendar size={14} />
                                                {new Date(customer.joinedDate).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}
                                            >
                                                {customer.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary */}
                <div className="text-sm text-gray-600">
                    Showing {filteredCustomers.length} of {customers.length} customers
                </div>
            </div>
        </AdminLayout>
    );
}
