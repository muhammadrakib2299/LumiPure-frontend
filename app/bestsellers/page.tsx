'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trophy } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product';
import { getFeaturedProducts } from '@/lib/productService';

export default function BestsellersPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getFeaturedProducts();
                setProducts(data.products || []);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
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
