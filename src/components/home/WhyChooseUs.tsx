import { Leaf, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Sourced from nature for pure, potent, and peaceful skincare.',
  },
  {
    icon: ShieldCheck,
    title: 'Dermatologically Safe',
    description: 'Every product is rigorously tested to be gentle on all skin types.',
  },
  {
    icon: Sparkles,
    title: 'No Harmful Chemicals',
    description: 'Free from parabens, sulfates, and synthetic fragrances. Always.',
  },
  {
    icon: Heart,
    title: 'Cruelty-Free',
    description: 'We believe in kindness, which means no animal testing, ever.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">The Natura Promise</h2>
          <p className="mt-2 text-muted-foreground">
            Our commitment to clean, conscious skincare is in everything we do.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-headline text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
