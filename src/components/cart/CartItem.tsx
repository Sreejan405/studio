'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const placeholder = PlaceHolderImages.find(p => p.id === item.product.image.id);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.product.price);

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        {placeholder && (
            <div className="relative h-20 w-20 overflow-hidden rounded-md border">
            <Image
                src={placeholder.imageUrl}
                alt={item.product.name}
                fill
                sizes="80px"
                className="object-cover"
                data-ai-hint={placeholder.imageHint}
            />
            </div>
        )}
        <div>
          <Link href={`/products/${item.product.slug}`} className="font-medium hover:underline">
            {item.product.name}
          </Link>
          <p className="text-sm text-muted-foreground">{formattedPrice}</p>
          <div className="mt-2 flex items-center">
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10))}
              className="h-8 w-16"
              aria-label={`Quantity for ${item.product.name}`}
            />
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground"
        onClick={() => removeFromCart(item.product.id)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Remove {item.product.name} from cart</span>
      </Button>
    </div>
  );
}
