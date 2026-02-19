import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah M.',
        role: 'Verified Buyer',
        text: 'The Hydrating Rose Serum transformed my skin in just two weeks. My complexion is brighter and feels so much softer. Absolutely love it!',
        rating: 5,
        product: 'Hydrating Rose Serum',
    },
    {
        name: 'Emily R.',
        role: 'Verified Buyer',
        text: "I've tried dozens of cleansers and nothing compares to this. It's gentle but effective - my skin feels clean without being stripped or dry.",
        rating: 5,
        product: 'Gentle Foaming Cleanser',
    },
    {
        name: 'Jessica T.',
        role: 'Verified Buyer',
        text: 'Finally a brand that delivers on its promises. The overnight mask is my holy grail product. I wake up with the softest, most plump skin ever.',
        rating: 5,
        product: 'Overnight Recovery Mask',
    },
];

export function Testimonials() {
    return (
        <section className="py-16 lg:py-20 bg-[var(--color-cream)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-gray-900)] mb-3">
                        What Our Customers Say
                    </h2>
                    <p className="text-[var(--color-gray-500)] max-w-lg mx-auto">
                        Real reviews from real people who love their skin
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Quote size={28} className="text-[var(--color-primary)]/20 mb-3" />

                            {/* Stars */}
                            <div className="flex items-center gap-0.5 mb-3">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            <p className="text-sm text-[var(--color-gray-600)] leading-relaxed mb-4">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            <div className="border-t border-[var(--color-gray-100)] pt-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-[var(--color-gray-900)]">{t.name}</p>
                                    <p className="text-xs text-[var(--color-gray-400)]">{t.role}</p>
                                </div>
                                <span className="text-xs text-[var(--color-primary)] font-medium bg-[var(--color-primary)]/5 px-2 py-1 rounded-full">
                                    {t.product}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
