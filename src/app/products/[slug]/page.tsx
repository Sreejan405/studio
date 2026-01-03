import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import AnimatedOnScroll from '@/components/AnimatedOnScroll';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find((p) => p.id === product.image.id);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <section className="container mx-auto">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
        <AnimatedOnScroll>
          <div className="aspect-square overflow-hidden rounded-lg border">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
                data-ai-hint={placeholder.imageHint}
              />
            )}
          </div>
        </AnimatedOnScroll>
        <AnimatedOnScroll delay={0.2}>
          <div className="flex flex-col gap-4">
            <h1 className="font-headline text-3xl font-bold lg:text-4xl">
              {product.name}
            </h1>
            <p className="text-2xl font-medium">{formattedPrice}</p>
            <p className="text-muted-foreground">{product.description}</p>
            
            <div className="mt-4">
              <AddToCartButton product={product} size="lg" className="w-full sm:w-auto" />
            </div>

            <Accordion type="single" collapsible className="mt-6 w-full" defaultValue="description">
              <AccordionItem value="description">
                <AccordionTrigger>Key Benefits</AccordionTrigger>
                <AccordionContent>
                  <p>{product.benefit}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients">
                <AccordionTrigger>Ingredients</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient) => (
                      <li key={ingredient} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="how-to-use">
                <AccordionTrigger>How to Use</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2">
                    {product.howToUse.map((step) => (
                      <li key={step} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="skin-type">
                <AccordionTrigger>Suitable Skin Types</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                        {product.skinType.map((type) => (
                            <Badge key={type} variant="secondary">{type}</Badge>
                        ))}
                    </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AnimatedOnScroll>
      </div>
    </section>
  );
}
