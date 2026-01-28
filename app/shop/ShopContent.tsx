'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, Grid3X3, LayoutGrid, Loader2 } from 'lucide-react';
import { Product, Category, ProductFilters, SORT_OPTIONS } from '@/types';
import { ProductCard, ProductFiltersComponent } from '@/components/product';
import { getProducts, getCategories } from '@/lib/productService';

export default function ShopContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gridView, setGridView] = useState<'small' | 'large'>('large');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 12,
    });

    // Get filters from URL
    const getFiltersFromUrl = useCallback((): ProductFilters => {
        return {
            category: searchParams.get('category') || undefined,
            search: searchParams.get('search') || undefined,
            minPrice: searchParams.get('minPrice')
                ? Number(searchParams.get('minPrice'))
                : undefined,
            maxPrice: searchParams.get('maxPrice')
                ? Number(searchParams.get('maxPrice'))
                : undefined,
            sort: searchParams.get('sort') || '-createdAt',
            page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
            limit: 12,
        };
    }, [searchParams]);

    const [filters, setFilters] = useState<ProductFilters>(getFiltersFromUrl());

    // Update URL when filters change
    const updateUrl = useCallback(
        (newFilters: ProductFilters) => {
            const params = new URLSearchParams();

            if (newFilters.category) params.set('category', newFilters.category);
            if (newFilters.search) params.set('search', newFilters.search);
            if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice.toString());
            if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice.toString());
            if (newFilters.sort && newFilters.sort !== '-createdAt')
                params.set('sort', newFilters.sort);
            if (newFilters.page && newFilters.page > 1)
                params.set('page', newFilters.page.toString());

            const queryString = params.toString();
            router.push(`/shop${queryString ? `?${queryString}` : ''}`, { scroll: false });
        },
        [router]
    );

    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                setCategories(data.categories || []);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        }
        fetchCategories();
    }, []);

    // Fetch products
    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getProducts(filters);
                setProducts(data.products || []);
                if (data.pagination) {
                    setPagination({
                        currentPage: data.pagination.currentPage,
                        totalPages: data.pagination.totalPages,
                        totalItems: data.pagination.totalItems,
                        itemsPerPage: data.pagination.itemsPerPage,
                    });
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);

                // Use demo products as fallback
                const demoProducts: Product[] = [
                    {
                        _id: 'shop-demo-1',
                        name: 'Radiant Glow Serum',
                        slug: 'radiant-glow-serum',
                        description: 'A lightweight serum infused with vitamin C and hyaluronic acid for instant radiance.',
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
                        _id: 'shop-demo-2',
                        name: 'Hydrating Face Cream',
                        slug: 'hydrating-face-cream',
                        description: 'Rich moisturizer with organic shea butter and botanical extracts.',
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
                        _id: 'shop-demo-3',
                        name: 'Gentle Cleansing Gel',
                        slug: 'gentle-cleansing-gel',
                        description: 'pH-balanced cleanser with aloe vera and chamomile perfect for sensitive skin.',
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
                        _id: 'shop-demo-4',
                        name: 'Revitalizing Eye Cream',
                        slug: 'revitalizing-eye-cream',
                        description: 'Peptide-rich formula to reduce dark circles and fine lines.',
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
                        _id: 'shop-demo-5',
                        name: 'Brightening Toner',
                        slug: 'brightening-toner',
                        description: 'Alcohol-free toner with niacinamide and rose water for even skin tone.',
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
                        _id: 'shop-demo-6',
                        name: 'Nourishing Night Mask',
                        slug: 'nourishing-night-mask',
                        description: 'Overnight treatment mask with retinol and peptides for skin renewal.',
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
                        _id: 'shop-demo-7',
                        name: 'Exfoliating Scrub',
                        slug: 'exfoliating-scrub',
                        description: 'Gentle exfoliant with natural apricot seeds and green tea extract.',
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
                        _id: 'shop-demo-8',
                        name: 'Sunscreen SPF 50',
                        slug: 'sunscreen-spf-50',
                        description: 'Broad-spectrum protection with zinc oxide and antioxidants.',
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
                    {
                        _id: 'shop-demo-9',
                        name: 'Vitamin C Essence',
                        slug: 'vitamin-c-essence',
                        description: 'Powerful essence for brightening and anti-aging.',
                        price: 59.99,
                        images: [{ public_id: 'essence-1', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500' }],
                        category: { _id: 'cat-1', name: 'Serums', slug: 'serums', isActive: true },
                        stock: 36,
                        ratings: { average: 4.9, count: 234 },
                        isFeatured: true,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        _id: 'shop-demo-10',
                        name: 'Anti-Aging Retinol Cream',
                        slug: 'anti-aging-retinol-cream',
                        description: 'Advanced retinol formula for fine lines and wrinkles.',
                        price: 69.99,
                        images: [{ public_id: 'retinol-1', url: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500' }],
                        category: { _id: 'cat-2', name: 'Moisturizers', slug: 'moisturizers', isActive: true },
                        stock: 24,
                        ratings: { average: 4.8, count: 187 },
                        isFeatured: true,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        _id: 'shop-demo-11',
                        name: 'Micellar Water',
                        slug: 'micellar-water',
                        description: 'Gentle makeup remover and cleanser in one.',
                        price: 19.99,
                        images: [{ public_id: 'micellar-1', url: 'https://images.unsplash.com/photo-1625315742319-f8e13d6f95c0?w=500' }],
                        category: { _id: 'cat-3', name: 'Cleansers', slug: 'cleansers', isActive: true },
                        stock: 78,
                        ratings: { average: 4.6, count: 156 },
                        isFeatured: false,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        _id: 'shop-demo-12',
                        name: 'Clay Detox Mask',
                        slug: 'clay-detox-mask',
                        description: 'Deep cleansing clay mask for purified skin.',
                        price: 36.99,
                        images: [{ public_id: 'clay-mask-1', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500' }],
                        category: { _id: 'cat-6', name: 'Masks', slug: 'masks', isActive: true },
                        stock: 42,
                        ratings: { average: 4.7, count: 173 },
                        isFeatured: false,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                ];

                setProducts(demoProducts);
                setPagination({
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: demoProducts.length,
                    itemsPerPage: 12,
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, [filters]);

    // Update filters from URL on route change
    useEffect(() => {
        setFilters(getFiltersFromUrl());
    }, [searchParams, getFiltersFromUrl]);

    // Handle filter changes
    const handleFilterChange = (newFilters: ProductFilters) => {
        setFilters(newFilters);
        updateUrl(newFilters);
    };

    // Clear all filters
    const handleClearFilters = () => {
        const clearedFilters: ProductFilters = {
            sort: '-createdAt',
            page: 1,
            limit: 12,
        };
        setFilters(clearedFilters);
        router.push('/shop');
    };

    // Handle sort change
    const handleSortChange = (sort: string) => {
        handleFilterChange({ ...filters, sort, page: 1 });
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        handleFilterChange({ ...filters, page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentSortLabel =
        SORT_OPTIONS.find((opt) => opt.value === filters.sort)?.label || 'Newest';

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-display font-semibold text-white mb-2">
                        Shop
                    </h1>
                    <p className="text-[var(--color-primary-light)] text-lg">
                        Discover our collection of natural beauty products
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <ProductFiltersComponent
                        categories={categories}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                        totalProducts={pagination.totalItems}
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
                            {/* Product Count - Desktop */}
                            <span className="hidden lg:block text-sm text-[var(--color-gray-600)]">
                                Showing {products.length} of {pagination.totalItems} products
                            </span>

                            <div className="flex items-center gap-4 ml-auto">
                                {/* Sort Dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gray-50)] rounded-lg text-sm text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)] transition-colors">
                                        Sort: {currentSortLabel}
                                        <ChevronDown size={16} />
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--color-gray-100)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                        {SORT_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleSortChange(option.value)}
                                                className={`
                          block w-full text-left px-4 py-2.5 text-sm
                          hover:bg-[var(--color-gray-50)] transition-colors
                          ${filters.sort === option.value
                                                        ? 'text-[var(--color-primary)] font-medium'
                                                        : 'text-[var(--color-gray-700)]'
                                                    }
                        `}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Grid Toggle */}
                                <div className="hidden md:flex items-center border border-[var(--color-gray-200)] rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setGridView('large')}
                                        className={`p-2 ${gridView === 'large'
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'text-[var(--color-gray-500)] hover:bg-[var(--color-gray-50)]'
                                            }`}
                                    >
                                        <LayoutGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setGridView('small')}
                                        className={`p-2 ${gridView === 'small'
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'text-[var(--color-gray-500)] hover:bg-[var(--color-gray-50)]'
                                            }`}
                                    >
                                        <Grid3X3 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
                            </div>
                        )}

                        {/* Error State */}
                        {error && !isLoading && (
                            <div className="text-center py-20">
                                <p className="text-[var(--color-error)] mb-4">{error}</p>
                                <button
                                    onClick={() => setFilters({ ...filters })}
                                    className="text-[var(--color-primary)] hover:underline"
                                >
                                    Try again
                                </button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && !error && products.length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-gray-100)] rounded-full flex items-center justify-center">
                                    <Grid3X3 size={40} className="text-[var(--color-gray-400)]" />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--color-gray-900)] mb-2">
                                    No products found
                                </h3>
                                <p className="text-[var(--color-gray-500)] mb-6">
                                    Try adjusting your filters or search terms
                                </p>
                                <button
                                    onClick={handleClearFilters}
                                    className="text-[var(--color-primary)] hover:underline font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Products Grid */}
                        {!isLoading && !error && products.length > 0 && (
                            <>
                                <div
                                    className={`grid gap-6 ${gridView === 'large'
                                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                                        }`}
                                >
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={pagination.currentPage === 1}
                                            className="px-4 py-2 rounded-lg border border-[var(--color-gray-200)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (pagination.totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (pagination.currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (pagination.currentPage >= pagination.totalPages - 2) {
                                                pageNum = pagination.totalPages - 4 + i;
                                            } else {
                                                pageNum = pagination.currentPage - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`w-10 h-10 rounded-lg font-medium ${pagination.currentPage === pageNum
                                                        ? 'bg-[var(--color-primary)] text-white'
                                                        : 'border border-[var(--color-gray-200)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)]'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={pagination.currentPage === pagination.totalPages}
                                            className="px-4 py-2 rounded-lg border border-[var(--color-gray-200)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
