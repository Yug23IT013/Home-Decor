'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Search } from 'lucide-react';
import { SEED_PRODUCTS, CATEGORIES } from '@/lib/seedData';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const featured = SEED_PRODUCTS.filter((p) => p.featured);

  const filtered = featured.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const filterCategories = ['All', ...CATEGORIES.map((c) => c.name)];

  return (
    <section className="py-24 bg-brand-cream" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subheading mb-3">Curated Pieces</p>
          <div className="divider-line mx-auto mb-4" />
          <h2 className="section-heading">Featured Collection</h2>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gray" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-luxury pl-6"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filterCategories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs tracking-[0.12em] uppercase font-sans transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-black text-white'
                    : 'border border-brand-sand text-brand-gray hover:border-brand-black hover:text-brand-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-brand-beige mb-4">
                  <Image
                    src={product.images[0] || '/cat-showpieces.png'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/cat-showpieces.png'; }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="label-chip bg-white/80 backdrop-blur-sm">{product.category}</span>
                  </div>
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-brand-black mb-1">{product.name}</h3>
                  <p className="font-sans text-sm text-brand-gray font-[300] mb-4 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/collection/${product.slug}`}
                      className="flex-1 text-center py-2.5 border border-brand-black text-brand-black text-xs tracking-[0.12em] uppercase font-sans hover:bg-brand-black hover:text-white transition-all duration-300"
                    >
                      Inquire
                    </Link>
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=Hi, I'm interested in: ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#1DAA52] transition-colors duration-300"
                      aria-label="WhatsApp inquiry"
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-sans text-brand-gray py-12">No products found.</p>
        )}

        <div className="text-center mt-12">
          <Link href="/collection" className="btn-outline">View Full Collection</Link>
        </div>
      </div>
    </section>
  );
}
