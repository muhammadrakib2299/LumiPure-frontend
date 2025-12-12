import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ShopContent from './ShopContent';

function LoadingFallback() {
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

            {/* Loading State */}
            <div className="container mx-auto px-4 lg:px-8 py-20">
                <div className="flex items-center justify-center">
                    <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ShopContent />
        </Suspense>
    );
}
