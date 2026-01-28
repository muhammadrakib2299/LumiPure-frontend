export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text)] mb-6 text-center">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-12 text-center">
                        How we collect, use, and protect your personal information.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[var(--color-gray-200)] space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Information We Collect</h2>
                            <p className="text-[var(--color-gray-600)]">
                                We collect information you provide directly to us when using our services.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">How We Use Your Information</h2>
                            <p className="text-[var(--color-gray-600)]">
                                Your information is used to provide, maintain, and improve our services.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Data Security</h2>
                            <p className="text-[var(--color-gray-600)]">
                                We implement appropriate security measures to protect your personal information.
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
