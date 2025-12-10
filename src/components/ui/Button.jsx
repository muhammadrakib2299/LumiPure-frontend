import { cn } from "@/lib/utils";

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary-900 text-white hover:bg-primary-800",
        secondary: "bg-secondary-400 text-primary-900 hover:bg-secondary-500",
        outline: "border-2 border-primary-900 text-primary-900 hover:bg-primary-50",
        ghost: "text-primary-900 hover:bg-primary-50",
        link: "text-primary-900 underline-offset-4 hover:underline",
    };

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
