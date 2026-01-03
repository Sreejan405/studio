import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.image.id);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
      <div className="aspect-square bg-secondary">
        {placeholder && (
            <Link href={`/products/${product.slug}`}>
                <Image
                src={placeholder.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                data-ai-hint={placeholder.imageHint}
                />
            </Link>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="font-headline text-lg font-semibold">
          <Link href={`/products/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{product.benefit}</p>
        <div className="flex flex-1 flex-col justify-end">
            <p className="text-base font-medium">{formattedPrice}</p>
        </div>
      </div>
       <div className="p-4 pt-0">
          <Button asChild className="w-full">
            <Link href={`/products/${product.slug}`}>View Product</Link>
          </Button>
        </div>
    </div>
  );
}
