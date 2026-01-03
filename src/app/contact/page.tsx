import ContactForm from '@/components/contact/ContactForm';
import { Mail, MessageCircle } from 'lucide-react';
import AnimatedOnScroll from '@/components/AnimatedOnScroll';

export default function ContactPage() {
  return (
    <section className="container mx-auto">
        <AnimatedOnScroll>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're here to help. Whether you have a question about our products or just want to say hello, we'd love to hear from you.
        </p>
      </div>
      </AnimatedOnScroll>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <AnimatedOnScroll>
        <div className="rounded-lg border bg-card p-8">
          <h2 className="font-headline text-2xl font-bold">Send us a Message</h2>
          <ContactForm />
        </div>
        </AnimatedOnScroll>
        <AnimatedOnScroll delay={0.2}>
        <div className="space-y-8">
          <div>
            <h3 className="font-headline text-xl font-semibold">Email Support</h3>
            <div className="mt-2 flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <a href="mailto:support@natura.com" className="hover:text-foreground">support@natura.com</a>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
          </div>
          <div>
            <h3 className="font-headline text-xl font-semibold">WhatsApp</h3>
             <div className="mt-2 flex items-center gap-3 text-muted-foreground">
              <MessageCircle className="h-5 w-5" />
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">+1 (234) 567-890</a>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">For quick questions and support.</p>
          </div>
        </div>
        </AnimatedOnScroll>
      </div>
    </section>
  );
}
