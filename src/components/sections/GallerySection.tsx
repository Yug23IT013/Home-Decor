'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, ZoomIn } from 'lucide-react';

const galleryItems = [
  { id: 1, src: '/gallery-1.png', title: 'Living Room Elegance', category: 'Interior' },
  { id: 2, src: '/gallery-2.png', title: 'Bedroom Details', category: 'Bedroom' },
  { id: 3, src: '/hero-interior.png', title: 'Arched Luxury', category: 'Living Room' },
  { id: 4, src: '/cat-wall-decor.png', title: 'Wall Art Collection', category: 'Wall Decor' },
  { id: 5, src: '/cat-showpieces.png', title: 'Showpiece Display', category: 'Showpieces' },
  { id: 6, src: '/cat-mirrors.png', title: 'Mirror Gallery', category: 'Mirrors' },
  { id: 7, src: '/style-modern-minimal.png', title: 'Minimal Spaces', category: 'Interior' },
  { id: 8, src: '/style-luxury-gold.png', title: 'Gold Accents', category: 'Luxury' },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <section className="py-24 bg-brand-cream" id="gallery">
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
          <h2 className="section-heading">Interior Gallery</h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="masonry-item group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              onClick={() => setSelected(item)}
            >
              <div className={`relative ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-colors duration-500 flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/gallery" className="btn-outline">View Full Gallery</Link>
        </div>
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
                src={selected.src}
                alt={selected.title}
                width={1200}
                height={900}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <p className="text-white/60 text-sm font-sans text-center mt-4 tracking-[0.1em]">{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
