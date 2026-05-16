'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, MessageCircle, ChevronDown } from 'lucide-react';


import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type Product = {
  name: string;
  slug: string;
  shortDescription: string;
  category: string;
  style: string;
  material: string;
  tags: string[];
  images: string[];
  featured: boolean;
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'featured', label: 'Featured' },
];

function CollectionContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('');
  const [material, setMaterial] = useState('');
  const [sort, setSort] = useState('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(data => setProducts(data.products || []));
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const catParam = searchParams.get('category');
    const styleParam = searchParams.get('style');
    if (catParam) {
      setCategory(catParam);
      setFiltersOpen(true);
    }
    if (styleParam) {
      setStyle(styleParam);
      setFiltersOpen(true);
    }
  }, [searchParams]);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchesCategory = !category || p.category?.toLowerCase() === category.toLowerCase();
    const matchesStyle = !style || p.style?.toLowerCase() === style.toLowerCase();
    
    return (
      (!search || p.name?.toLowerCase().includes(q) || p.shortDescription?.toLowerCase().includes(q) || (p.tags || []).some((t: string) => t.toLowerCase().includes(q))) &&
      matchesCategory &&
      matchesStyle &&
      (!material || p.material === material)
    );
  }).sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  const clearFilters = () => { setSearch(''); setCategory(''); setStyle(''); setMaterial(''); };
  const hasFilters = search || category || style || material;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-black pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p
            className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Ambica Home Decor
          </motion.p>
          <motion.h1
            className="font-serif text-5xl md:text-6xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The Collection
          </motion.h1>
          <motion.p
            className="font-sans text-white/50 text-sm font-[300] max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover our curated selection of luxury decor pieces
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-72">
              <Search size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gray" />
              <input
                type="text"
                placeholder="Search collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-luxury pl-6 text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-0 top-1/2 -translate-y-1/2">
                  <X size={14} className="text-brand-gray" />
                </button>
              )}
            </div>
            {/* Filter toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2 border text-xs tracking-[0.1em] uppercase font-sans transition-all duration-300 ${
                filtersOpen || hasFilters ? 'bg-brand-black text-white border-brand-black' : 'border-brand-sand text-brand-gray hover:border-brand-black'
              }`}
            >
              <SlidersHorizontal size={14} /> Filters {hasFilters && '•'}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-sans text-xs text-brand-gray">{filtered.length} pieces</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="font-sans text-xs text-brand-black border-b border-brand-warm bg-transparent py-1 focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-brand-beige p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Category */}
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-3">Category</p>
                  <div className="space-y-2">
                    {['', ...Array.from(new Set(products.map(p => p.category))).filter(Boolean)].map((cat) => (
                      <button
                        key={cat || 'all'}
                        onClick={() => setCategory(cat)}
                        className={`block text-left font-sans text-xs w-full transition-colors duration-200 ${category?.toLowerCase() === cat?.toLowerCase() ? 'text-brand-black font-[500]' : 'text-brand-gray hover:text-brand-black'}`}
                      >
                        {cat || 'All Categories'}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Style */}
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-3">Style</p>
                  <div className="space-y-2">
                    {['', ...Array.from(new Set(products.map(p => p.style))).filter(Boolean)].map((s) => (
                      <button
                        key={s || 'all'}
                        onClick={() => setStyle(s)}
                        className={`block text-left font-sans text-xs w-full transition-colors duration-200 ${style?.toLowerCase() === s?.toLowerCase() ? 'text-brand-black font-[500]' : 'text-brand-gray hover:text-brand-black'}`}
                      >
                        {s || 'All Styles'}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Material */}
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-gray mb-3">Material</p>
                  <div className="space-y-2">
                    {['', ...Array.from(new Set(products.map(p => p.material))).filter(Boolean)].map((m) => (
                      <button
                        key={m || 'all'}
                        onClick={() => setMaterial(m)}
                        className={`block text-left font-sans text-xs w-full transition-colors duration-200 ${material === m ? 'text-brand-black font-[500]' : 'text-brand-gray hover:text-brand-black'}`}
                      >
                        {m || 'All Materials'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end">
                  <button onClick={clearFilters} className="font-sans text-xs text-brand-gray hover:text-brand-black underline transition-colors">
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-brand-gray mb-4">No pieces found</p>
            <button onClick={clearFilters} className="btn-outline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="group"
              >
                <Link href={`/collection/${product.slug}`} className="block">
                  <div className="relative overflow-hidden aspect-[3/4] bg-brand-beige mb-4">
                    <Image
                      src={product.images[0] || '/cat-showpieces.png'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/cat-showpieces.png'; }}
                    />
                    {product.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="label-chip bg-brand-gold/90 text-brand-black border-brand-gold">Featured</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1">{product.category}</p>
                    <h3 className="font-serif text-lg text-brand-black mb-1 group-hover:text-brand-charcoal transition-colors">{product.name}</h3>
                    <p className="font-sans text-xs text-brand-gray font-[300] line-clamp-2">{product.shortDescription}</p>
                  </div>
                </Link>
                <div className="flex gap-2 mt-4">
                  <Link href={`/collection/${product.slug}`} className="flex-1 text-center py-2.5 border border-brand-black text-brand-black text-xs tracking-[0.12em] uppercase font-sans hover:bg-brand-black hover:text-white transition-all duration-300">
                    View & Inquire
                  </Link>
                  <a
                    href={`https://wa.me/919876543210?text=Hi, I'm interested in: ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#1DAA52] transition-colors duration-300"
                    aria-label="WhatsApp inquiry"
                  >
                    <MessageCircle size={15} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-cream pt-32 text-center font-serif text-xl">Loading Collection...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
