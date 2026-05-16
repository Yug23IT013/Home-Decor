'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Search } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        const all = data.products || [];
        setProducts(all.filter((p: any) => p.featured));
      });
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const filterCategories = ['All', ...Array.from(new Set(products.map(p => p.category))).filter(Boolean)];

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
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-luxury pl-12"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, 6).map((product, i) => (
              <motion.div
                key={product.slug || product._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-brand-beige mb-4">
                  <Image
                    src={product.images?.[0] || '/cat-showpieces.png'}
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
                <div className="flex flex-col flex-1 pt-4">
                  <h3 className="font-serif text-xl text-brand-black mb-1 line-clamp-1">{product.name}</h3>
                  <p className="font-sans text-sm text-brand-gray font-[300] mb-4 line-clamp-2 flex-1">{product.shortDescription}</p>
                  <div className="flex gap-2 mt-auto">
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
                      className="w-11 flex items-center justify-center border border-brand-sand text-brand-gray hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300"
                      aria-label="WhatsApp inquiry"
                      title="WhatsApp Inquiry"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {products.length === 0 && (
          <p className="text-center font-sans text-brand-gray py-12">No featured products yet. Add some from the admin panel.</p>
        )}
        {products.length > 0 && filtered.length === 0 && (
          <p className="text-center font-sans text-brand-gray py-12">No products match your filters.</p>
        )}

        <div className="text-center mt-12">
          <Link href="/collection" className="btn-outline">View Full Collection</Link>
        </div>
      </div>
    </section>
  );
}
