export default function SalePage() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6">
                        Sale Products
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-8">
                        Discover amazing deals on our premium skincare products. Limited time offers!
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-12 border border-[var(--color-gray-200)]">
                        <p className="text-[var(--color-gray-500)]">
                            Sale products will be displayed here. Check back soon for exclusive offers!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
