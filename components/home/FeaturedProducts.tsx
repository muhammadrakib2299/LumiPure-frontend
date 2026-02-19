'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/productService';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui';
import { Product } from '@/types';

const demoProducts: Product[] = [
    {
        _id: 'demo-1',
        name: 'Hydrating Rose Serum',
        slug: 'hydrating-rose-serum',
        description: 'A lightweight serum infused with rose hip oil for deep hydration.',
        price: 48.00,
        comparePrice: 60.00,
        images: [{ public_id: '', url: '' }],
        category: { _id: 'cat-1', name: 'Serums', slug: 'serums', isActive: true },
        stock: 25,
        ratings: { average: 4.8, count: 124 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-2',
        name: 'Vitamin C Brightening Cream',
        slug: 'vitamin-c-brightening-cream',
        description: 'Powerful antioxidant cream that brightens and evens skin tone.',
        price: 55.00,
        images: [{ public_id: '', url: '' }],
        category: { _id: 'cat-2', name: 'Moisturizers', slug: 'moisturizers', isActive: true },
        stock: 18,
        ratings: { average: 4.6, count: 89 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-3',
        name: 'Gentle Foaming Cleanser',
        slug: 'gentle-foaming-cleanser',
        description: 'A soothing cleanser that removes impurities without stripping moisture.',
        price: 32.00,
        images: [{ public_id: '', url: '' }],
        category: { _id: 'cat-3', name: 'Cleansers', slug: 'cleansers', isActive: true },
        stock: 40,
        ratings: { average: 4.7, count: 203 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'demo-4',
        name: 'Overnight Recovery Mask',
        slug: 'overnight-recovery-mask',
        description: 'Wake up to refreshed, plump skin with this nourishing overnight mask.',
        price: 42.00,
        comparePrice: 52.00,
        images: [{ public_id: '', url: '' }],
        category: { _id: 'cat-4', name: 'Masks', slug: 'masks', isActive: true },
        stock: 15,
        ratings: { average: 4.9, count: 67 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getFeaturedProducts();
                const fetched = data?.products || [];
                setProducts(fetched.length > 0 ? fetched.slice(0, 4) : demoProducts);
            } catch {
                setProducts(demoProducts);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <section className="py-16 lg:py-20 bg-[var(--color-gray-50)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-gray-900)] mb-3">
                        Bestsellers
                    </h2>
                    <p className="text-[var(--color-gray-500)] max-w-lg mx-auto">
                        Our most-loved products, trusted by thousands for visible results
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                <div className="aspect-square bg-[var(--color-gray-100)]" />
                                <div className="p-4 space-y-3">
                                    <div className="h-3 bg-[var(--color-gray-100)] rounded w-1/3" />
                                    <div className="h-4 bg-[var(--color-gray-100)] rounded w-3/4" />
                                    <div className="h-4 bg-[var(--color-gray-100)] rounded w-1/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-10">
                    <Link href="/shop">
                        <Button variant="outline" size="lg" className="group">
                            View All Products
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
