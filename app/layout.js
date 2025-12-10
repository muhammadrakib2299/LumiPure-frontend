import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "LumiPure | Premium Beauty & Skincare",
  description: "Discover the purest beauty with LumiPure. Premium hair care, skincare, and beauty products designed to enhance your natural radiance.",
  keywords: "beauty, skincare, hair care, cosmetics, natural, luxury, LumiPure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
