'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trophy } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product';

// Demo bestseller products
const demoProducts: Product[] = [
    {
        _id: 'best-1',
        name: 'Radiant Glow Serum',
        slug: 'radiant-glow-serum',
        description: 'Our #1 bestseller! Lightweight serum with vitamin C for instant radiance and anti-aging benefits.',
        price: 49.99,
        comparePrice: 59.99,
        images: [{ public_id: 'serum-1', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500' }],
        category: { _id: 'cat-1', name: 'Serums', slug: 'serums', isActive: true },
        stock: 45,
        ratings: { average: 4.9, count: 325 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'best-2',
        name: 'Hydrating Face Cream',
        slug: 'hydrating-face-cream',
        description: 'Customer favorite! Rich moisturizer for all-day hydration with organic ingredients.',
        price: 39.99,
        images: [{ public_id: 'cream-1', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500' }],
        category: { _id: 'cat-2', name: 'Moisturizers', slug: 'moisturizers', isActive: true },
        stock: 32,
        ratings: { average: 4.9, count: 412 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'best-3',
        name: 'Gentle Cleansing Gel',
        slug: 'gentle-cleansing-gel',
        description: 'Best-rated cleanser for sensitive skin, removes impurities without stripping natural oils.',
        price: 24.99,
        images: [{ public_id: 'cleanser-1', url: 'https://images.unsplash.com/photo-1556228852-80f441b6a99b?w=500' }],
        category: { _id: 'cat-3', name: 'Cleansers', slug: 'cleansers', isActive: true },
        stock: 67,
        ratings: { average: 4.8, count: 289 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'best-4',
        name: 'Nourishing Night Mask',
        slug: 'nourishing-night-mask',
        description: 'Top-selling overnight treatment for skin renewal and morning radiance.',
        price: 44.99,
        images: [{ public_id: 'mask-1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500' }],
        category: { _id: 'cat-6', name: 'Masks', slug: 'masks', isActive: true },
        stock: 39,
        ratings: { average: 4.9, count: 378 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'best-5',
        name: 'Brightening Toner',
        slug: 'brightening-toner',
        description: 'Most popular toner for even skin tone and refined texture.',
        price: 29.99,
        images: [{ public_id: 'toner-1', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500' }],
        category: { _id: 'cat-5', name: 'Toners', slug: 'toners', isActive: true },
        stock: 51,
        ratings: { average: 4.8, count: 267 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'best-6',
        name: 'Revitalizing Eye Cream',
        slug: 'revitalizing-eye-cream',
        description: 'Bestseller for reducing dark circles and fine lines around the eye area.',
        price: 54.99,
        comparePrice: 64.99,
        images: [{ public_id: 'eye-cream-1', url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500' }],
        category: { _id: 'cat-4', name: 'Eye Care', slug: 'eye-care', isActive: true },
        stock: 28,
        ratings: { average: 4.7, count: 198 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'best-7',
        name: 'Vitamin C Essence',
        slug: 'vitamin-c-essence',
        description: 'Top choice for brightening and anti-aging with powerful antioxidants.',
        price: 59.99,
        images: [{ public_id: 'essence-1', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500' }],
        category: { _id: 'cat-1', name: 'Serums', slug: 'serums', isActive: true },
        stock: 36,
        ratings: { average: 4.9, count: 341 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'best-8',
        name: 'Sunscreen SPF 50',
        slug: 'sunscreen-spf-50',
        description: 'Award-winning broad-spectrum protection for daily sun defense.',
        price: 32.99,
        images: [{ public_id: 'sunscreen-1', url: 'https://images.unsplash.com/photo-1584992236310-ecedaa910e94?w=500' }],
        category: { _id: 'cat-8', name: 'Sun Care', slug: 'sun-care', isActive: true },
        stock: 58,
        ratings: { average: 4.8, count: 294 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export default function BestsellersPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setProducts(demoProducts);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Trophy size={32} className="text-yellow-400" />
                        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-white">
                            Bestsellers
                        </h1>
                    </div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Our most loved products, tried and trusted by thousands of happy customers.
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[var(--color-gray-500)]">No bestsellers available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
