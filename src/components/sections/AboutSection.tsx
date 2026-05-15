'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-24 bg-brand-beige" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/about-craftsman.png"
                alt="Ambica Home Decor Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-brand-gold -z-10" />
            {/* Stats badge */}
            <div className="absolute -bottom-4 left-8 bg-white p-6 shadow-lg">
              <p className="font-serif text-4xl text-brand-black font-[600]">10+</p>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-brand-gray mt-1">Years of Artistry</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="section-subheading mb-3">Our Story</p>
            <div className="divider-line mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl text-brand-black mb-6 leading-tight">
              Crafted with Passion,<br />
              <span className="font-light-serif">Designed for Beauty</span>
            </h2>
            <div className="space-y-4 mb-8">
              <p className="font-sans text-brand-charcoal font-[300] leading-relaxed">
                At Ambica Home Decor, we believe that a beautiful home is a reflection of the soul. Founded with a passion for artisanal craftsmanship, we curate exceptional decor pieces that transform ordinary spaces into extraordinary sanctuaries.
              </p>
              <p className="font-sans text-brand-charcoal font-[300] leading-relaxed">
                Every piece in our collection is thoughtfully selected or handcrafted by skilled artisans, celebrating the finest traditions of Indian craftsmanship while embracing contemporary design sensibilities.
              </p>
              <p className="font-sans text-brand-charcoal font-[300] leading-relaxed">
                From bold wall art to delicate handmade showpieces, each product carries the promise of premium quality and timeless elegance — pieces that are not merely decorations, but stories waiting to be told.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { title: 'Handcrafted', desc: 'Artisan made with care' },
                { title: 'Premium Quality', desc: 'Finest materials only' },
                { title: 'Custom Work', desc: 'Bespoke to your vision' },
                { title: 'Expert Curation', desc: 'Styled by design pros' },
              ].map((v) => (
                <div key={v.title} className="border-l-2 border-brand-gold pl-4">
                  <h4 className="font-serif text-brand-black text-base mb-0.5">{v.title}</h4>
                  <p className="font-sans text-brand-gray text-xs">{v.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Our Full Story <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
