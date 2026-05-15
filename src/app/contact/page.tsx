import type { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ambica Home Decor for inquiries about our luxury decor collection.',
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="bg-brand-black py-16 text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3">We'd Love to Hear From You</p>
        <h1 className="font-serif text-5xl text-white">Contact Us</h1>
      </div>
      <ContactSection />
    </div>
  );
}
