import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/lib/products';

export default function ProductsPage() {
  return (
    <section className="container mx-auto">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold md:text-4xl">Our Collection</h1>
        <p className="mt-2 text-muted-foreground">
          Discover skincare that's as honest and natural as you are.
        </p>
      </div>
      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
