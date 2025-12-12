'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Star,
    Heart,
    ShoppingCart,
    Minus,
    Plus,
    Truck,
    Shield,
    RotateCcw,
    Loader2,
} from 'lucide-react';
import { Product } from '@/types';
import { getProduct } from '@/lib/productService';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui';
import { ProductGallery } from '@/components/product/ProductGallery';

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { addToCart, isLoading: cartLoading } = useCartStore();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'howToUse'>('description');

    useEffect(() => {
        async function fetchProduct() {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getProduct(id);
                setProduct(data.product);
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError('Product not found');
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;
        try {
            await addToCart(product._id, quantity);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const discount =
        product?.comparePrice && product.comparePrice > product.price
            ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
            : 0;

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    // Error State
    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold text-[var(--color-gray-900)]">Product Not Found</h1>
                <p className="text-[var(--color-gray-500)]">{error || 'The product you are looking for does not exist.'}</p>
                <Button onClick={() => router.push('/shop')}>
                    <ArrowLeft size={18} />
                    Back to Shop
                </Button>
            </div>
        );
    }

    const categoryName = typeof product.category === 'object' ? product.category.name : '';

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-[var(--color-gray-100)]">
                <div className="container mx-auto px-4 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-[var(--color-gray-500)] hover:text-[var(--color-primary)]">
                            Home
                        </Link>
                        <span className="text-[var(--color-gray-300)]">/</span>
                        <Link href="/shop" className="text-[var(--color-gray-500)] hover:text-[var(--color-primary)]">
                            Shop
                        </Link>
                        {categoryName && (
                            <>
                                <span className="text-[var(--color-gray-300)]">/</span>
                                <Link
                                    href={`/shop?category=${typeof product.category === 'object' ? product.category._id : ''}`}
                                    className="text-[var(--color-gray-500)] hover:text-[var(--color-primary)]"
                                >
                                    {categoryName}
                                </Link>
                            </>
                        )}
                        <span className="text-[var(--color-gray-300)]">/</span>
                        <span className="text-[var(--color-gray-900)] font-medium truncate max-w-[200px]">
                            {product.name}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Product Content */}
            <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left: Product Gallery */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Right: Product Info */}
                    <div className="space-y-6">
                        {/* Category & Brand */}
                        <div className="flex items-center gap-3">
                            {categoryName && (
                                <span className="text-sm font-medium text-[var(--color-primary)] uppercase tracking-wide">
                                    {categoryName}
                                </span>
                            )}
                            {product.brand && (
                                <span className="text-sm text-[var(--color-gray-500)]">by {product.brand}</span>
                            )}
                        </div>

                        {/* Name */}
                        <h1 className="text-3xl lg:text-4xl font-display font-semibold text-[var(--color-gray-900)]">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.ratings.count > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={18}
                                            className={
                                                star <= Math.round(product.ratings.average)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-[var(--color-gray-300)]'
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-[var(--color-gray-700)]">
                                    {product.ratings.average.toFixed(1)}
                                </span>
                                <span className="text-sm text-[var(--color-gray-400)]">
                                    ({product.ratings.count} reviews)
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-[var(--color-primary)]">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.comparePrice && product.comparePrice > product.price && (
                                <>
                                    <span className="text-xl text-[var(--color-gray-400)] line-through">
                                        ${product.comparePrice.toFixed(2)}
                                    </span>
                                    <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-sm font-semibold rounded-full">
                                        -{discount}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Short Description */}
                        {product.shortDescription && (
                            <p className="text-[var(--color-gray-600)] leading-relaxed">
                                {product.shortDescription}
                            </p>
                        )}

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            />
                            <span
                                className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Quantity & Add to Cart */}
                        {product.stock > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-[var(--color-gray-200)] rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="p-3 hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="px-6 py-3 font-medium text-[var(--color-gray-900)]">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= product.stock}
                                        className="p-3 hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <Button
                                    onClick={handleAddToCart}
                                    size="lg"
                                    className="flex-1"
                                    disabled={cartLoading}
                                >
                                    {cartLoading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <ShoppingCart size={20} />
                                    )}
                                    Add to Cart
                                </Button>

                                {/* Wishlist */}
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className="px-4"
                                >
                                    <Heart
                                        size={20}
                                        className={isWishlisted ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : ''}
                                    />
                                </Button>
                            </div>
                        )}

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--color-gray-200)]">
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                                    <Truck size={20} className="text-[var(--color-primary)]" />
                                </div>
                                <p className="text-xs text-[var(--color-gray-600)]">Free Shipping</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                                    <Shield size={20} className="text-[var(--color-primary)]" />
                                </div>
                                <p className="text-xs text-[var(--color-gray-600)]">Secure Payment</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                                    <RotateCcw size={20} className="text-[var(--color-primary)]" />
                                </div>
                                <p className="text-xs text-[var(--color-gray-600)]">Easy Returns</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16">
                    {/* Tab Headers */}
                    <div className="flex gap-8 border-b border-[var(--color-gray-200)]">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`pb-4 font-medium transition-colors ${activeTab === 'description'
                                    ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                                    : 'text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]'
                                }`}
                        >
                            Description
                        </button>
                        {product.ingredients && (
                            <button
                                onClick={() => setActiveTab('ingredients')}
                                className={`pb-4 font-medium transition-colors ${activeTab === 'ingredients'
                                        ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                                        : 'text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]'
                                    }`}
                            >
                                Ingredients
                            </button>
                        )}
                        {product.howToUse && (
                            <button
                                onClick={() => setActiveTab('howToUse')}
                                className={`pb-4 font-medium transition-colors ${activeTab === 'howToUse'
                                        ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                                        : 'text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]'
                                    }`}
                            >
                                How to Use
                            </button>
                        )}
                    </div>

                    {/* Tab Content */}
                    <div className="py-8">
                        {activeTab === 'description' && (
                            <div className="prose prose-lg max-w-none text-[var(--color-gray-600)]">
                                <p>{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'ingredients' && product.ingredients && (
                            <div className="prose prose-lg max-w-none text-[var(--color-gray-600)]">
                                <p>{product.ingredients}</p>
                            </div>
                        )}
                        {activeTab === 'howToUse' && product.howToUse && (
                            <div className="prose prose-lg max-w-none text-[var(--color-gray-600)]">
                                <p>{product.howToUse}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
