"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Hair Care", "Skin Care", "Hair Oil", "Shampoo", "Hair Pack", "Night Cream"];

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(product =>
            product.category === activeCategory ||
            (activeCategory === "Hair Care" && ["Hair Oil", "Shampoo", "Hair Pack"].includes(product.category)) ||
            (activeCategory === "Skin Care" && ["Night Cream", "Face Serum", "Face Mask"].includes(product.category))
        );

    return (
        <main className="min-h-screen bg-rose-50/20">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 text-center bg-rose-50">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-4">Our Collection</h1>
                <p className="text-dark/60 max-w-xl mx-auto px-4">
                    Explore our range of premium organic beauty products designed to enhance your natural radiance.
                </p>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 md:px-6 py-8 sticky top-20 z-30 bg-white/80 backdrop-blur-md mb-8 border-b border-rose-100">
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === category
                                    ? "bg-primary text-white shadow-md transform scale-105"
                                    : "bg-white text-dark/70 border border-rose-100 hover:border-primary hover:text-primary"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <section className="container mx-auto px-4 md:px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-lg text-dark/50">No products found in this category.</p>
                            <button
                                onClick={() => setActiveCategory("All")}
                                className="mt-4 text-primary underline hover:text-rose-600"
                            >
                                View all products
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
