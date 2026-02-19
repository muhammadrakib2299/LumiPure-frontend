'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import api from '@/lib/api';

interface HeroSlide {
    _id: string;
    title?: string;
    subtitle?: string;
    mediaType: 'image' | 'video';
    media: { public_id: string; url: string };
    buttonText?: string;
    buttonLink?: string;
    order: number;
    isActive: boolean;
}

export function HeroSection() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [current, setCurrent] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchSlides() {
            try {
                const res = await api.get('/hero');
                const data = res as unknown as { success: boolean; data: { slides: HeroSlide[] } };
                const fetched = data?.data?.slides || [];
                setSlides(fetched);
            } catch {
                // No slides from API - show fallback
            } finally {
                setLoaded(true);
            }
        }
        fetchSlides();
    }, []);

    // Auto-advance slides
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goTo = useCallback((index: number) => {
        setCurrent(index);
    }, []);

    const prev = useCallback(() => {
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % slides.length);
    }, [slides.length]);

    // Fallback hero when no slides from API
    if (loaded && slides.length === 0) {
        return <FallbackHero />;
    }

    if (!loaded) {
        return (
            <section className="relative min-h-[90vh] bg-[var(--color-gray-50)] flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </section>
        );
    }

    const slide = slides[current];

    return (
        <section className="relative min-h-[90vh] overflow-hidden bg-black">
            {/* Media */}
            {slides.map((s, i) => (
                <div
                    key={s._id}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    {s.mediaType === 'video' ? (
                        <video
                            src={s.media.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={s.media.url}
                            alt={s.title || 'Hero image'}
                            fill
                            priority={i === 0}
                            className="object-cover"
                            sizes="100vw"
                        />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[90vh] flex items-center">
                <div className="max-w-2xl text-white">
                    {slide?.title && (
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.1] mb-4 animate-fade-in">
                            {slide.title}
                        </h1>
                    )}
                    {slide?.subtitle && (
                        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-lg animate-fade-in">
                            {slide.subtitle}
                        </p>
                    )}
                    {slide?.buttonText && slide?.buttonLink && (
                        <Link href={slide.buttonLink}>
                            <Button size="lg" className="group bg-white text-[var(--color-gray-900)] hover:bg-white/90">
                                {slide.buttonText}
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Navigation arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

/** Static fallback when no hero slides are configured */
function FallbackHero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-cream)] via-white to-[var(--color-secondary-light)]/20">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-0 bg-[var(--color-primary-light)]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-accent-light)]/20 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center py-24 lg:py-40">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-[var(--color-gray-900)] leading-[1.1] mb-5">
                        Natural Beauty,{' '}
                        <span className="text-[var(--color-primary)]">Pure</span>{' '}
                        Ingredients
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--color-gray-500)] leading-relaxed mb-8 max-w-lg mx-auto">
                        Premium skincare crafted with organic botanicals.
                        Experience the transformative power of nature.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/shop">
                            <Button size="lg" className="group">
                                Shop Now
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg">Our Story</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
