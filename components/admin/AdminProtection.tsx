'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader2 } from 'lucide-react';

export function AdminProtection({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isAuthenticated, setUser } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Check for demo mode
        const isDemoMode = localStorage.getItem('admin_demo_mode') === 'true';

        if (isDemoMode) {
            // Set demo admin user
            if (!user || user.role !== 'admin') {
                setUser(
                    {
                        id: 'demo-admin',
                        name: 'Demo Admin',
                        email: 'demo@lumipure.com',
                        role: 'admin',
                    },
                    'demo-token'
                );
            }
            setIsChecking(false);
            return;
        }

        // Normal auth check
        if (!isAuthenticated) {
            router.push('/admin/login');
            return;
        }

        if (user?.role !== 'admin') {
            router.push('/admin/login');
            return;
        }

        setIsChecking(false);
    }, [isAuthenticated, user, router, setUser]);

    // Show loading while checking
    if (isChecking) {
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
