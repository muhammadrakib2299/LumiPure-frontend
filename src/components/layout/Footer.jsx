import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary-50 pt-20 pb-10 border-t border-secondary-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="block">
                            <h3 className="text-3xl font-serif font-bold text-primary-900 tracking-tight">LumiPure</h3>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Curated beauty products for the modern individual. Pure, effective, and luxurious. Elevate your ritual.
                        </p>
                        <div className="flex space-x-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="p-2.5 bg-white rounded-full shadow-sm text-primary-800 hover:bg-primary-900 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-serif font-bold text-lg text-primary-900 mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li><Link href="/products" className="hover:text-primary-800 hover:pl-2 transition-all block">All Products</Link></li>
                            <li><Link href="/products?category=skincare" className="hover:text-primary-800 hover:pl-2 transition-all block">Skincare</Link></li>
                            <li><Link href="/products?category=body" className="hover:text-primary-800 hover:pl-2 transition-all block">Body Care</Link></li>
                            <li><Link href="/products?category=sets" className="hover:text-primary-800 hover:pl-2 transition-all block">Gift Sets</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-serif font-bold text-lg text-primary-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li><Link href="/about" className="hover:text-primary-800 hover:pl-2 transition-all block">Our Story</Link></li>
                            <li><Link href="/blog" className="hover:text-primary-800 hover:pl-2 transition-all block">Journal</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-800 hover:pl-2 transition-all block">Contact Us</Link></li>
                            <li><Link href="/faqs" className="hover:text-primary-800 hover:pl-2 transition-all block">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif font-bold text-lg text-primary-900 mb-6">Stay in the Glow</h4>
                        <p className="text-sm text-gray-600 mb-6">Subscribe for exclusive offers and beauty tips delivered to your inbox.</p>
                        <form className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-secondary-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-900 bg-white placeholder-gray-400"
                                />
                            </div>
                            <button className="w-full bg-primary-900 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors flex items-center justify-center gap-2 group">
                                Subscribe
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-secondary-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-secondary-500">
                    <p>© {new Date().getFullYear()} LumiPure. All rights reserved.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-primary-900">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary-900">Terms of Service</Link>
                        <Link href="/shipping" className="hover:text-primary-900">Shipping Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
