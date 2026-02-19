'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, User, LogOut, ShoppingBag, Heart } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/shop', label: 'All Products' },
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/bestsellers', label: 'Bestsellers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const { user, isAuthenticated, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleLogout = () => {
        logout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 animate-fade-in" />

            {/* Menu Panel */}
            <div
                ref={menuRef}
                className="
          absolute left-0 top-0 bottom-0
          w-[280px] max-w-[85vw]
          bg-white shadow-xl
          flex flex-col
          animate-slide-left
        "
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-gray-200)]">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="font-display text-xl font-semibold text-[var(--color-gray-900)]"
                    >
                        Lumi<span className="text-[var(--color-primary)]">Pure</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)] transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="
                    block px-6 py-3
                    text-[var(--color-gray-700)] hover:text-[var(--color-primary)]
                    hover:bg-[var(--color-gray-50)]
                    transition-colors
                    font-medium
                  "
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User Section */}
                <div className="border-t border-[var(--color-gray-200)] p-4">
                    {mounted && isAuthenticated && user ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 px-2 py-2">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                                    <User size={20} className="text-[var(--color-primary-dark)]" />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--color-gray-900)]">{user.name}</p>
                                    <p className="text-sm text-[var(--color-gray-500)]">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Link
                                    href="/orders"
                                    onClick={onClose}
                                    className="
                    flex items-center gap-3 px-4 py-2.5 rounded-lg
                    text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]
                    transition-colors
                  "
                                >
                                    <ShoppingBag size={18} />
                                    <span>My Orders</span>
                                </Link>
                                <Link
                                    href="/wishlist"
                                    onClick={onClose}
                                    className="
                    flex items-center gap-3 px-4 py-2.5 rounded-lg
                    text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]
                    transition-colors
                  "
                                >
                                    <Heart size={18} />
                                    <span>Wishlist</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                    text-[var(--color-error)] hover:bg-red-50
                    transition-colors
                  "
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link
                                href="/login"
                                onClick={onClose}
                                className="
                  flex-1 py-2.5 text-center rounded-lg
                  border-2 border-[var(--color-primary)] text-[var(--color-primary)]
                  font-medium hover:bg-[var(--color-primary)] hover:text-white
                  transition-colors
                "
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={onClose}
                                className="
                  flex-1 py-2.5 text-center rounded-lg
                  bg-[var(--color-primary)] text-white
                  font-medium hover:bg-[var(--color-primary-dark)]
                  transition-colors
                "
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
