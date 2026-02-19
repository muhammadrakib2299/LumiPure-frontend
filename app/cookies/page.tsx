export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6 text-center">
                        Cookie Policy
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-12 text-center">
                        How we use cookies and similar technologies on our website.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[var(--color-gray-200)] space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">What Are Cookies?</h2>
                            <p className="text-[var(--color-gray-600)]">
                                Cookies are small text files stored on your device when you visit our website.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">How We Use Cookies</h2>
                            <p className="text-[var(--color-gray-600)]">
                                We use cookies to improve your browsing experience, personalize content, and analyze site traffic.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Managing Cookies</h2>
                            <p className="text-[var(--color-gray-600)]">
                                You can control and manage cookies through your browser settings.
                            </p>
                        </div>
                        <p className="text-sm text-[var(--color-gray-500)] pt-6 border-t border-[var(--color-gray-200)]">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
