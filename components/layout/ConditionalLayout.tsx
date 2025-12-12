'use client';

import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components/layout';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    if (isAdminRoute) {
        // Admin routes - no navbar/footer
        return <>{children}</>;
    }

    // Client routes - with navbar/footer
    return (
        <>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    );
}
