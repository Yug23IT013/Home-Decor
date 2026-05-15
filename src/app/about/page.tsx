import type { Metadata } from 'next';
import AboutSection from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover the story behind Ambica Home Decor — craftsmanship, passion, and a love for beautiful spaces.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
      {/* Extended about content */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-brand-black mb-6">Our Philosophy</h2>
          <div className="divider-line mx-auto mb-8" />
          <p className="font-sans text-brand-charcoal font-[300] leading-relaxed mb-6 text-lg">
            We believe that the spaces we inhabit are a reflection of who we are. Every corner, every surface, every carefully chosen object speaks to our personality, our aspirations, and our sense of beauty.
          </p>
          <p className="font-sans text-brand-charcoal font-[300] leading-relaxed mb-6">
            At Ambica Home Decor, our mission is to help you tell your story through extraordinary decor. We work closely with skilled artisans across India, preserving traditional craftsmanship while infusing contemporary design sensibilities.
          </p>
          <p className="font-sans text-brand-charcoal font-[300] leading-relaxed">
            From hand-beaten metalwork to delicate ceramic art, from bold statement mirrors to subtle table accents — each piece we offer has been thoughtfully curated to ensure it earns its place in your home.
          </p>
        </div>
      </section>
    </div>
  );
}
