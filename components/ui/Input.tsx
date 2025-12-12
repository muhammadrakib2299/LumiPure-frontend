'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            type = 'text',
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-[var(--color-gray-700)]"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)]">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        type={type}
                        className={cn(
                            `
                w-full px-4 py-2.5
                bg-white border rounded-lg
                text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)]
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-0
                disabled:bg-[var(--color-gray-100)] disabled:cursor-not-allowed
              `,
                            error
                                ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]/20 focus:border-[var(--color-error)]'
                                : 'border-[var(--color-gray-300)] focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]',
                            leftIcon ? 'pl-10' : '',
                            rightIcon ? 'pr-10' : '',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)]">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {(error || helperText) && (
                    <p
                        className={cn(
                            'text-sm',
                            error ? 'text-[var(--color-error)]' : 'text-[var(--color-gray-500)]'
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
