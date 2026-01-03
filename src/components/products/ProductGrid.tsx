import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import AnimatedOnScroll from '../AnimatedOnScroll';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product, index) => (
        <AnimatedOnScroll key={product.id} delay={index * 0.1}>
            <ProductCard product={product} />
        </AnimatedOnScroll>
      ))}
    </div>
  );
}
