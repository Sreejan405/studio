import type { Product, Testimonial } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    slug: 'soothing-aloe-cleanser',
    name: 'Soothing Aloe Cleanser',
    benefit: 'Gently purifies and calms skin.',
    description:
      "Our Soothing Aloe Cleanser is a gentle, sulfate-free formula that effectively removes impurities while maintaining your skin's natural moisture balance. Infused with pure aloe vera and chamomile extract, it calms irritation and reduces redness, leaving your skin feeling clean, soft, and refreshed. Perfect for daily use on all skin types, including sensitive skin.",
    price: 24.0,
    image: { id: 'soothing-aloe-cleanser' },
    ingredients: ['Aloe Barbadensis Leaf Juice', 'Glycerin', 'Chamomilla Recutita (Matricaria) Flower Extract', 'Decyl Glucoside'],
    howToUse: [
      'Wet face with lukewarm water.',
      'Gently massage a small amount into skin.',
      'Rinse thoroughly and pat dry.',
      'Use morning and night for best results.',
    ],
    skinType: ['All Skin Types', 'Sensitive', 'Dry'],
  },
  {
    id: '2',
    slug: 'radiant-vitamin-c-serum',
    name: 'Radiant Vitamin C Serum',
    benefit: 'Brightens and evens skin tone.',
    description:
      'Unlock a brighter, more even complexion with our Radiant Vitamin C Serum. This potent antioxidant powerhouse combines stabilized Vitamin C with Ferulic Acid and Vitamin E to protect against environmental stressors, boost collagen production, and fade dark spots. The lightweight, fast-absorbing formula leaves your skin with a healthy, luminous glow.',
    price: 48.0,
    image: { id: 'radiant-vitamin-c-serum' },
    ingredients: ['Water', 'Ascorbic Acid (Vitamin C)', 'Tocopherol (Vitamin E)', 'Ferulic Acid', 'Sodium Hyaluronate'],
    howToUse: [
      'Apply 3-4 drops to a clean face in the morning.',
      'Gently pat into the skin.',
      'Follow with moisturizer and sunscreen.',
    ],
    skinType: ['Dull', 'Uneven Tone', 'Mature'],
  },
  {
    id: '3',
    slug: 'balancing-green-tea-moisturizer',
    name: 'Balancing Green Tea Moisturizer',
    benefit: 'Hydrates and controls excess oil.',
    description:
      "Achieve perfect harmony with our Balancing Green Tea Moisturizer. This lightweight, non-greasy lotion provides essential hydration while helping to control shine and minimize the appearance of pores. Rich in green tea antioxidants, it soothes inflammation and protects the skin. Ideal for combination to oily skin types, it leaves your complexion feeling fresh and balanced.",
    price: 36.0,
    image: { id: 'balancing-green-tea-moisturizer' },
    ingredients: ['Camellia Sinensis (Green Tea) Leaf Extract', 'Glycerin', 'Niacinamide', 'Squalane'],
    howToUse: [
      'Apply an even layer to face and neck after cleansing and serum.',
      'Use daily, morning and night.',
    ],
    skinType: ['Oily', 'Combination', 'Acne-Prone'],
  },
  {
    id: '4',
    slug: 'nourishing-jojoba-face-oil',
    name: 'Nourishing Jojoba Face Oil',
    benefit: 'Deeply moisturizes and restores.',
    description:
      'Restore your skin’s natural radiance with our Nourishing Jojoba Face Oil. This luxurious, quick-absorbing oil blend is rich in vitamins and fatty acids that deeply moisturize and repair the skin barrier. Jojoba oil mimics the skin’s natural sebum, providing balanced hydration without clogging pores. A few drops are all you need for a soft, supple, and glowing complexion.',
    price: 42.0,
    image: { id: 'nourishing-jojoba-face-oil' },
    ingredients: ['Simmondsia Chinensis (Jojoba) Seed Oil', 'Rosa Canina (Rosehip) Fruit Oil', 'Squalane', 'Tocopherol (Vitamin E)'],
    howToUse: [
      'Warm 2-3 drops between your palms.',
      'Gently press onto a clean face and neck.',
      'Can be used alone or mixed with your moisturizer.',
    ],
    skinType: ['Dry', 'Normal', 'Mature'],
  },
   {
    id: '5',
    slug: 'gentle-oat-exfoliating-scrub',
    name: 'Gentle Oat Exfoliating Scrub',
    benefit: 'Softens and smooths texture.',
    description:
      "Reveal a smoother, brighter complexion without irritation. Our Gentle Oat Exfoliating Scrub uses finely milled oatmeal and biodegradable jojoba beads to delicately buff away dead skin cells. Enriched with calendula and honey, it soothes and hydrates, making it gentle enough for sensitive skin while effectively refining skin texture.",
    price: 28.0,
    image: { id: 'gentle-oat-exfoliating-scrub' },
    ingredients: ['Avena Sativa (Oat) Kernel Meal', 'Glycerin', 'Jojoba Esters', 'Calendula Officinalis Flower Extract', 'Honey'],
    howToUse: [
      'Apply to damp skin, avoiding the eye area.',
      'Gently massage in circular motions for 30-60 seconds.',
      'Rinse thoroughly.',
      'Use 1-2 times per week.',
    ],
    skinType: ['All Skin Types', 'Textured', 'Sensitive'],
  },
  {
    id: '6',
    slug: 'hydrating-hyaluronic-mist',
    name: 'Hydrating Hyaluronic Mist',
    benefit: 'Instantly refreshes and plumps.',
    description:
      'A refreshing oasis for your skin. This ultra-fine mist delivers a burst of hydration with multi-molecular weight hyaluronic acid that plumps skin from within. Rosewater and cucumber extract provide a soothing, aromatic experience, instantly reviving tired, dull skin. Use it to set makeup or for a moisture boost anytime, anywhere.',
    price: 22.0,
    image: { id: 'hydrating-hyaluronic-mist' },
    ingredients: ['Rosa Damascena Flower Water', 'Sodium Hyaluronate', 'Cucumis Sativus (Cucumber) Fruit Extract', 'Glycerin'],
    howToUse: [
      'Hold bottle 8-10 inches from face.',
      'Close eyes and mist onto skin.',
      'Use as needed throughout the day.',
    ],
    skinType: ['All Skin Types', 'Dehydrated', 'Tired'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jane D.',
    text: "Natura's Vitamin C Serum has completely transformed my skin. It's brighter, more even, and feels so healthy. I can't imagine my routine without it now.",
    image: { id: 'testimonial-jane-d' },
  },
  {
    id: '2',
    name: 'Sarah L.',
    text: "As someone with sensitive skin, finding a good cleanser is tough. The Soothing Aloe Cleanser is a game-changer. It's so gentle yet effective. My skin has never felt better!",
    image: { id: 'testimonial-sarah-l' },
  },
  {
    id: '3',
    name: 'Emily R.',
    text: "I'm obsessed with the Balancing Green Tea Moisturizer. It gives my combination skin the perfect amount of hydration without feeling greasy. My skin is clearer and more balanced.",
    image: { id: 'testimonial-emily-r' },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return products.filter((product) => slugs.includes(product.slug));
}
