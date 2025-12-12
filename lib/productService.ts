import api from '@/lib/api';
import { Product, ProductsResponse, ProductFilters, Category } from '@/types';

// Get all products with filters
export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.sort) params.append('sort', filters.sort);

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
}

// Get single product by ID
export async function getProduct(id: string): Promise<{ product: Product }> {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

// Get featured products
export async function getFeaturedProducts(): Promise<{ products: Product[] }> {
    const response = await api.get('/products/featured');
    return response.data;
}

// Get all categories
export async function getCategories(): Promise<{ categories: Category[] }> {
    const response = await api.get('/categories');
    return response.data;
}

// Search products
export async function searchProducts(query: string): Promise<ProductsResponse> {
    return getProducts({ search: query });
}
