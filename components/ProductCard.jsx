"use client";

import { Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white border border-gray-100 rounded-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
        >
            {/* Badge */}
            {product.isNew && (
                <div className="absolute top-2 left-2 z-10 bg-[#D48C70] text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider rounded-sm">
                    New
                </div>
            )}

            {/* Image Container - Square Aspect Ratio */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                <Link href={`/products/${product.id}`} className="block h-full w-full p-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
            </div>

            {/* Content - Left Aligned & Structured */}
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-base text-[#2A2A2A] mb-1 hover:text-[#4A7C59] transition-colors line-clamp-2 min-h-[3rem]">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xs text-gray-500 mb-2 capitalize">{product.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-[#D48C70] text-[#D48C70]" : "fill-gray-200 text-gray-200"}`}
                        />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-[#2A2A2A]">${product.price.toFixed(2)}</span>

                    <button
                        className="flex-1 bg-white border border-[#2A2A2A] text-[#2A2A2A] px-3 py-2 text-xs uppercase font-bold tracking-wider hover:bg-[#2A2A2A] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                        title="Add to Cart"
                    >
                        <ShoppingBag className="w-3 h-3" />
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
