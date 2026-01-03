'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useOnScreen } from '@/hooks/use-on-screen';

interface AnimatedOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedOnScroll = ({ children, className, delay = 0 }: AnimatedOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default AnimatedOnScroll;
