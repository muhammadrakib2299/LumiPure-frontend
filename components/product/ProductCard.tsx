'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCartStore();
    const { toggleWishlist, isWishlisted } = useWishlistStore();
    const wishlisted = isWishlisted(product._id);

    const categoryName =
        typeof product.category === 'object' ? product.category.name : '';

    const discount =
        product.comparePrice && product.comparePrice > product.price
            ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
            : 0;

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await addToCart(product._id, 1);
            toast.success(`${product.name} added to cart`);
        } catch {
            toast.error('Failed to add to cart. Please login first.');
        }
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product._id);
        if (wishlisted) {
            toast('Removed from wishlist', { icon: '💔' });
        } else {
            toast.success('Added to wishlist');
        }
    };

    return (
        <div
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <Link href={`/products/${product._id}`} className="block relative aspect-square overflow-hidden">
                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-[var(--color-accent)] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        -{discount}%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className={`
                        absolute top-3 right-3 z-10 p-2 rounded-full
                        transition-all duration-200
                        ${wishlisted
                            ? 'bg-[var(--color-accent)] text-white'
                            : 'bg-white/80 text-[var(--color-gray-600)] hover:bg-white hover:text-[var(--color-accent)]'
                        }
                    `}
                >
                    <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>

                {/* Product Image */}
                <div className="w-full h-full bg-[var(--color-gray-100)]">
                    {product.images[0]?.url ? (
                        <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--color-gray-400)]">
                            No Image
                        </div>
                    )}
                </div>

                {/* Quick Actions Overlay */}
                <div
                    className={`
                        absolute inset-0 bg-black/20 flex items-center justify-center gap-3
                        transition-opacity duration-300
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}
                >
                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-white rounded-full text-[var(--color-gray-800)] hover:bg-[var(--color-primary)] hover:text-white transition-colors shadow-lg"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="p-3 bg-white rounded-full text-[var(--color-gray-800)] hover:bg-[var(--color-primary)] hover:text-white transition-colors shadow-lg"
                        title="Quick View"
                    >
                        <Eye size={20} />
                    </button>
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                {categoryName && (
                    <span className="text-xs font-medium text-[var(--color-primary)] uppercase tracking-wide">
                        {categoryName}
                    </span>
                )}

                {/* Name */}
                <Link href={`/products/${product._id}`}>
                    <h3 className="mt-1 font-medium text-[var(--color-gray-900)] line-clamp-2 hover:text-[var(--color-primary)] transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                {product.ratings.count > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-[var(--color-gray-700)]">
                            {product.ratings.average.toFixed(1)}
                        </span>
                        <span className="text-xs text-[var(--color-gray-400)]">
                            ({product.ratings.count})
                        </span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-lg font-semibold text-[var(--color-primary)]">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.comparePrice && product.comparePrice > product.price && (
                        <span className="text-sm text-[var(--color-gray-400)] line-through">
                            ${product.comparePrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
