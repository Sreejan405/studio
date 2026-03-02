'use client';

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import CartItem from './CartItem';
import { ScrollArea } from '../ui/scroll-area';
import Link from 'next/link';

export default function CartSheet() {
  const { cart, cartCount, totalPrice, deliveryCharge, grandTotal } = useCart();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
      </SheetHeader>
      <Separator />
      {cart.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-6 p-6">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <SheetFooter className="p-6">
            <div className="flex w-full flex-col gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-muted-foreground">
                      <p>Subtotal</p>
                      <p>{formatCurrency(totalPrice)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                      <p>Delivery Fee</p>
                      <p>{deliveryCharge > 0 ? formatCurrency(deliveryCharge) : 'FREE'}</p>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-foreground">
                      <p>Total</p>
                      <p>{formatCurrency(grandTotal)}</p>
                  </div>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">Taxes calculated at checkout. Delivery fee applies for orders under ₹200.</p>
                <Button className="w-full" size="lg" onClick={() => console.log('Checkout', cart)}>Checkout</Button>
                 <div className="mt-2 flex justify-center text-center text-sm text-muted-foreground">
                    <p>
                        or{' '}
                        <SheetClose asChild>
                            <Link href="/products" className="font-medium text-accent hover:text-accent/80">
                                Continue Shopping <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </SheetClose>
                    </p>
                </div>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <h3 className='font-headline text-lg font-semibold'>Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
            <SheetClose asChild>
                <Button asChild>
                    <Link href="/products">Browse Products</Link>
                </Button>
            </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}
