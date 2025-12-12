'use client';

import { useState } from 'react';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && onSearch) {
            onSearch(query.trim());
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className={`relative ${className}`}>
            {/* Search Toggle Button (Mobile/Collapsed) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
                    aria-label="Open search"
                >
                    <Search size={20} />
                </button>
            )}

            {/* Expanded Search Form */}
            {isOpen && (
                <form
                    onSubmit={handleSubmit}
                    className="
            absolute right-0 top-1/2 -translate-y-1/2
            flex items-center gap-2
            bg-white border border-[var(--color-gray-200)]
            rounded-full px-4 py-2 shadow-md
            animate-fade-in
            min-w-[280px]
          "
                >
                    <Search size={18} className="text-[var(--color-gray-400)] flex-shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className="
              flex-1 bg-transparent text-sm
              text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)]
              focus:outline-none
            "
                        autoFocus
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
    );
}
