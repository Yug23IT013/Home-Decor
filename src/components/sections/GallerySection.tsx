'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, ZoomIn } from 'lucide-react';

type GalleryItem = {
  _id: string;
  title: string;
  image: string;
  caption?: string;
  category?: string;
};

const FALLBACK_ITEMS: GalleryItem[] = [
  { _id: '1', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908782/ambica-home-decor/seed/gallery-1.jpg', title: 'Living Room Elegance', category: 'Interior' },
  { _id: '2', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908782/ambica-home-decor/seed/gallery-2.jpg', title: 'Bedroom Details', category: 'Bedroom' },
  { _id: '3', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908784/ambica-home-decor/seed/hero-interior.jpg', title: 'Arched Luxury', category: 'Living Room' },
  { _id: '4', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908780/ambica-home-decor/seed/cat-wall-decor.jpg', title: 'Wall Art Collection', category: 'Wall Decor' },
  { _id: '5', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908779/ambica-home-decor/seed/cat-showpieces.jpg', title: 'Showpiece Display', category: 'Showpieces' },
  { _id: '6', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908778/ambica-home-decor/seed/cat-mirrors.jpg', title: 'Mirror Gallery', category: 'Mirrors' },
  { _id: '7', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908787/ambica-home-decor/seed/style-modern-minimal.jpg', title: 'Minimal Spaces', category: 'Interior' },
  { _id: '8', image: 'https://res.cloudinary.com/dwsn6smfb/image/upload/v1778908786/ambica-home-decor/seed/style-luxury-gold.jpg', title: 'Gold Accents', category: 'Luxury' },
];

function GalleryImg({
  item, i, className,
}: {
  item: GalleryItem; i: number; className: string;
  onClick?: () => void;
}) {
  return null; // placeholder — component below handles it inline
}

export default function GallerySection({
  showViewAll = true,
  limit = 8,
  hideHeader = false,
}: {
  showViewAll?: boolean;
  limit?: number;
  hideHeader?: boolean;
}) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(data => {
        const items: GalleryItem[] = data.gallery || [];
        setGalleryItems(items.length > 0 ? items : FALLBACK_ITEMS);
      })
      .catch(() => setGalleryItems(FALLBACK_ITEMS));
  }, []);

  const items = galleryItems.slice(0, limit);
  const src = (item: GalleryItem) => item.image || '/gallery-1.png';

  const Card = ({ item, i, className }: { item: GalleryItem; i: number; className: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.06 }}
      className={`relative overflow-hidden group cursor-pointer bg-brand-beige ${className}`}
      onClick={() => setSelected(item)}
    >
      <Image
        src={src(item)}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 25vw"
        onError={(e) => { (e.target as HTMLImageElement).src = '/gallery-1.png'; }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );

  return (
    <section className="py-24 bg-brand-cream" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        {!hideHeader && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-subheading mb-3">Inspiration</p>
            <div className="divider-line mx-auto mb-4" />
            <h2 className="section-heading">Interior Gallery</h2>
          </motion.div>
        )}

        {/* Structured editorial grid — 4 columns, 2 rows */}
        {/* Row 1: tall-left | sq | sq | tall-right */}
        {/* Row 2: wide | wide | sq  */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

          {/* Row 1 - col 1: tall portrait, spans 2 rows */}
          {items[0] && (
            <div className="md:row-span-2">
              <Card item={items[0]} i={0} className="h-48 md:h-full min-h-[320px]" />
            </div>
          )}

          {/* Row 1 - col 2: square */}
          {items[1] && <Card item={items[1]} i={1} className="h-48 md:h-40" />}

          {/* Row 1 - col 3: square */}
          {items[2] && <Card item={items[2]} i={2} className="h-48 md:h-40" />}

          {/* Row 1 - col 4: tall portrait, spans 2 rows */}
          {items[3] && (
            <div className="md:row-span-2">
              <Card item={items[3]} i={3} className="h-48 md:h-full min-h-[320px]" />
            </div>
          )}

          {/* Row 2 - col 2: square */}
          {items[4] && <Card item={items[4]} i={4} className="h-48 md:h-40" />}

          {/* Row 2 - col 3: square */}
          {items[5] && <Card item={items[5]} i={5} className="h-48 md:h-40" />}

          {/* Row 3: 3 equal landscape cards spanning full width (cols 1–3, 1–2, 1–1) */}
          {items[6] && (
            <div className="col-span-2 md:col-span-2">
              <Card item={items[6]} i={6} className="h-52 w-full" />
            </div>
          )}
          {items[7] && (
            <div className="col-span-2 md:col-span-2">
              <Card item={items[7]} i={7} className="h-52 w-full" />
            </div>
          )}
        </div>

        {showViewAll && (
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-outline">View Full Gallery</Link>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-brand-black/95 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.div
              className="relative max-w-4xl max-h-[85vh] w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src(selected)}
                alt={selected.title}
                width={1200}
                height={900}
                className="w-full h-full object-contain max-h-[80vh]"
                onError={(e) => { (e.target as HTMLImageElement).src = '/gallery-1.png'; }}
              />
              <p className="text-white/60 text-sm font-sans text-center mt-4 tracking-[0.1em]">{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
