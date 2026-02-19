export default function GiftCardsPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--foreground)] mb-6">
                        Gift Cards
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-8">
                        Give the gift of natural beauty. Perfect for any occasion!
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-12 border border-[var(--color-gray-200)]">
                        <p className="text-[var(--color-gray-500)]">
                            Gift card options will be available here soon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
