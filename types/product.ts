// Product Types
export interface ProductImage {
    public_id: string;
    url: string;
}

export interface ProductVariant {
    name: string;
    options: string[];
}

export interface ProductRatings {
    average: number;
    count: number;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: {
        public_id: string;
        url: string;
    };
    parentCategory?: string | null;
    isActive: boolean;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    price: number;
    comparePrice?: number;
    images: ProductImage[];
    category: Category | string;
    stock: number;
    sku?: string;
    brand?: string;
    variants?: ProductVariant[];
    ingredients?: string;
    howToUse?: string;
    ratings: ProductRatings;
    isFeatured: boolean;
    isActive: boolean;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ProductsResponse {
    products: Product[];
    pagination: PaginationMeta;
}

// Filter Types
export interface ProductFilters {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

export type SortOption = {
    value: string;
    label: string;
};

export const SORT_OPTIONS: SortOption[] = [
    { value: '-createdAt', label: 'Newest' },
    { value: 'createdAt', label: 'Oldest' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-ratings.average', label: 'Top Rated' },
    { value: 'name', label: 'Name: A to Z' },
    { value: '-name', label: 'Name: Z to A' },
];

export const PRICE_RANGES = [
    { min: 0, max: 25, label: 'Under $25' },
    { min: 25, max: 50, label: '$25 - $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 200, label: '$100 - $200' },
    { min: 200, max: undefined, label: 'Over $200' },
];
