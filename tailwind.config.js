/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
            },
            colors: {
                primary: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#044e43', // Deep Emerald (Main Brand)
                    950: '#022c22',
                },
                secondary: {
                    50: '#fbf9f1',
                    100: '#f5f0db',
                    200: '#ebe0be',
                    300: '#dec692',
                    400: '#d4c5a3', // Soft Gold (Accent)
                    500: '#bfa068',
                    600: '#a3814f',
                    700: '#85643d',
                    800: '#6d5135',
                    900: '#59432e',
                },
                dark: {
                    DEFAULT: '#18181b', // Zing-950 equivalent
                    surface: '#27272a',
                }
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            }
        },
    },
    plugins: [],
};
