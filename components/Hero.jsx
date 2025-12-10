"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-[70vh] min-h-[600px] flex items-center bg-[#F9F9F9] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">

                {/* Text Content - Left Aligned */}
                <div className="z-10 order-2 md:order-1 py-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block text-[#4A7C59] tracking-widest text-xs uppercase font-bold mb-4">
                            New Collection
                        </span>

                        <h1 className="font-serif text-5xl md:text-6xl text-[#2A2A2A] leading-tight mb-6">
                            Natural Skincare <br />
                            <span className="italic font-light text-[#4A7C59]">Reimagined</span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
                            Discover our award-winning organic formulas designed to reveal your skin's natural radiance without compromise.
                        </p>

                        <div className="flex gap-4">
                            <Link href="/products">
                                <button className="px-8 py-3 bg-[#4A7C59] text-white rounded-md font-medium transition-all duration-300 hover:bg-[#3a6346] flex items-center gap-2 shadow-sm hover:shadow-md">
                                    Shop Best Sellers
                                </button>
                            </Link>
                            <Link href="/about">
                                <button className="px-8 py-3 bg-white text-[#4A7C59] border border-[#4A7C59] rounded-md font-medium transition-all duration-300 hover:bg-[#f0f7f2]">
                                    Our Ingredients
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Image - Right Aligned (or Background on Mobile) */}
                <div className="absolute inset-0 md:static md:inset-auto h-full w-full md:h-full order-1 md:order-2 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1556228552-523d4d4dd374?q=80&w=2132&auto=format&fit=crop"
                        alt="Natural Skincare"
                        className="w-full h-full object-cover object-center md:rounded-bl-[80px]"
                    />
                    <div className="absolute inset-0 bg-white/60 md:hidden"></div>
                </div>

            </div>
        </section>
    );
}
