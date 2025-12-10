"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-secondary-50 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-100/50 -skew-x-12 transform origin-top-right z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30 z-0" />

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-primary-800 text-sm font-medium tracking-wide uppercase"
                        >
                            New Collection 2025
                        </motion.span>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-primary-900 leading-[1.1]">
                            Reveal Your <br />
                            <span className="italic text-primary-600 relative inline-block">
                                Inner Glow
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 1, duration: 1.5 }}
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.00025 7.00005C39.9179 2.91008 127.173 -3.07863 197.989 3.01235"
                                        stroke="#059669"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </motion.svg>
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                            Discover nature's most potent ingredients, scientifically formulated
                            to nourish, rejuvenate, and illuminate your skin from within.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="/products">
                            <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary-900/10 hover:shadow-primary-900/20 transition-all">
                                Shop Collection
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 px-8 text-lg border-primary-200 hover:bg-white hover:text-primary-900"
                            >
                                Our Story
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <div className="pt-8 flex items-center gap-8 text-gray-400 grayscale opacity-70">
                        {/* Placeholder logos */}
                        <span className="font-serif italic text-xl">Vogue</span>
                        <span className="font-serif italic text-xl">Elle</span>
                        <span className="font-serif italic text-xl">Marie Claire</span>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden md:block"
                >
                    <div className="relative h-[700px] w-full rounded-t-[12rem] rounded-b-[4rem] overflow-hidden shadow-2xl">
                        {/* Abstract Background for Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-200 to-secondary-300" />
                        <div className="absolute inset-0 flex items-center justify-center text-secondary-500 font-serif text-5xl opacity-30 mix-blend-multiply">
                            Model Image
                        </div>
                        {/* Floating Product Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">98%</div>
                                <div>
                                    <p className="font-semibold text-primary-900">Natural Ingredients</p>
                                    <p className="text-sm text-gray-500">Sourced sustainably from around the globe.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
