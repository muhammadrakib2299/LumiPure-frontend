'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, User, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { MobileMenu } from './MobileMenu';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/bestsellers', label: 'Bestsellers' },
    { href: '/about', label: 'About' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useAuthStore();
    const { items } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`
          fixed top-0 left-0 right-0 z-40
          transition-all duration-300
          ${isScrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
                        : 'bg-transparent py-5'
                    }
        `}
            >
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Left: Hamburger (Mobile) + Logo */}
                        <div className="flex items-center gap-4">
                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>

                            {/* Logo */}
                            <Logo variant={isScrolled ? 'dark' : 'dark'} size="md" />
                        </div>

                        {/* Center: Navigation Links (Desktop) */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                    text-sm font-medium uppercase tracking-wide
                    transition-colors duration-200
                    hover:text-[var(--color-primary)]
                    ${isScrolled
                                            ? 'text-[var(--color-gray-700)]'
                                            : 'text-[var(--color-gray-700)]'
                                        }
                  `}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right: Search, Wishlist, Cart, Account */}
                        <div className="flex items-center gap-2">
                            {/* Search */}
                            <SearchBar className="hidden sm:block" />

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="
                  hidden sm:flex p-2
                  text-[var(--color-gray-600)] hover:text-[var(--color-primary)]
                  transition-colors
                "
                            >
                                <Heart size={20} />
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="
                  relative p-2
                  text-[var(--color-gray-600)] hover:text-[var(--color-primary)]
                  transition-colors
                "
                            >
                                <ShoppingCart size={20} />
                                {mounted && cartItemCount > 0 && (
                                    <span
                                        className="
                      absolute -top-0.5 -right-0.5
                      w-5 h-5 flex items-center justify-center
                      bg-[var(--color-primary)] text-white
                      text-xs font-medium rounded-full
                    "
                                    >
                                        {cartItemCount > 9 ? '9+' : cartItemCount}
                                    </span>
                                )}
                            </Link>

                            {/* Account */}
                            <Link
                                href={mounted && isAuthenticated ? '/account' : '/login'}
                                className="
                  p-2
                  text-[var(--color-gray-600)] hover:text-[var(--color-primary)]
                  transition-colors
                "
                            >
                                <User size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="h-[var(--navbar-height)]" />
        </>
    );
}
