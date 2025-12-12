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
        // Only run on client-side
        if (typeof window === 'undefined') {
            return;
        }

        const checkAccess = () => {
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

            // Check if user is authenticated
            if (!isAuthenticated) {
                // Auto-enable demo mode for testing
                console.log('No authentication found - enabling demo mode');
                localStorage.setItem('admin_demo_mode', 'true');
                setUser(
                    {
                        id: 'demo-admin',
                        name: 'Demo Admin',
                        email: 'demo@lumipure.com',
                        role: 'admin',
                    },
                    'demo-token'
                );
                setIsChecking(false);
                return;
            }

            // Check if user is admin
            if (user?.role !== 'admin') {
                router.push('/admin/login');
                return;
            }

            setIsChecking(false);
        };

        checkAccess();
    }, [isAuthenticated, user, router, setUser]);

    // Show loading while checking
    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 size={40} className="animate-spin text-[var(--color-primary)] mx-auto mb-4" />
                    <p className="text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
