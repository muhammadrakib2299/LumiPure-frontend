'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    TrendingUp,
    DollarSign,
    Tag,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const sidebarLinks = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/admin/categories', icon: Tag, label: 'Categories' },
    { href: '/admin/customers', icon: Users, label: 'Customers' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
                    transition-transform duration-300 lg:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200">
                    <h1 className="text-xl font-bold text-[var(--color-primary)]">
                        LumiPure Admin
                    </h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="
                                    flex items-center gap-3 px-4 py-3 rounded-lg
                                    text-gray-700 hover:bg-[var(--color-primary)]/10
                                    hover:text-[var(--color-primary)] transition-colors
                                "
                            >
                                <Icon size={20} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info & Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-medium">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user?.name || 'Admin User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user?.email || 'admin@lumipure.com'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="
                            w-full flex items-center gap-3 px-4 py-3 rounded-lg
                            text-red-600 hover:bg-red-50 transition-colors
                        "
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Welcome back, {user?.name || 'Admin'}!
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
