"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-0"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-rose-100 text-primary text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Premium Beauty Collection</span>
                        </div>

                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-dark leading-tight mb-6">
                            Reveal Your <br />
                            <span className="text-primary italic">Natural Glow</span>
                        </h1>

                        <p className="text-lg md:text-xl text-dark/70 mb-8 max-w-lg leading-relaxed">
                            Discover our curated collection of organic hair care and skincare products.
                            Designed to nourish, rejuvenate, and enhance your authentic beauty.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/products" className="group">
                                <button className="px-8 py-4 bg-primary text-white rounded-full font-medium transition-all duration-300 transform hover:bg-rose-600 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center">
                                    Shop Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-8 py-4 bg-white text-dark border border-rose-200 rounded-full font-medium transition-all duration-300 hover:bg-rose-50 hover:border-primary w-full sm:w-auto">
                                    Our Story
                                </button>
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8">
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold text-dark">50k+</span>
                                <span className="text-sm text-dark/60">Happy Customers</span>
                            </div>
                            <div className="w-px h-10 bg-rose-200"></div>
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold text-dark">100%</span>
                                <span className="text-sm text-dark/60">Organic Ingredients</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content (Floating Cards/Products) */}
                    <div className="relative hidden md:block h-[600px]">
                        {/* Background decorative blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>

                        {/* Main Product Image Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="absolute top-10 right-10 w-80 p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl z-20"
                        >
                            <div className="h-96 rounded-xl overflow-hidden relative">
                                {/* Placeholder for product image - using a nice gradient/color for now if no image, or external URL */}
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop')] bg-cover bg-center hover:scale-105 transition-transform duration-700"></div>
                                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-lg text-center">
                                    <p className="font-serif font-bold text-dark">Radiance Hair Oil</p>
                                    <p className="text-primary text-sm">$32.00</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Secondary Floating Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="absolute bottom-20 left-10 w-64 p-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg z-10 animate-float"
                        >
                            <div className="h-64 rounded-xl overflow-hidden relative">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center hover:scale-105 transition-transform duration-700"></div>
                                <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wide">
                                    New
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
