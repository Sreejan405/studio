'use client';

import { useEffect, useState } from 'react';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-product-recommendations';
import { getProductsBySlugs } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductGrid from '../products/ProductGrid';
import { Skeleton } from '../ui/skeleton';

const BROWSER_HISTORY_KEY = 'natura_browsing_history';

export default function RecommendedProducts() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Add current product to history
    if (isClient) {
      const slug = window.location.pathname.split('/').pop();
      if (window.location.pathname.startsWith('/products/') && slug) {
        const historyString = sessionStorage.getItem(BROWSER_HISTORY_KEY);
        let history: string[] = historyString ? JSON.parse(historyString) : [];
        if (!history.includes(slug)) {
          history = [slug, ...history].slice(0, 5); // Keep last 5 viewed products
          sessionStorage.setItem(BROWSER_HISTORY_KEY, JSON.stringify(history));
        }
      }
    }
  }, [isClient]);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!isClient) {
        setIsLoading(false);
        return;
      }

      try {
        const historyString = sessionStorage.getItem(BROWSER_HISTORY_KEY);
        if (!historyString) {
          setIsLoading(false);
          return;
        }

        const history = JSON.parse(historyString) as string[];
        if (history.length === 0) {
          setIsLoading(false);
          return;
        }

        const result = await getPersonalizedRecommendations({
          browsingHistory: history.join(', '),
        });

        const recommendedSlugs = result.recommendations.split(',').map(s => s.trim().toLowerCase().replace(/\s+/g, '-'));
        const recommendedProducts = getProductsBySlugs(recommendedSlugs);
        
        setRecommendations(recommendedProducts);
      } catch (err) {
        console.error('Failed to get recommendations:', err);
        setError('Could not load recommendations at this time.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [isClient]);

  if (!isClient || isLoading) {
    return (
        <section className="container mx-auto">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Just For You</h2>
                <p className="mt-2 text-muted-foreground">Products picked based on your interests.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-[300px] w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </section>
    );
  }
  
  if (error || recommendations.length === 0) {
    return null; // Don't show the section if there's an error or no recommendations
  }

  return (
    <section className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Just For You</h2>
          <p className="mt-2 text-muted-foreground">
            Based on your browsing, you might also love these.
          </p>
        </div>
        <div className="mt-12">
          <ProductGrid products={recommendations} />
        </div>
      </div>
    </section>
  );
}
