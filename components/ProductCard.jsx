"use client";

import { Star, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-50"
        >
            {/* Badge */}
            {product.isNew && (
                <div className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full tracking-wider">
                    New Arrival
                </div>
            )}

            {/* Image Container */}
            <div className="relative h-72 overflow-hidden bg-rose-50/50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 bg-black/10 backdrop-blur-sm">
                    <button className="p-3 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg" title="Quick View">
                        <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg" title="Add to Cart">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-dark/60 font-medium">{product.rating}</span>
                </div>

                <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">{product.category}</p>

                <Link href={`/products/${product.id}`}>
                    <h3 className="font-serif text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-dark">${product.price.toFixed(2)}</span>
                    <button className="text-xs font-semibold text-dark underline decoration-rose-300 hover:text-primary hover:decoration-primary transition-all">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
