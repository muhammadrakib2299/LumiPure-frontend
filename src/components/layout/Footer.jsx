import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary-50 pt-16 pb-8 border-t border-secondary-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-primary-900">LumiPure</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Curated beauty products for the modern individual. Pure, effective, and luxurious.
                        </p>
                        <div className="flex space-x-4">
                            <span className="p-2 bg-white rounded-full shadow-sm text-primary-900 hover:bg-primary-900 hover:text-white transition-colors cursor-pointer">
                                <Instagram className="w-4 h-4" />
                            </span>
                            <span className="p-2 bg-white rounded-full shadow-sm text-primary-900 hover:bg-primary-900 hover:text-white transition-colors cursor-pointer">
                                <Facebook className="w-4 h-4" />
                            </span>
                            <span className="p-2 bg-white rounded-full shadow-sm text-primary-900 hover:bg-primary-900 hover:text-white transition-colors cursor-pointer">
                                <Twitter className="w-4 h-4" />
                            </span>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="font-serif font-bold text-primary-900 mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/products" className="hover:text-primary-900">All Products</Link></li>
                            <li><Link href="/products?category=skincare" className="hover:text-primary-900">Skincare</Link></li>
                            <li><Link href="/products?category=makeup" className="hover:text-primary-900">Makeup</Link></li>
                            <li><Link href="/products?category=hair" className="hover:text-primary-900">Hair Care</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="font-serif font-bold text-primary-900 mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/about" className="hover:text-primary-900">Our Story</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-900">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary-900">Shipping & Returns</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary-900">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif font-bold text-primary-900 mb-6">Stay in the Glow</h4>
                        <p className="text-sm text-gray-600 mb-4">Subscribe for exclusive offers and beauty tips.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg border border-secondary-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-900 bg-white"
                            />
                            <button className="bg-primary-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-secondary-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-secondary-500">
                    <p>© {new Date().getFullYear()} LumiPure. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span>Terms of Service</span>
                        <span>Cookie Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
