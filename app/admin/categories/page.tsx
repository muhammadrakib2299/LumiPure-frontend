'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    productCount: number;
    isActive: boolean;
}

// Demo categories
const demoCategories: Category[] = [
    { _id: '1', name: 'Skincare', slug: 'skincare', description: 'Complete skincare solutions', productCount: 45, isActive: true },
    { _id: '2', name: 'Cleansers', slug: 'cleansers', description: 'Gentle cleansers for all skin types', productCount: 12, isActive: true },
    { _id: '3', name: 'Serums', slug: 'serums', description: 'Concentrated treatments', productCount: 18, isActive: true },
    { _id: '4', name: 'Moisturizers', slug: 'moisturizers', description: 'Hydrating creams and lotions', productCount: 22, isActive: true },
    { _id: '5', name: 'Masks', slug: 'masks', description: 'Face masks for deep treatment', productCount: 15, isActive: true },
    { _id: '6', name: 'Sun Protection', slug: 'sun-protection', description: 'Sunscreens and UV protection', productCount: 8, isActive: true },
];

export default function AdminCategoriesPage() {
    const [categories] = useState<Category[]>(demoCategories);
    const [showModal, setShowModal] = useState(false);

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                        <p className="text-gray-600 mt-1">Manage product categories</p>
                    </div>
                    <Button onClick={() => setShowModal(true)} className="gap-2">
                        <Plus size={20} />
                        Add Category
                    </Button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                                        <Tag size={24} className="text-[var(--color-primary)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                        <p className="text-sm text-gray-500">/{category.slug}</p>
                                    </div>
                                </div>
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${category.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {category.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    {category.productCount} products
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => alert('Demo Mode: Edit requires database')}
                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => alert('Demo Mode: Delete requires database')}
                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Category Modal (placeholder) */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Category</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Facial Oils"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Brief description..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={() => {
                                            alert('Demo Mode: Create requires database');
                                            setShowModal(false);
                                        }}
                                        fullWidth
                                    >
                                        Create Category
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowModal(false)}
                                        fullWidth
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
