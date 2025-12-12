import Link from 'next/link';
import { Leaf, Heart, Award, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] py-24 lg:py-32">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full" />
                </div>
                <div className="container mx-auto px-4 lg:px-8 relative">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl lg:text-6xl font-display font-semibold text-white mb-6">
                            Beauty That&apos;s Pure, Inside and Out
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed">
                            At LumiPure, we believe that true beauty comes from nature. Our mission is to create
                            skincare products that are as pure as they are effective, using only the finest
                            natural ingredients.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl lg:text-4xl font-display font-semibold text-[var(--color-gray-900)] mb-6">
                            Our Story
                        </h2>
                        <p className="text-lg text-[var(--color-gray-600)] leading-relaxed mb-8">
                            Founded in 2020, LumiPure was born from a simple belief: everyone deserves access to
                            high-quality, natural skincare. Our founder, after struggling to find products that
                            were both effective and free from harmful chemicals, decided to create a brand that
                            would revolutionize the beauty industry.
                        </p>
                        <p className="text-lg text-[var(--color-gray-600)] leading-relaxed">
                            Today, we&apos;re proud to offer a complete line of skincare products that harness the
                            power of nature. Every product is formulated with carefully selected botanical
                            ingredients, backed by science, and crafted with love.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 lg:py-28 bg-[var(--color-gray-50)]">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="text-3xl lg:text-4xl font-display font-semibold text-[var(--color-gray-900)] text-center mb-16">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                                <Leaf size={32} className="text-[var(--color-primary)]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
                                100% Natural
                            </h3>
                            <p className="text-[var(--color-gray-600)]">
                                We use only natural, plant-based ingredients in all our products.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                                <Heart size={32} className="text-[var(--color-accent)]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
                                Cruelty-Free
                            </h3>
                            <p className="text-[var(--color-gray-600)]">
                                We never test on animals and all our products are cruelty-free certified.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                <Award size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
                                Quality First
                            </h3>
                            <p className="text-[var(--color-gray-600)]">
                                Every product goes through rigorous testing to ensure maximum effectiveness.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                                <Users size={32} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-gray-900)] mb-3">
                                Community
                            </h3>
                            <p className="text-[var(--color-gray-600)]">
                                We give back to our community and support sustainable farming practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl lg:text-4xl font-display font-semibold text-[var(--color-gray-900)] mb-6">
                            Ready to Experience the Difference?
                        </h2>
                        <p className="text-lg text-[var(--color-gray-600)] mb-8">
                            Join thousands of happy customers who have transformed their skincare routine with LumiPure.
                        </p>
                        <Link href="/shop">
                            <Button size="lg">
                                Shop Now
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
