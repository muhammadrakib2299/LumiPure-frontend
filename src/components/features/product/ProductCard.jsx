"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import useCartStore from "@/stores/useCartStore";

const ProductCard = ({ product }) => {
    const { addToCart } = useCartStore();

    return (
        <div className="group relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-secondary-50 relative">
                {/* Placeholder for Image - in real app use next/image */}
                <div className="flex items-center justify-center h-full w-full text-secondary-300 font-serif italic bg-secondary-100">
                    {product.name}
                </div>

                {/* Quick Add Button - Visible on Hover */}
                <div className="absolute bottom-4 right-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Button
                        size="icon"
                        className="rounded-full shadow-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-lg font-medium text-primary-900">
                        <Link href={`/products/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
