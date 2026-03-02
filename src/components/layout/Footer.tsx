import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start">
             <Link href="/" className="mb-4">
              <Logo />
             </Link>
            <p className="text-sm text-muted-foreground">
              Clean, natural, and kind to your skin.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">Products</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/glowniva/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GlowNiva Skincare. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
