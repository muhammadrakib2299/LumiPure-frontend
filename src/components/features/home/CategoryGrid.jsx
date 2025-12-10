"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
    {
        id: "skincare",
        name: "Skincare",
        description: "Nourish & Restore",
        image: "/c1.jpg", // Placeholder
        href: "/products?category=skincare",
        color: "bg-primary-100",
    },
    {
        id: "body",
        name: "Body Care",
        description: "Indulge your skin",
        image: "/c2.jpg", // Placeholder
        href: "/products?category=body",
        color: "bg-secondary-100",
    },
    {
        id: "sets",
        name: "Gift Sets",
        description: "Curated for giving",
        image: "/c3.jpg", // Placeholder
        href: "/products?category=sets",
        color: "bg-orange-50",
    },
];

const CategoryGrid = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">Shop by Category</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect ritual for your skin's unique needs.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <Link key={category.id} href={category.href} className="group block">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative h-[500px] w-full overflow-hidden rounded-2xl"
                            >
                                {/* Background Image Placeholder */}
                                <div className={`absolute inset-0 ${category.color} transition-transform duration-700 group-hover:scale-105`}>
                                    <div className="flex items-center justify-center h-full text-primary-900/20 font-serif text-4xl italic">
                                        {category.name} Image
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-50" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                                    <h3 className="text-3xl font-serif font-bold mb-2">{category.name}</h3>
                                    <p className="text-white/90 font-medium tracking-wide flex items-center gap-2 group-hover:gap-4 transition-all">
                                        {category.description}
                                        <span className="text-xl">→</span>
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
