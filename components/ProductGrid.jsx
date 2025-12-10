"use client";

import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";

export default function ProductGrid({ limit, title }) {
    const displayProducts = limit ? products.slice(0, limit) : products;

    return (
        <section className="py-24 bg-white relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                {title && (
                    <div className="text-center mb-20 animate-fade-in">
                        <span className="text-xs font-medium text-primary tracking-[0.2em] uppercase block mb-4">Discover</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-medium text-dark">{title}</h2>
                    </div>
                )}

                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {displayProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-rose-50/20 rounded-none border border-rose-100">
                        <p className="font-serif text-xl text-dark/60 italic">Our collection is being curated. Check back soon.</p>
                    </div>
                )}

                {/* View All Actions (Optional) */}
                {limit && (
                    <div className="mt-16 text-center">
                        <a href="/products" className="inline-block border-b border-dark pb-1 text-xs uppercase tracking-widest hover:text-primary hover:border-primary transition-colors">
                            View Full Collection
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
