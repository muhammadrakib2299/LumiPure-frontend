import Link from 'next/link';
import { ArrowRight, Sparkles, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-cream)] via-white to-[var(--color-secondary-light)]/30">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary-light)]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-accent-light)]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-secondary-light)]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-gray-100)]">
              <Sparkles size={16} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-gray-700)]">
                New Collection Available
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold text-[var(--color-gray-900)] leading-tight mb-6">
              Natural Beauty,{' '}
              <span className="text-[var(--color-primary)]">Pure</span>{' '}
              Ingredients
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[var(--color-gray-600)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover our premium skincare collection crafted with organic
              botanicals. Experience the transformative power of nature for
              radiant, healthy skin.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                <Leaf
                  size={28}
                  className="text-[var(--color-primary)] group-hover:text-white transition-colors"
                />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--color-gray-900)] mb-3">
                100% Natural
              </h3>
              <p className="text-[var(--color-gray-600)] leading-relaxed">
                All our products are made with carefully selected organic
                ingredients, free from harmful chemicals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                <Heart
                  size={28}
                  className="text-[var(--color-accent)] group-hover:text-white transition-colors"
                />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--color-gray-900)] mb-3">
                Cruelty Free
              </h3>
              <p className="text-[var(--color-gray-600)] leading-relaxed">
                We never test on animals. Our products are certified cruelty-free
                and ethically sourced.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--color-secondary)]/30 flex items-center justify-center group-hover:bg-[var(--color-secondary)] transition-colors duration-300">
                <Sparkles
                  size={28}
                  className="text-[var(--color-secondary-dark)] group-hover:text-white transition-colors"
                />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--color-gray-900)] mb-3">
                Proven Results
              </h3>
              <p className="text-[var(--color-gray-600)] leading-relaxed">
                Clinically tested formulas that deliver visible results. Join
                thousands of happy customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="py-20 bg-[var(--color-gray-50)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-gray-900)] mb-4">
              Bestsellers
            </h2>
            <p className="text-[var(--color-gray-600)] max-w-xl mx-auto">
              Our most-loved products, trusted by thousands for visible results
            </p>
          </div>

          {/* Product Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square rounded-xl bg-[var(--color-gray-100)] mb-4 flex items-center justify-center">
                  <span className="text-[var(--color-gray-400)]">
                    Product Image
                  </span>
                </div>
                <h4 className="font-medium text-[var(--color-gray-900)] mb-1">
                  Product Name
                </h4>
                <p className="text-sm text-[var(--color-gray-500)] mb-3">
                  Skincare Category
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--color-primary)]">
                    $49.00
                  </span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button variant="outline" size="lg" className="group">
                View All Products
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-primary)]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white mb-4">
            Join the LumiPure Community
          </h2>
          <p className="text-[var(--color-primary-light)] max-w-xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive offers, skincare tips, and
            early access to new products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto whitespace-nowrap"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
