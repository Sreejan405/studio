import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import Link from 'next/link';

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="container mx-auto">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">
          Our Featured Rituals
        </h2>
        <p className="mt-2 text-muted-foreground">
          Handpicked favorites to start your journey towards healthier skin.
        </p>
      </div>
      <div className="mt-12">
        <ProductGrid products={featuredProducts} />
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="outline">
            <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
