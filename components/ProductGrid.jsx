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
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-dark mb-4">{title}</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>
                )}

                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {displayProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-rose-50/50 rounded-2xl">
                        <p className="text-dark/60 font-medium">No products available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
