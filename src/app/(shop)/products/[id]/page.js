"use client";

import Button from "@/components/ui/Button";
import useCartStore from "@/stores/useCartStore";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
    const params = useParams();
    const { addToCart } = useCartStore();

    // Mock product data
    const product = {
        id: params.id,
        name: "Radiant Glow Serum",
        price: 49.99,
        description: "A lightweight serum that hydrates and brightens your complexion for a natural, healthy glow.",
        images: ["/placeholder.jpg"]
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="aspect-square bg-secondary-100 rounded-2xl flex items-center justify-center">
                    {/* Image Placeholder */}
                    <span className="text-secondary-400 font-serif italic text-2xl">Product Image</span>
                </div>
                <div className="space-y-6 flex flex-col justify-center">
                    <h1 className="text-4xl font-serif text-primary-900">{product.name}</h1>
                    <p className="text-2xl font-medium text-gray-900">${product.price}</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <div className="pt-4">
                        <Button size="lg" onClick={() => addToCart(product)}>
                            Add to Bag
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
