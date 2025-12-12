import Link from 'next/link';

interface LogoProps {
    variant?: 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
    const sizes = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
    };

    const colors = {
        light: 'text-white',
        dark: 'text-[var(--color-gray-900)]',
    };

    return (
        <Link href="/" className="flex items-center gap-1 group">
            <span
                className={`
          font-display font-semibold tracking-tight
          ${sizes[size]} ${colors[variant]}
          transition-colors duration-200
        `}
            >
                Lumi
                <span className="text-[var(--color-primary)]">Pure</span>
            </span>
        </Link>
    );
}
