'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge class names
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-60
    `;

        const variants = {
            primary: `
        bg-[var(--color-primary)] text-white
        hover:bg-[var(--color-primary-dark)]
        focus-visible:ring-[var(--color-primary)]
      `,
            secondary: `
        bg-[var(--color-secondary)] text-[var(--color-gray-900)]
        hover:bg-[var(--color-secondary-dark)]
        focus-visible:ring-[var(--color-secondary)]
      `,
            outline: `
        border-2 border-[var(--color-primary)] text-[var(--color-primary)]
        bg-transparent
        hover:bg-[var(--color-primary)] hover:text-white
        focus-visible:ring-[var(--color-primary)]
      `,
            ghost: `
        bg-transparent text-[var(--color-gray-700)]
        hover:bg-[var(--color-gray-100)] hover:text-[var(--color-gray-900)]
        focus-visible:ring-[var(--color-gray-400)]
      `,
            danger: `
        bg-[var(--color-error)] text-white
        hover:bg-red-600
        focus-visible:ring-[var(--color-error)]
      `,
        };

        const sizes = {
            sm: 'text-sm px-3 py-1.5 rounded-md',
            md: 'text-base px-5 py-2.5 rounded-lg',
            lg: 'text-lg px-7 py-3.5 rounded-lg',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span>Loading...</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
