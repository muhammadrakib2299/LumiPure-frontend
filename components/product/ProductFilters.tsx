'use client';

import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Category, ProductFilters, PRICE_RANGES, SORT_OPTIONS } from '@/types';
import { Button } from '@/components/ui';

interface ProductFiltersProps {
    categories: Category[];
    filters: ProductFilters;
    onFilterChange: (filters: ProductFilters) => void;
    onClearFilters: () => void;
    totalProducts: number;
}

export function ProductFiltersComponent({
    categories,
    filters,
    onFilterChange,
    onClearFilters,
    totalProducts,
}: ProductFiltersProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        sort: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleCategoryChange = (categoryId: string) => {
        onFilterChange({
            ...filters,
            category: filters.category === categoryId ? undefined : categoryId,
            page: 1,
        });
    };

    const handlePriceChange = (min?: number, max?: number) => {
        const isSameRange = filters.minPrice === min && filters.maxPrice === max;
        onFilterChange({
            ...filters,
            minPrice: isSameRange ? undefined : min,
            maxPrice: isSameRange ? undefined : max,
            page: 1,
        });
    };

    const handleSortChange = (sort: string) => {
        onFilterChange({
            ...filters,
            sort,
        });
    };

    const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice;

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Category Filter */}
            <div className="border-b border-[var(--color-gray-200)] pb-6">
                <button
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h3 className="font-semibold text-[var(--color-gray-900)]">Category</h3>
                    <ChevronDown
                        size={18}
                        className={`text-[var(--color-gray-500)] transition-transform ${expandedSections.category ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {expandedSections.category && (
                    <div className="mt-4 space-y-2">
                        {categories.map((cat) => (
                            <label
                                key={cat._id}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.category === cat._id}
                                    onChange={() => handleCategoryChange(cat._id)}
                                    className="w-4 h-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                />
                                <span className="text-[var(--color-gray-600)] group-hover:text-[var(--color-gray-900)] transition-colors">
                                    {cat.name}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="border-b border-[var(--color-gray-200)] pb-6">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h3 className="font-semibold text-[var(--color-gray-900)]">Price</h3>
                    <ChevronDown
                        size={18}
                        className={`text-[var(--color-gray-500)] transition-transform ${expandedSections.price ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {expandedSections.price && (
                    <div className="mt-4 space-y-2">
                        {PRICE_RANGES.map((range, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        filters.minPrice === range.min && filters.maxPrice === range.max
                                    }
                                    onChange={() => handlePriceChange(range.min, range.max)}
                                    className="w-4 h-4 rounded border-[var(--color-gray-300)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                />
                                <span className="text-[var(--color-gray-600)] group-hover:text-[var(--color-gray-900)] transition-colors">
                                    {range.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Sort (Mobile Only) */}
            <div className="lg:hidden border-b border-[var(--color-gray-200)] pb-6">
                <button
                    onClick={() => toggleSection('sort')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h3 className="font-semibold text-[var(--color-gray-900)]">Sort By</h3>
                    <ChevronDown
                        size={18}
                        className={`text-[var(--color-gray-500)] transition-transform ${expandedSections.sort ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {expandedSections.sort && (
                    <div className="mt-4 space-y-2">
                        {SORT_OPTIONS.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={filters.sort === option.value}
                                    onChange={() => handleSortChange(option.value)}
                                    className="w-4 h-4 border-[var(--color-gray-300)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                />
                                <span className="text-[var(--color-gray-600)] group-hover:text-[var(--color-gray-900)] transition-colors">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button variant="outline" fullWidth onClick={onClearFilters}>
                    <X size={16} />
                    Clear Filters
                </Button>
            )}
        </div>
    );

    return (
        <>
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
                <span className="text-sm text-[var(--color-gray-600)]">
                    {totalProducts} products
                </span>
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--color-gray-200)] rounded-lg text-[var(--color-gray-700)] hover:border-[var(--color-primary)] transition-colors"
                >
                    <SlidersHorizontal size={18} />
                    Filters
                    {hasActiveFilters && (
                        <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full" />
                    )}
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-semibold text-lg text-[var(--color-gray-900)]">Filters</h2>
                        <span className="text-sm text-[var(--color-gray-500))]">{totalProducts} products</span>
                    </div>
                    <FilterContent />
                </div>
            </aside>

            {/* Mobile Filter Drawer */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white animate-slide-right">
                        <div className="flex items-center justify-between p-4 border-b border-[var(--color-gray-200)]">
                            <h2 className="font-semibold text-lg">Filters</h2>
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-2 text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                            <FilterContent />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
