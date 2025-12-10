"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Shop All", href: "/products" },
        { name: "Best Sellers", href: "/products?filter=best-sellers" },
        { name: "New Arrivals", href: "/products?filter=new" },
        { name: "About Us", href: "/about" },
    ];

    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-[#4A7C59] text-white text-[10px] md:text-xs py-2 text-center tracking-wider font-medium uppercase">
                Free Shipping on Orders Over $50 | 30-Day Returns
            </div>

            <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden hover:text-[#4A7C59] transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-[#2A2A2A]" />
                        ) : (
                            <Menu className="w-6 h-6 text-[#2A2A2A]" />
                        )}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-serif text-2xl font-bold tracking-tight text-[#2A2A2A]">
                            Lumi<span className="italic font-light text-[#4A7C59]">Pure</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-[#2A2A2A] hover:text-[#4A7C59] transition-colors uppercase tracking-wide text-[11px]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-5 text-[#2A2A2A]">
                        <button className="hover:text-[#4A7C59] transition-colors hidden sm:block">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="hover:text-[#4A7C59] transition-colors hidden sm:block">
                            <User className="w-5 h-5" />
                        </button>
                        <Link href="/cart" className="hover:text-[#4A7C59] transition-colors relative flex items-center gap-2 group">
                            <div className="relative">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-[#D48C70] text-white text-[9px] w-3 h-3 rounded-full flex items-center justify-center font-bold">
                                    2
                                </span>
                            </div>
                            <span className="text-xs font-medium hidden lg:block group-hover:text-[#4A7C59]">$124.00</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="py-3 text-sm font-medium text-[#2A2A2A] border-b border-gray-50 last:border-none hover:text-[#4A7C59]"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-[#2A2A2A]">
                                <span className="text-xs font-bold uppercase">Account</span>
                                <span className="text-xs font-bold uppercase">Search</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
