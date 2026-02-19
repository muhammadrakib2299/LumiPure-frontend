'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const footerLinks = {
    shop: [
        { href: '/shop', label: 'All Products' },
        { href: '/new-arrivals', label: 'New Arrivals' },
        { href: '/bestsellers', label: 'Bestsellers' },
        { href: '/sale', label: 'Sale' },
        { href: '/gift-cards', label: 'Gift Cards' },
    ],
    support: [
        { href: '/contact', label: 'Contact Us' },
        { href: '/faq', label: 'FAQs' },
        { href: '/shipping', label: 'Shipping Info' },
        { href: '/returns', label: 'Returns & Exchanges' },
        { href: '/track-order', label: 'Track Order' },
    ],
    company: [
        { href: '/about', label: 'About Us' },
        { href: '/sustainability', label: 'Sustainability' },
        { href: '/ingredients', label: 'Ingredients' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press' },
    ],
};

const socialLinks = [
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1a1a2e] text-gray-300">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-secondary)]" />

            {/* Main Content */}
            <div className="container mx-auto px-5 sm:px-6 lg:px-10">
                {/* Upper section - Logo + Nav links in a balanced 5-column grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 py-12 lg:py-14">
                    {/* Brand - spans 2 cols */}
                    <div className="col-span-2">
                        <Link href="/" className="inline-block">
                            <span className="font-display text-2xl font-bold text-white tracking-tight">
                                Lumi<span className="text-[var(--color-primary-light)]">Pure</span>
                            </span>
                        </Link>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">
                            Premium skincare crafted with organic botanicals.
                            Nature-powered beauty for radiant, healthy skin.
                        </p>

                        {/* Social */}
                        <div className="flex items-center gap-3 mt-5">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[var(--color-primary)] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                                    aria-label={social.label}
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                            Shop
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                            Support
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:hello@lumipure.com"
                                    className="flex items-start gap-2.5 text-[13px] text-gray-400 hover:text-white transition-colors group"
                                >
                                    <Mail size={14} className="mt-0.5 shrink-0" />
                                    hello@lumipure.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+1234567890"
                                    className="flex items-start gap-2.5 text-[13px] text-gray-400 hover:text-white transition-colors group"
                                >
                                    <Phone size={14} className="mt-0.5 shrink-0" />
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5 text-[13px] text-gray-400">
                                <MapPin size={14} className="mt-0.5 shrink-0" />
                                New York, NY 10001
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-gray-500">
                    <p className="flex items-center gap-1">
                        &copy; {currentYear} LumiPure. Made with
                        <Heart size={10} className="text-red-400 fill-red-400" />
                        All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
