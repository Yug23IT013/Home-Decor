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

function StyleCard({ style, i, className = '' }: { style: typeof styles[0]; i: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: i * 0.08 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <Link href={`/collection?style=${style.slug}`} className="block w-full h-full">
        <Image
          src={style.image}
          alt={style.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent group-hover:from-black/75 transition-all duration-500" />
        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <h3 className="font-serif text-white font-[500] leading-tight text-xl md:text-2xl">
            {style.name}
          </h3>
          <p className="font-sans text-white/65 text-xs tracking-[0.1em] mt-1">{style.desc}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-white/80 text-[10px] tracking-[0.18em] uppercase font-sans opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300">
            Explore →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function StylesSection() {
  return (
    <section className="py-24 bg-brand-beige" id="styles">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subheading mb-3">Inspiration</p>
          <div className="divider-line mx-auto mb-4" />
          <h2 className="section-heading">Shop By Style</h2>
          <p className="font-sans text-sm text-brand-gray font-[300] max-w-md mx-auto mt-4">
            Discover your perfect aesthetic — explore pieces curated to match your vision
          </p>
        </motion.div>

        {/* TOP ROW: hero left (2/3 wide) + 2 stacked right (1/3 wide) */}
        {/* Use a fixed height so both columns are exactly equal */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5 lg:h-[580px] mb-5">
          {/* Large hero card — takes 2 cols full height */}
          <StyleCard style={styles[0]} i={0} className="lg:col-span-2 h-full" />

          {/* Right column: two equal-height cards stacked */}
          <div className="flex flex-col gap-5 h-full">
            <StyleCard style={styles[1]} i={1} className="flex-1" />
            <StyleCard style={styles[2]} i={2} className="flex-1" />
          </div>
        </div>

        {/* Mobile top row: single column */}
        <div className="flex flex-col gap-4 lg:hidden mb-4">
          <StyleCard style={styles[0]} i={0} className="h-72" />
          <StyleCard style={styles[1]} i={1} className="h-56" />
          <StyleCard style={styles[2]} i={2} className="h-56" />
        </div>

        {/* BOTTOM ROW: 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          <StyleCard style={styles[3]} i={3} className="h-64" />
          <StyleCard style={styles[4]} i={4} className="h-64" />
          <StyleCard style={styles[5]} i={5} className="h-64" />
        </div>
      </div>
    </section>
  );
}
