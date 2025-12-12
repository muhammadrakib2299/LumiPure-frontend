'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from '@/types';

interface ProductGalleryProps {
    images: ProductImage[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const hasImages = images && images.length > 0;
    const currentImage = hasImages ? images[selectedIndex] : null;

    const goToPrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--color-gray-100)]">
                {currentImage ? (
                    <Image
                        src={currentImage.url}
                        alt={`${productName} - Image ${selectedIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-gray-400)]">
                        No Image Available
                    </div>
                )}

                {/* Navigation Arrows */}
                {hasImages && images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} className="text-[var(--color-gray-700)]" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} className="text-[var(--color-gray-700)]" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail Strip */}
            {hasImages && images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {images.map((image, index) => (
                        <button
                            key={image.public_id || index}
                            onClick={() => setSelectedIndex(index)}
                            className={`
                relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden
                transition-all duration-200
                ${selectedIndex === index
                                    ? 'ring-2 ring-[var(--color-primary)] ring-offset-2'
                                    : 'opacity-70 hover:opacity-100'
                                }
              `}
                        >
                            <Image
                                src={image.url}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
