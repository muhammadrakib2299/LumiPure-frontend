import Link from 'next/link';
import { ArrowRight, Sparkles, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Testimonials } from '@/components/home/Testimonials';

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section - Dynamic from Admin */}
            <HeroSection />

            {/* Features Strip */}
            <section className="py-14 bg-white border-b border-[var(--color-gray-100)]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="text-center group">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                                <Leaf size={24} className="text-[var(--color-primary)] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-display font-semibold text-[var(--color-gray-900)] mb-2">
                                100% Natural
                            </h3>
                            <p className="text-sm text-[var(--color-gray-500)] leading-relaxed max-w-xs mx-auto">
                                Organic ingredients, free from harmful chemicals and parabens.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                                <Heart size={24} className="text-[var(--color-accent)] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-display font-semibold text-[var(--color-gray-900)] mb-2">
                                Cruelty Free
                            </h3>
                            <p className="text-sm text-[var(--color-gray-500)] leading-relaxed max-w-xs mx-auto">
                                Never tested on animals. Certified cruelty-free and ethically sourced.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-secondary)]/20 flex items-center justify-center group-hover:bg-[var(--color-secondary)] transition-colors duration-300">
                                <Sparkles size={24} className="text-[var(--color-secondary-dark)] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-display font-semibold text-[var(--color-gray-900)] mb-2">
                                Proven Results
                            </h3>
                            <p className="text-sm text-[var(--color-gray-500)] leading-relaxed max-w-xs mx-auto">
                                Clinically tested formulas trusted by thousands of happy customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products / Bestsellers */}
            <FeaturedProducts />

            {/* Testimonials */}
            <Testimonials />

            {/* CTA Banner */}
            <section className="py-16 lg:py-20 bg-[var(--color-primary)]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white mb-3">
                        Ready for Your Best Skin?
                    </h2>
                    <p className="text-white/70 max-w-md mx-auto mb-8">
                        Start your natural skincare journey today. Free shipping on orders over $50.
                    </p>
                    <Link href="/shop">
                        <Button variant="secondary" size="lg" className="group">
                            Shop the Collection
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
