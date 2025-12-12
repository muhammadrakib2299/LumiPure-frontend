'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Heart,
    ShoppingCart,
    Trash2,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cartStore';

// This would typically come from a wishlist store or API
// For now, we'll show a demo state
interface WishlistItem {
    _id: string;
    name: string;
    price: number;
    comparePrice?: number;
    image: string;
    inStock: boolean;
}

const demoWishlistItems: WishlistItem[] = [];

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(demoWishlistItems);
    const { addToCart } = useCartStore();

    const removeFromWishlist = (id: string) => {
        setWishlistItems((prev) => prev.filter((item) => item._id !== id));
    };

    const handleAddToCart = async (item: WishlistItem) => {
        try {
            await addToCart(item._id, 1);
            removeFromWishlist(item._id);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    // Empty State
    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--color-gray-50)] py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)] mb-8">
                        My Wishlist
                    </h1>
                    <div className="max-w-md mx-auto text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                            <Heart size={40} className="text-[var(--color-accent)]" />
                        </div>
                        <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-[var(--color-gray-500)] mb-8">
                            Save your favorite products here to buy them later.
                        </p>
                        <Link href="/shop">
                            <Button size="lg">
                                Browse Products
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)] py-8 lg:py-12">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)]">
                            My Wishlist
                        </h1>
                        <p className="text-[var(--color-gray-500)] mt-1">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="text-[var(--color-primary)] hover:underline flex items-center gap-2"
                    >
                        Continue Shopping
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => {
                        const discount =
                            item.comparePrice && item.comparePrice > item.price
                                ? Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)
                                : 0;

                        return (
                            <div
                                key={item._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm group"
                            >
                                {/* Image */}
                                <Link
                                    href={`/products/${item._id}`}
                                    className="block relative aspect-square overflow-hidden"
                                >
                                    {discount > 0 && (
                                        <span className="absolute top-3 left-3 z-10 bg-[var(--color-accent)] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                            -{discount}%
                                        </span>
                                    )}
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </Link>

                                {/* Info */}
                                <div className="p-4">
                                    <Link href={`/products/${item._id}`}>
                                        <h3 className="font-medium text-[var(--color-gray-900)] hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                                            {item.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-lg font-semibold text-[var(--color-primary)]">
                                            ${item.price.toFixed(2)}
                                        </span>
                                        {item.comparePrice && item.comparePrice > item.price && (
                                            <span className="text-sm text-[var(--color-gray-400)] line-through">
                                                ${item.comparePrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <Button
                                            onClick={() => handleAddToCart(item)}
                                            size="sm"
                                            fullWidth
                                            disabled={!item.inStock}
                                        >
                                            <ShoppingCart size={16} />
                                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        </Button>
                                        <button
                                            onClick={() => removeFromWishlist(item._id)}
                                            className="p-2 rounded-lg border border-[var(--color-gray-200)] text-[var(--color-gray-400)] hover:text-[var(--color-error)] hover:border-[var(--color-error)] transition-colors"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
