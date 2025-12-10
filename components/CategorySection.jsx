"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CategorySection() {
    const categories = [
        {
            id: 1,
            name: "Hair Care",
            count: "12 Products",
            image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
            link: "/products?category=Hair Care",
        },
        {
            id: 2,
            name: "Skin Care",
            count: "18 Products",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
            link: "/products?category=Skin Care",
        },
        {
            id: 3,
            name: "Essentials",
            count: "8 Products",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop",
            link: "/products?category=Essentials",
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <span className="text-[#4A7C59] font-bold tracking-widest text-xs uppercase mb-3 block">Shop by Category</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A]">
                        Curated Collections
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={category.link} className="block">
                                <div className="relative overflow-hidden mb-4 rounded-sm border border-gray-100">
                                    <div className="aspect-[4/3]">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-xl font-medium text-[#2A2A2A] mb-1 group-hover:text-[#4A7C59] transition-colors">{category.name}</h3>
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <span>{category.count}</span>
                                        <ArrowRight className="w-4 h-4 text-[#D48C70] transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
