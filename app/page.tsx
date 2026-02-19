import Link from 'next/link';
import { ArrowRight, Sparkles, Leaf, Heart, ShieldCheck, Package } from 'lucide-react';
import { Button } from '@/components/ui';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { Testimonials } from '@/components/home/Testimonials';

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section - Split Layout */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-cream)] via-white to-[var(--color-secondary-light)]/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] py-16 lg:py-0">
                        {/* Left - Text Content */}
                        <div className="max-w-xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-gray-100)]">
                                <Sparkles size={14} className="text-[var(--color-primary)]" />
                                <span className="text-xs font-medium text-[var(--color-gray-600)]">
                                    New Collection Available
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-[var(--color-gray-900)] leading-[1.1] mb-5">
                                Natural Beauty,{' '}
                                <span className="text-[var(--color-primary)]">Pure</span>{' '}
                                Ingredients
                            </h1>

                            <p className="text-base sm:text-lg text-[var(--color-gray-500)] leading-relaxed mb-8 max-w-md">
                                Premium skincare crafted with organic botanicals.
                                Experience the transformative power of nature for radiant, healthy skin.
                            </p>

                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                <Link href="/shop">
                                    <Button size="lg" className="group">
                                        Shop Now
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" size="lg">
                                        Our Story
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[var(--color-gray-100)]">
                                <div className="flex items-center gap-2 text-[var(--color-gray-500)]">
                                    <Leaf size={16} className="text-[var(--color-primary)]" />
                                    <span className="text-xs font-medium">100% Organic</span>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--color-gray-500)]">
                                    <ShieldCheck size={16} className="text-[var(--color-primary)]" />
                                    <span className="text-xs font-medium">Cruelty Free</span>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--color-gray-500)]">
                                    <Package size={16} className="text-[var(--color-primary)]" />
                                    <span className="text-xs font-medium">Free Shipping</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Visual */}
                        <div className="relative hidden lg:flex items-center justify-center">
                            {/* Decorative blobs */}
                            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[var(--color-primary-light)]/15 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[var(--color-accent-light)]/20 rounded-full blur-3xl" />

                            {/* Hero visual card */}
                            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--color-secondary-light)]/30 to-[var(--color-accent-light)]/20 border border-white/60 shadow-xl overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                                    <div className="w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                                        <Leaf size={36} className="text-[var(--color-primary)]" />
                                    </div>
                                    <p className="text-center font-display text-xl text-[var(--color-gray-700)]">
                                        Discover Your<br />
                                        <span className="text-[var(--color-primary)] font-semibold text-2xl">Natural Glow</span>
                                    </p>
                                    <p className="text-sm text-[var(--color-gray-400)] text-center max-w-xs">
                                        Sustainably sourced ingredients for every skin type
                                    </p>
                                </div>

                                {/* Floating stat cards */}
                                <div className="absolute top-6 right-6 bg-white rounded-xl shadow-lg px-4 py-3">
                                    <p className="text-xs text-[var(--color-gray-400)]">Happy Customers</p>
                                    <p className="text-lg font-bold text-[var(--color-gray-900)]">10K+</p>
                                </div>
                                <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg px-4 py-3">
                                    <p className="text-xs text-[var(--color-gray-400)]">Avg. Rating</p>
                                    <p className="text-lg font-bold text-[var(--color-primary)]">4.9 / 5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

            {/* Shop by Category */}
            <ShopByCategory />

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
