"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CategorySection />
      <ProductGrid limit={6} title="Featured Collection" />

      {/* Brand Story Section */}
      <section className="py-20 bg-rose-50 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1556228720-1987ba83ddfa?q=80&w=1887&auto=format&fit=crop"
                  alt="Our Philosophy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="w-full h-full border border-rose-200 rounded-xl flex items-center justify-center p-6 text-center">
                  <div>
                    <h4 className="font-serif text-3xl font-bold text-primary mb-2">100%</h4>
                    <p className="text-dark font-medium">Organic & Natural Ingredients</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:pl-12">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-dark mb-6">Inspired by Nature, <br />Backed by Science</h2>
              <p className="text-dark/70 text-lg leading-relaxed mb-6">
                At LumiPure, we believe that true beauty comes from nature. Our products are crafted with the purest organic ingredients, free from harmful chemicals.
              </p>
              <p className="text-dark/70 text-lg leading-relaxed mb-8">
                We combine ancient beauty secrets with modern dermatological science to create formulas that essentially work.
              </p>
              <button className="px-8 py-3 bg-dark text-white rounded-full font-medium hover:bg-primary transition-colors shadow-lg">
                Read Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/40 to-transparent"></div>
      </section>

      <Footer />
    </main>
  );
}
