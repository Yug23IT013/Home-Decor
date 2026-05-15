'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const styles = [
  { name: 'Modern Minimal', slug: 'modern-minimal', image: '/style-modern-minimal.png', desc: 'Clean lines, neutral tones' },
  { name: 'Luxury Gold', slug: 'luxury-gold', image: '/style-luxury-gold.png', desc: 'Opulent gold accents' },
  { name: 'Wooden Aesthetic', slug: 'wooden-aesthetic', image: '/hero-interior.png', desc: 'Natural wood warmth' },
  { name: 'Contemporary', slug: 'contemporary', image: '/about-craftsman.png', desc: 'Current design trends' },
  { name: 'Traditional', slug: 'traditional', image: '/cat-mirrors.png', desc: 'Timeless classical beauty' },
  { name: 'Artistic', slug: 'artistic', image: '/cat-wall-decor.png', desc: 'Bold artistic expression' },
];

export default function StylesSection() {
  return (
    <section className="py-24 bg-brand-beige" id="styles">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subheading mb-3">Inspiration</p>
          <div className="divider-line mx-auto mb-4" />
          <h2 className="section-heading">Shop By Style</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {styles.map((style, i) => (
            <motion.div
              key={style.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <Link
                href={`/collection?style=${style.slug}`}
                className="group relative flex overflow-hidden bg-brand-sand"
                style={{ aspectRatio: i === 0 ? '16/10' : '4/3' }}
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className={`font-serif text-white font-[500] leading-tight ${i === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {style.name}
                  </h3>
                  <p className="font-sans text-white/70 text-xs tracking-[0.1em] mt-2">{style.desc}</p>
                  <span className="mt-4 inline-block px-4 py-2 border border-white/40 text-white text-xs tracking-[0.15em] uppercase font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
