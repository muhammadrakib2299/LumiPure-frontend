import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'LumiPure - Natural Beauty, Pure Ingredients',
  description:
    'Discover premium skincare products crafted with organic botanicals and sustainable practices. LumiPure brings you natural beauty solutions for radiant, healthy skin.',
  keywords: [
    'beauty',
    'skincare',
    'organic',
    'natural',
    'cosmetics',
    'sustainable beauty',
  ],
  openGraph: {
    title: 'LumiPure - Natural Beauty, Pure Ingredients',
    description:
      'Discover premium skincare products crafted with organic botanicals and sustainable practices.',
    type: 'website',
    locale: 'en_US',
    siteName: 'LumiPure',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Toaster position="top-center" />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
