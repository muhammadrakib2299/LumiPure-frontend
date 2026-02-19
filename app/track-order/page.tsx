export default function TrackOrderPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6 text-center">
                        Track Your Order
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-12 text-center">
                        Enter your order number to track your shipment.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[var(--color-gray-200)]">
                        <p className="text-[var(--color-gray-500)] text-center">
                            Order tracking functionality will be available here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
