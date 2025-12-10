"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useCartStore from "@/stores/useCartStore";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart } = useCartStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Shop" },
        { href: "/about", label: "Our Story" },
        { href: "/blog", label: "Journal" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm py-4 border-b border-gray-100"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-primary-900">
                    LumiPure
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-gray-700 hover:text-primary-900 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <button className="text-gray-700 hover:text-primary-900 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link href="/login" className="text-gray-700 hover:text-primary-900 transition-colors">
                        <User className="w-5 h-5" />
                    </Link>

                    <Link href="/cart" className="relative text-gray-700 hover:text-primary-900 transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-900 text-[10px] text-white">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-lg animate-in slide-in-from-top-2">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-base font-medium text-gray-700 hover:text-primary-900"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
