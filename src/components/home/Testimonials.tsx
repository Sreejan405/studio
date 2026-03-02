import Image from 'next/image';
import { testimonials } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Testimonials() {
  return (
    <section className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">Loved by our Community</h2>
        <p className="mt-2 text-muted-foreground">
          Real stories from real people who trust GlowNiva with their skin.
        </p>
      </div>
      <div className="mt-12">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const placeholder = PlaceHolderImages.find(p => p.id === testimonial.image.id);
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                        {placeholder && (
                          <div className="relative h-20 w-20">
                            <Image
                              src={placeholder.imageUrl}
                              alt={testimonial.name}
                              fill
                              sizes='(max-width: 768px) 10vw, 5vw'
                              className="rounded-full object-cover"
                              data-ai-hint={placeholder.imageHint}
                            />
                           </div>
                        )}
                        <p className="italic text-muted-foreground">"{testimonial.text}"</p>
                        <p className="mt-4 font-bold">- {testimonial.name}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex"/>
          <CarouselNext className="hidden md:inline-flex"/>
        </Carousel>
      </div>
    </section>
  );
}
