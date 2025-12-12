'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader2 } from 'lucide-react';

export function AdminProtection({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        // Check if user is authenticated and is admin
        if (!isAuthenticated) {
            router.push('/admin/login');
            return;
        }

        if (user?.role !== 'admin') {
            router.push('/admin/login');
            return;
        }
    }, [isAuthenticated, user, router]);

    // Show loading while checking
    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 size={40} className="animate-spin text-[var(--color-primary)] mx-auto mb-4" />
                    <p className="text-gray-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
