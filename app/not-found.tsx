import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-gray-50)] px-4">
            <h1 className="text-6xl font-display font-bold text-[var(--color-primary)] mb-4">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-[var(--color-gray-900)] mb-2">
                Page Not Found
            </h2>
            <p className="text-[var(--color-gray-500)] mb-8 text-center max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/"
                    className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                    Go Home
                </Link>
                <Link
                    href="/shop"
                    className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                    Shop Products
                </Link>
            </div>
        </div>
    );
}
