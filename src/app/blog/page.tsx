'use client';
import AnimatedOnScroll from '@/components/AnimatedOnScroll';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: '1',
    title: 'The Ultimate Guide to a Natural Skincare Routine',
    excerpt: 'Discover the steps to building a skincare routine that is both effective and kind to your skin, using only natural ingredients...',
    slug: 'ultimate-guide-natural-skincare',
    imageId: 'about-us-philosophy',
  },
  {
    id: '2',
    title: '5 Ingredients to Avoid in Your Skincare Products',
    excerpt: 'Learn about the common synthetic ingredients that can do more harm than good, and what to look for instead...',
    slug: 'ingredients-to-avoid',
    imageId: 'soothing-aloe-cleanser',
  },
  {
    id: '3',
    title: 'The Power of Vitamin C: A Deep Dive',
    excerpt:
      'We explore the science behind Vitamin C and why this powerful antioxidant is a must-have in your daily regimen...',
    slug: 'power-of-vitamin-c',
    imageId: 'radiant-vitamin-c-serum',
  },
];

export default function BlogPage() {
  return (
    <section className="container mx-auto">
      <AnimatedOnScroll>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            From the Journal
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Insights, tips, and stories on natural beauty and wellness.
          </p>
        </div>
      </AnimatedOnScroll>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => {
          const placeholder = PlaceHolderImages.find(p => p.id === post.imageId);
          return (
            <AnimatedOnScroll key={post.id} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    {placeholder && (
                        <div className="aspect-video">
                            <Image
                                src={placeholder.imageUrl}
                                alt={post.title}
                                width={600}
                                height={400}
                                className="h-full w-full object-cover"
                                data-ai-hint={placeholder.imageHint}
                            />
                        </div>
                    )}
                    <div className="p-6">
                      <h2 className="font-headline text-xl font-bold">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                      <p className="mt-4 text-sm font-semibold text-primary hover:text-primary/80">
                        Read More
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedOnScroll>
          );
        })}
      </div>
    </section>
  );
}
