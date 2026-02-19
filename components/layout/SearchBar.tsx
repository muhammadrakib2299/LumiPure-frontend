'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({
    onSearch,
    placeholder = 'Search products...',
    className = '',
}: SearchBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            if (onSearch) {
                onSearch(query.trim());
            } else {
                router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
            }
            setIsOpen(false);
            setQuery('');
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className={`relative ${className}`}>
            {/* Desktop: Always-visible inline search */}
            <form
                onSubmit={handleSubmit}
                className="hidden md:flex items-center gap-2 bg-[var(--color-gray-100)] rounded-full px-4 py-2 w-[220px] lg:w-[260px] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 focus-within:bg-white focus-within:shadow-sm transition-all duration-200"
            >
                <Search size={16} className="text-[var(--color-gray-400)] flex-shrink-0" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-sm text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="p-0.5 text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)] transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </form>

            {/* Mobile: Toggle icon + expandable overlay */}
            <div className="md:hidden">
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Open search"
                    >
                        <Search size={20} />
                    </button>
                )}

                {isOpen && (
                    <form
                        onSubmit={handleSubmit}
                        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white border border-[var(--color-gray-200)] rounded-full px-4 py-2 shadow-lg min-w-[280px] animate-fade-in"
                    >
                        <Search size={16} className="text-[var(--color-gray-400)] flex-shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 bg-transparent text-sm text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleClose}
                            className="p-1 text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)] transition-colors"
                            aria-label="Close search"
                        >
                            <X size={16} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
