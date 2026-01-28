'use client';

import { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product';

// Demo products for new arrivals
const demoProducts: Product[] = [
    {
        _id: 'demo-1',
        name: 'Radiant Glow Serum',
        slug: 'radiant-glow-serum',
        description: 'A lightweight serum infused with vitamin C and hyaluronic acid for instant radiance and youthful skin.',
        price: 49.99,
        comparePrice: 59.99,
        images: [{ public_id: 'serum-1', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500' }],
        category: { _id: 'cat-1', name: 'Serums', slug: 'serums', isActive: true },
        stock: 45,
        ratings: { average: 4.8, count: 128 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-2',
        name: 'Hydrating Face Cream',
        slug: 'hydrating-face-cream',
        description: 'Rich moisturizer with organic shea butter and botanical extracts for deep hydration and soft, supple skin.',
        price: 39.99,
        images: [{ public_id: 'cream-1', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500' }],
        category: { _id: 'cat-2', name: 'Moisturizers', slug: 'moisturizers', isActive: true },
        stock: 32,
        ratings: { average: 4.9, count: 215 },
        isFeatured: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-3',
        name: 'Gentle Cleansing Gel',
        slug: 'gentle-cleansing-gel',
        description: 'pH-balanced cleanser with aloe vera and chamomile, perfect for sensitive skin and daily cleansing.',
        price: 24.99,
        images: [{ public_id: 'cleanser-1', url: 'https://images.unsplash.com/photo-1556228852-80f441b6a99b?w=500' }],
        category: { _id: 'cat-3', name: 'Cleansers', slug: 'cleansers', isActive: true },
        stock: 67,
        ratings: { average: 4.7, count: 183 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-4',
        name: 'Revitalizing Eye Cream',
        slug: 'revitalizing-eye-cream',
        description: 'Peptide-rich formula to reduce dark circles and fine lines around the delicate eye area.',
        price: 54.99,
        comparePrice: 64.99,
        images: [{ public_id: 'eye-cream-1', url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500' }],
        category: { _id: 'cat-4', name: 'Eye Care', slug: 'eye-care', isActive: true },
        stock: 28,
        ratings: { average: 4.6, count: 97 },
        isFeatured: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-5',
        name: 'Brightening Toner',
        slug: 'brightening-toner',
        description: 'Alcohol-free toner with niacinamide and rose water for even skin tone and refined pores.',
        price: 29.99,
        images: [{ public_id: 'toner-1', url: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500' }],
        category: { _id: 'cat-5', name: 'Toners', slug: 'toners', isActive: true },
        stock: 51,
        ratings: { average: 4.8, count: 164 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-6',
        name: 'Nourishing Night Mask',
        slug: 'nourishing-night-mask',
        description: 'Overnight treatment mask with retinol and peptides for skin renewal and rejuvenation while you sleep.',
        price: 44.99,
        images: [{ public_id: 'mask-1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500' }],
        category: { _id: 'cat-6', name: 'Masks', slug: 'masks', isActive: true },
        stock: 39,
        ratings: { average: 4.9, count: 201 },
        isFeatured: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-7',
        name: 'Exfoliating Scrub',
        slug: 'exfoliating-scrub',
        description: 'Gentle exfoliant with natural apricot seeds and green tea extract to reveal smoother, brighter skin.',
        price: 34.99,
        images: [{ public_id: 'scrub-1', url: 'https://images.unsplash.com/photo-1556229010-aa534f32ec3d?w=500' }],
        category: { _id: 'cat-7', name: 'Exfoliants', slug: 'exfoliants', isActive: true },
        stock: 44,
        ratings: { average: 4.5, count: 142 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-8',
        name: 'Sunscreen SPF 50',
        slug: 'sunscreen-spf-50',
        description: 'Broad-spectrum protection with zinc oxide and antioxidants to shield skin from harmful UV rays.',
        price: 32.99,
        images: [{ public_id: 'sunscreen-1', url: 'https://images.unsplash.com/photo-1584992236310-ecedaa910e94?w=500' }],
        category: { _id: 'cat-8', name: 'Sun Care', slug: 'sun-care', isActive: true },
        stock: 58,
        ratings: { average: 4.7, count: 176 },
        isFeatured: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export default function NewArrivalsPage() {
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
            <section className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles size={32} className="text-white" />
                        <h1 className="text-4xl lg:text-5xl font-display font-semibold text-white">
                            New Arrivals
                        </h1>
                    </div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Discover our latest products, fresh from our beauty labs to your skincare routine.
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
                            <p className="text-[var(--color-gray-500)]">No new products available at the moment.</p>
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
