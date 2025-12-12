import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

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
        <footer className="bg-[var(--color-gray-900)] text-[var(--color-gray-300)]">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-display text-2xl font-semibold text-white">
                                Lumi<span className="text-[var(--color-primary-light)]">Pure</span>
                            </span>
                        </Link>
                        <p className="text-[var(--color-gray-400)] leading-relaxed mb-6 max-w-sm">
                            Natural beauty, pure ingredients. We create premium skincare products
                            with organic botanicals and sustainable practices for radiant, healthy skin.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <a
                                href="mailto:hello@lumipure.com"
                                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                            >
                                <Mail size={16} />
                                <span>hello@lumipure.com</span>
                            </a>
                            <a
                                href="tel:+1234567890"
                                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                            >
                                <Phone size={16} />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin size={16} />
                                <span>New York, NY 10001</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
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
                    transition-all duration-200
                  "
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-white hover:pl-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-white hover:pl-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-white hover:pl-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-gray-800)]">
                <div className="container mx-auto px-4 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-gray-500)]">
                        <p>© {currentYear} LumiPure. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
