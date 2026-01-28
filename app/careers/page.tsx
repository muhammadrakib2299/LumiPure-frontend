export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-text)] mb-6 text-center">
                        Careers
                    </h1>
                    <p className="text-lg text-[var(--color-gray-600)] mb-12 text-center">
                        Join our team and help us bring natural beauty to the world.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-[var(--color-gray-200)]">
                        <p className="text-[var(--color-gray-500)] text-center">
                            Career opportunities and job listings will be posted here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
