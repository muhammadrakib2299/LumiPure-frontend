export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6 text-center">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-12 text-center">
                        Terms and conditions governing the use of our website and services.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[var(--color-gray-200)] space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Acceptance of Terms</h2>
                            <p className="text-[var(--color-gray-600)]">
                                By accessing and using this website, you accept and agree to be bound by these terms.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Use License</h2>
                            <p className="text-[var(--color-gray-600)]">
                                Permission is granted to temporarily access the materials on LumiPure's website for personal, non-commercial use only.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">User Responsibilities</h2>
                            <p className="text-[var(--color-gray-600)]">
                                You are responsible for maintaining the confidentiality of your account information.
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
