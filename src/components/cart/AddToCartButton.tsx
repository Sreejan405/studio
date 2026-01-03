'use client';

import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { ButtonProps } from '@/components/ui/button';

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  quantity?: number;
}

export default function AddToCartButton({ product, quantity = 1, ...props }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button onClick={() => addToCart(product, quantity)} {...props}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
