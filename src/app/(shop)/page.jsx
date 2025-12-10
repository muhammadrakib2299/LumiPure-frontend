import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/features/product/ProductGrid";

export default function HomePage() {
    const featuredProducts = [
        { id: 1, name: "Velvet Night Cream", category: "Skincare", price: 89, image: "/p1.jpg" },
        { id: 2, name: "Golden Hour Oils", category: "Body", price: 45, image: "/p2.jpg" },
        { id: 3, name: "Silk Touch Cleanser", category: "Skincare", price: 32, image: "/p3.jpg" },
        { id: 4, name: "Rose Quartz Roller", category: "Tools", price: 25, image: "/p4.jpg" },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center bg-secondary-50">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <span className="text-primary-800 font-medium tracking-wide uppercase">New Collection</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-900 leading-tight">
                            Reveal Your <br /> <span className="italic text-primary-600">Inner Glow</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-md">
                            Discover nature's most potent ingredients, scientifically formulated to nourish and rejuvenate your skin.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/products">
                                <Button size="lg">Shop Now</Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg">Our Story</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block h-[600px] w-full bg-secondary-200 rounded-t-[10rem] rounded-b-[2rem] relative overflow-hidden">
                        {/* Hero Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-secondary-400 font-serif text-4xl opacity-50">
                            Hero Image
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">Curated Favorites</h2>
                        <p className="text-gray-600">Hand-picked essentials loved by our community.</p>
                    </div>
                    <ProductGrid products={featuredProducts} />
                </div>
            </section>
        </div>
    );
}
