import HeroSection from "@/components/features/home/HeroSection";
import CategoryGrid from "@/components/features/home/CategoryGrid";
import ProductGrid from "@/components/features/product/ProductGrid";
import { Sparkles, Leaf, Heart } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomePage() {
    const featuredProducts = [
        { id: 1, name: "Velvet Night Cream", category: "Skincare", price: 89, image: "/p1.jpg" },
        { id: 2, name: "Golden Hour Oils", category: "Body", price: 45, image: "/p2.jpg" },
        { id: 3, name: "Silk Touch Cleanser", category: "Skincare", price: 32, image: "/p3.jpg" },
        { id: 4, name: "Rose Quartz Roller", category: "Tools", price: 25, image: "/p4.jpg" },
    ];

    return (
        <div className="bg-white">
            <HeroSection />
            <CategoryGrid />

            {/* Why LumiPure Section */}
            <section className="py-24 bg-secondary-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary-900">Organic Ingredients</h3>
                            <p className="text-gray-600">100% plant-based formulations sourced from sustainable farms.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary-900">Clinically Proven</h3>
                            <p className="text-gray-600">Science-backed results you can see and feel in 30 days.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary-900">Cruelty-Free</h3>
                            <p className="text-gray-600">Never tested on animals. Kind to your skin and the planet.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-serif font-bold text-primary-900 mb-4">Trending Now</h2>
                            <p className="text-gray-600">The products everyone is talking about.</p>
                        </div>
                        <Button variant="outline" className="hidden md:flex">View All</Button>
                    </div>
                    <ProductGrid products={featuredProducts} />
                    <div className="mt-12 text-center md:hidden">
                        <Button variant="outline" className="w-full">View All</Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
                    <h2 className="text-4xl font-serif font-bold mb-6">Join the Community</h2>
                    <p className="text-primary-100 mb-8 text-lg">Subscribe for exclusive access to new launches, skincare tips, and 15% off your first order.</p>
                    <div className="flex gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary-400 backdrop-blur-sm"
                        />
                        <Button size="lg" className="bg-secondary-400 text-primary-950 hover:bg-secondary-300">Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
