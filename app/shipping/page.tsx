export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text)] mb-6 text-center">
                        Shipping Information
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-12 text-center">
                        Everything you need to know about our shipping policies and delivery times.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[var(--color-gray-200)]">
                        <p className="text-[var(--color-gray-500)] text-center">
                            Detailed shipping information will be available here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
