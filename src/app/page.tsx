import AnimatedOnScroll from '@/components/AnimatedOnScroll';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Hero from '@/components/home/Hero';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import Testimonials from '@/components/home/Testimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function Home() {
  return (
    <>
      <AnimatedOnScroll>
        <Hero />
      </AnimatedOnScroll>
      <AnimatedOnScroll>
        <FeaturedProducts />
      </AnimatedOnScroll>
      <AnimatedOnScroll>
        <WhyChooseUs />
      </AnimatedOnScroll>
      <AnimatedOnScroll>
        <Testimonials />
      </AnimatedOnScroll>
      <AnimatedOnScroll>
        <RecommendedProducts />
      </AnimatedOnScroll>
    </>
  );
}
