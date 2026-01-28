export default function FAQPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text)] mb-6 text-center">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-12 text-center">
                        Find answers to common questions about our products and services.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[var(--color-gray-200)]">
                        <p className="text-[var(--color-gray-500)] text-center">
                            Frequently asked questions will be listed here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
