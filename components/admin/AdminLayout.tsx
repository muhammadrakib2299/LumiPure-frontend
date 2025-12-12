'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Tag,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { AdminProtection } from './AdminProtection';

const sidebarLinks = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
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
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('admin_demo_mode');
        router.push('/admin/login');
    };

    const isActiveLink = (href: string, exact?: boolean) => {
        if (exact) {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    return (
        <AdminProtection>
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
                    <div className="h-24 px-6 flex items-center justify-between border-b ">

                        <h1 className="text-base font-bold text-black">LumiPure</h1>

                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 flex-1 overflow-y-auto">
                        <div className="space-y-1">
                            {sidebarLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActiveLink(link.href, link.exact);

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-lg
                                            font-medium transition-all duration-200
                                            ${active
                                                ? 'bg-[var(--color-primary)] text-white shadow-md'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)]'
                                            }
                                        `}
                                    >
                                        <Icon size={20} className={active ? 'text-white' : ''} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* User Info & Logout */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white rounded-lg border border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold shadow-md">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.name || 'Demo Admin'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email || 'demo@lumipure.com'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="
                                w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                                bg-red-50 text-red-600 hover:bg-red-100 
                                font-medium transition-colors
                            "
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:ml-64">
                    {/* Page Content */}
                    <main className="p-6 min-h-[calc(100vh-4rem)]">{children}</main>
                </div>
            </div>
        </AdminProtection>
    );
}
