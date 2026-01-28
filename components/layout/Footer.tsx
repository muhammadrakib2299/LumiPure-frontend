'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, Send, Heart } from 'lucide-react';
import { useState } from 'react';

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
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer className="bg-[var(--color-gray-900)] text-[var(--color-gray-300)]">

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Section - Takes full width on mobile/tablet, 4 columns on desktop */}
                    <div className="lg:col-span-4 flex flex-col items-start">
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                                Lumi<span className="text-[var(--color-primary)]">Pure</span>
                            </span>
                        </Link>
                        <p className="text-[var(--color-gray-400)] leading-relaxed mb-8 text-sm md:text-base max-w-sm">
                            Crafting premium skincare with organic botanicals and sustainable practices.
                            Experience the power of nature for radiant, healthy skin.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4 mb-8 w-full">
                            <a
                                href="mailto:hello@lumipure.com"
                                className="flex items-center gap-4 text-sm text-[var(--color-gray-400)] hover:text-[var(--color-primary)] transition-colors duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-[var(--color-gray-800)] flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                                    <Mail size={16} className="group-hover:text-[var(--color-primary)]" />
                                </div>
                                <span>hello@lumipure.com</span>
                            </a>
                            <a
                                href="tel:+1234567890"
                                className="flex items-center gap-4 text-sm text-[var(--color-gray-400)] hover:text-[var(--color-primary)] transition-colors duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-[var(--color-gray-800)] flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                                    <Phone size={16} className="group-hover:text-[var(--color-primary)]" />
                                </div>
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className="flex items-center gap-4 text-sm text-[var(--color-gray-400)] group">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-gray-800)] flex items-center justify-center">
                                    <MapPin size={16} />
                                </div>
                                <span>New York, NY 10001</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">
                                Follow Us
                            </p>
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            w-10 h-10 rounded-full
                                            bg-[var(--color-gray-800)] hover:bg-[var(--color-primary)]
                                            flex items-center justify-center
                                            text-[var(--color-gray-400)] hover:text-white
                                            transition-colors duration-300
                                            hover:-translate-y-1 transform
                                        "
                                        aria-label={social.label}
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links Grid - 2 columns on mobile/tablet, 8 columns on desktop (distributed) */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
                        {/* Shop Links */}
                        <div className="col-span-1">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                                Shop
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.shop.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div className="col-span-1">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                                Support
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.support.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                                Company
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-gray-800)]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                        <p className="text-[var(--color-gray-500)] flex items-center gap-2 text-center sm:text-left">
                            © {currentYear} LumiPure. Made with
                            <Heart size={14} className="text-red-500 fill-red-500" />
                            All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                            <Link
                                href="/privacy"
                                className="text-[var(--color-gray-500)] hover:text-white transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-[var(--color-gray-500)] hover:text-white transition-colors duration-200"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-[var(--color-gray-500)] hover:text-white transition-colors duration-200"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
