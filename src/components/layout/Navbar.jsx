"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useCartStore from "@/stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-gray-100"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <span className={cn(
                        "text-3xl font-serif font-bold tracking-tight transition-colors duration-300",
                        isScrolled ? "text-primary-900" : "text-primary-900"
                    )}>
                        LumiPure
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium tracking-wide transition-colors relative group",
                                isScrolled ? "text-gray-700 hover:text-primary-900" : "text-gray-800 hover:text-primary-900"
                            )}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary-400 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <button className={cn("transition-colors hover:text-primary-600", isScrolled ? "text-gray-700" : "text-gray-800")}>
                        <Search className="w-5 h-5" />
                    </button>

                    <Link href="/login" className={cn("transition-colors hover:text-primary-600", isScrolled ? "text-gray-700" : "text-gray-800")}>
                        <User className="w-5 h-5" />
                    </Link>

                    <Link href="/cart" className={cn("relative transition-colors hover:text-primary-600", isScrolled ? "text-gray-700" : "text-gray-800")}>
                        <ShoppingBag className="w-5 h-5" />
                        {cart.length > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white shadow-sm"
                            >
                                {cart.length}
                            </motion.span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-800"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-700 hover:text-primary-900 hover:translate-x-2 transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
