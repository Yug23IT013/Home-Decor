'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, ZoomIn } from 'lucide-react';
import toast from 'react-hot-toast';

const mockGallery = [
  { _id: '1', image: '/gallery-1.png', title: 'Living Room Elegance', category: 'Interior', featured: true },
  { _id: '2', image: '/gallery-2.png', title: 'Bedroom Details', category: 'Bedroom', featured: false },
  { _id: '3', image: '/hero-interior.png', title: 'Arched Luxury', category: 'Living Room', featured: true },
  { _id: '4', image: '/cat-wall-decor.png', title: 'Wall Art Display', category: 'Wall Decor', featured: false },
  { _id: '5', image: '/style-modern-minimal.png', title: 'Minimal Spaces', category: 'Interior', featured: false },
  { _id: '6', image: '/style-luxury-gold.png', title: 'Gold Accents', category: 'Luxury', featured: true },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState(mockGallery);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm('Delete this image?')) return;
    setItems((prev) => prev.filter((i) => i._id !== id));
    toast.success('Image removed');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Gallery</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">{items.length} images</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="group relative aspect-square overflow-hidden bg-brand-beige"
          >
            <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            {item.featured && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-gold text-brand-black text-[10px] uppercase tracking-wider font-sans">
                Featured
              </div>
            )}
            <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/50 transition-colors duration-300 flex items-center justify-center gap-3">
              <button
                onClick={() => setPreview(item.image)}
                className="opacity-0 group-hover:opacity-100 w-9 h-9 bg-white flex items-center justify-center hover:bg-brand-cream transition-all"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="opacity-0 group-hover:opacity-100 w-9 h-9 bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white font-sans text-xs truncate">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white"><X size={28} /></button>
            <div className="relative max-w-3xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
              <Image src={preview} alt="Preview" width={900} height={700} className="w-full h-full object-contain max-h-[80vh]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
