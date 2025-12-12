'use client';

import { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product';
import { getProducts } from '@/lib/productService';

export default function NewArrivalsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts({ sort: '-createdAt', limit: 12 });
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
