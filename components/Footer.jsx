"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#F9F9F9] text-[#2A2A2A] pt-16 pb-8 border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-serif text-2xl font-bold tracking-tight">
                                Lumi<span className="italic font-light text-[#4A7C59]">Pure</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Clean, conscious beauty for the modern minimalist.
                            Certified organic ingredients.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#4A7C59] hover:border-[#4A7C59] transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#4A7C59] hover:border-[#4A7C59] transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#4A7C59] hover:border-[#4A7C59] transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-5">Shop</h3>
                        <ul className="space-y-3">
                            {['Skincare', 'Hair Care', 'Body', 'Wellness', 'Sets & Kits'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-600 hover:text-[#4A7C59] transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-5">Company</h3>
                        <ul className="space-y-3">
                            {['Our Story', 'Ingredients', 'Sustainability', 'Blog', 'Careers'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-gray-600 hover:text-[#4A7C59] transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-5">Stay in the Glow</h3>
                        <p className="text-xs text-gray-500 mb-4">
                            Sign up for 10% off your first order and early access to new launches.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#4A7C59] transition-colors"
                            />
                            <button className="w-full bg-[#2A2A2A] text-white px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#4A7C59] transition-colors rounded-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} LumiPure Beauty. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-[#4A7C59]">Privacy Policy</Link>
                        <Link href="#" className="hover:text-[#4A7C59]">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
