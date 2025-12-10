import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-rose-50 pt-16 pb-8 border-t border-rose-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <span className="font-serif text-2xl font-bold tracking-tight text-dark">
                                Lumi<span className="text-primary italic">Pure</span>
                            </span>
                        </Link>
                        <p className="text-dark/70 mb-6 text-sm leading-relaxed">
                            Experience the essence of pure beauty with our premium collection of skincare and hair care products. Designed to enhance your natural radiance.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold text-dark mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-dark/70 hover:text-primary transition-colors text-sm">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-dark/70 hover:text-primary transition-colors text-sm">Shop All</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-dark/70 hover:text-primary transition-colors text-sm">Our Story</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-dark/70 hover:text-primary transition-colors text-sm">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold text-dark mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-dark/70 text-sm">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>123 Beauty Avenue, New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-dark/70 text-sm">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-dark/70 text-sm">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>hello@lumipure.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold text-dark mb-6">Newsletter</h3>
                        <p className="text-dark/70 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-md border border-rose-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                            />
                            <button className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-rose-600 transition-colors shadow-sm text-sm tracking-wide">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-rose-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-dark/50 text-xs">
                        &copy; {new Date().getFullYear()} LumiPure. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-dark/50 hover:text-primary text-xs transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-dark/50 hover:text-primary text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
