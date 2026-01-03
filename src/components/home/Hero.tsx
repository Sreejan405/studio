import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full text-center flex flex-col justify-center items-center">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                priority
                className="object-cover object-center -z-10 brightness-[.85]"
                data-ai-hint={heroImage.imageHint}
            />
        )}
      <div className="container mx-auto px-4 text-background">
        <h1 className="font-headline text-4xl font-bold text-white md:text-6xl">
          Return to Nature.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90 md:text-xl">
          Experience skincare that is pure, honest, and kind to your skin. <br/>Trust in nature's finest.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="secondary" className="bg-white/90 text-foreground hover:bg-white">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
