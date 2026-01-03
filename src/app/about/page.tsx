import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';
import AnimatedOnScroll from '@/components/AnimatedOnScroll';

export default function AboutPage() {
    const philosophyImage = PlaceHolderImages.find(p => p.id === 'about-us-philosophy');

  return (
    <>
      <section className="bg-secondary/50">
        <div className="container mx-auto text-center">
        <AnimatedOnScroll>
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Story</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Born from a belief in the power of nature, Natura Skincare is a journey back to simplicity. We create honest, effective skincare for everyone.
          </p>
          </AnimatedOnScroll>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
        <AnimatedOnScroll>
          <div>
            <h2 className="font-headline text-3xl font-bold">Our Philosophy</h2>
            <p className="mt-4 text-muted-foreground">
              We believe that skincare should be a peaceful ritual, not a complicated regimen. Our philosophy is rooted in three core principles: purity, transparency, and kindness. We meticulously source the finest natural ingredients, ensuring every product is as clean as it is effective.
            </p>
            <p className="mt-4 text-muted-foreground">
              We are transparent about what goes into our bottles, so you can feel confident about what you're putting on your skin. Above all, we are kind—to your skin, to animals, and to the planet.
            </p>
          </div>
          </AnimatedOnScroll>
           <AnimatedOnScroll delay={0.2}>
            <div className="aspect-video overflow-hidden rounded-lg">
                {philosophyImage && (
                    <Image
                        src={philosophyImage.imageUrl}
                        alt={philosophyImage.description}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover"
                        data-ai-hint={philosophyImage.imageHint}
                    />
                )}
            </div>
          </AnimatedOnScroll>
        </div>
      </section>
       <section className="bg-secondary/50">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold">Our Commitment</h2>
            <p className="mt-4 text-muted-foreground">
              We promise to deliver skincare you can trust. Our commitment to you is unwavering.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <AnimatedOnScroll>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Natural Ingredients</h3>
              <p className="mt-2 text-muted-foreground">We harness the power of botanicals and earth-derived ingredients for gentle, effective care.</p>
            </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll delay={0.2}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Dermatologically Safe</h3>
              <p className="mt-2 text-muted-foreground">Every formula is tested for safety and efficacy, ensuring it's suitable for even sensitive skin.</p>
            </div>
            </AnimatedOnScroll>
            <AnimatedOnScroll delay={0.4}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Always Cruelty-Free</h3>
              <p className="mt-2 text-muted-foreground">We love our furry friends. Our products are never, ever tested on animals.</p>
            </div>
            </AnimatedOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
