'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const FALLBACK_CATEGORIES = [
  { name: 'Wall Decor', slug: 'wall-decor', image: '/cat-wall-decor.png', count: '24 Pieces' },
  { name: 'Showpieces', slug: 'showpieces', image: '/cat-showpieces.png', count: '18 Pieces' },
  { name: 'Mirrors', slug: 'mirrors', image: '/cat-mirrors.png', count: '12 Pieces' },
  { name: 'Table Decor', slug: 'table-decor', image: '/cat-showpieces.png', count: '20 Pieces' },
];

export default function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        const fetched = (data.categories || []).slice(0, 8);
        setCategories(fetched.length > 0 ? fetched : FALLBACK_CATEGORIES);
      })
      .catch(() => setCategories(FALLBACK_CATEGORIES));
  }, []);

  return (
    <section className="py-24 bg-brand-cream" id="categories">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subheading mb-3">Browse By</p>
          <div className="divider-line mx-auto mb-4" />
          <h2 className="section-heading">Featured Categories</h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug || cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link href={`/collection?category=${cat.name}`} className="group block relative overflow-hidden aspect-[3/4] bg-brand-beige">
                <Image
                  src={cat.image || '/cat-showpieces.png'}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 overlay-gradient" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-white text-xl font-[500] leading-tight">{cat.name}</h3>
                  <p className="font-sans text-white/60 text-xs tracking-[0.1em] mt-1">
                    {cat.count ? cat.count : 'Explore Collection'}
                  </p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/categories" className="btn-outline">View All Categories</Link>
        </motion.div>
      </div>
    </section>
  );
}
