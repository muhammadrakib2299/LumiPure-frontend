'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Droplets, Sun, Sparkles, Flower2, Leaf } from 'lucide-react';
import { getCategories } from '@/lib/productService';
import { Category } from '@/types';

const categoryIcons = [Droplets, Sun, Sparkles, Flower2, Leaf, Droplets];
const categoryColors = [
    'from-blue-50 to-blue-100 text-blue-600',
    'from-amber-50 to-amber-100 text-amber-600',
    'from-pink-50 to-pink-100 text-pink-600',
    'from-purple-50 to-purple-100 text-purple-600',
    'from-green-50 to-green-100 text-green-600',
    'from-teal-50 to-teal-100 text-teal-600',
];

const demoCategories: Category[] = [
    { _id: 'cat-1', name: 'Cleansers', slug: 'cleansers', description: 'Gentle formulas for fresh skin', isActive: true },
    { _id: 'cat-2', name: 'Serums', slug: 'serums', description: 'Concentrated active treatments', isActive: true },
    { _id: 'cat-3', name: 'Moisturizers', slug: 'moisturizers', description: 'Hydration for every skin type', isActive: true },
    { _id: 'cat-4', name: 'Masks', slug: 'masks', description: 'Deep treatment & recovery', isActive: true },
    { _id: 'cat-5', name: 'Suncare', slug: 'suncare', description: 'Daily protection essentials', isActive: true },
];

export function ShopByCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                const fetched = data?.categories || [];
                setCategories(fetched.length > 0 ? fetched.slice(0, 6) : demoCategories);
            } catch {
                setCategories(demoCategories);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <section className="py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <div className="h-8 bg-[var(--color-gray-100)] rounded w-48 mx-auto mb-3 animate-pulse" />
                        <div className="h-4 bg-[var(--color-gray-100)] rounded w-64 mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-36 rounded-2xl bg-[var(--color-gray-50)] animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-gray-900)] mb-3">
                        Shop by Category
                    </h2>
                    <p className="text-[var(--color-gray-500)] max-w-lg mx-auto">
                        Find the perfect products for your skincare routine
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((cat, index) => {
                        const Icon = categoryIcons[index % categoryIcons.length];
                        const color = categoryColors[index % categoryColors.length];
                        return (
                            <Link
                                key={cat._id}
                                href={`/shop?category=${cat._id}`}
                                className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br border border-transparent hover:border-[var(--color-gray-200)] hover:shadow-md transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    {cat.image?.url ? (
                                        <Image src={cat.image.url} alt={cat.name} width={24} height={24} className="object-cover rounded" />
                                    ) : (
                                        <Icon size={22} />
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-sm font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-primary)] transition-colors">
                                        {cat.name}
                                    </h3>
                                    {cat.description && (
                                        <p className="text-xs text-[var(--color-gray-400)] mt-1 line-clamp-1">
                                            {cat.description}
                                        </p>
                                    )}
                                </div>
                                <ArrowRight size={14} className="absolute top-3 right-3 text-[var(--color-gray-300)] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
