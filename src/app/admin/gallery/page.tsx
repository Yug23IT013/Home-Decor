'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, ZoomIn } from 'lucide-react';
import toast from 'react-hot-toast';

// No mock gallery needed as we have seed data and actual database items

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setItems(data.gallery || []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    
    // Optimistic UI update
    const previousItems = [...items];
    setItems((prev) => prev.filter((i) => i._id !== id));
    
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Image removed');
    } catch (error) {
      setItems(previousItems); // Revert on failure
      toast.error('Failed to delete image');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Gallery</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">{items.length} images</p>
        </div>
        <Link href="/admin/gallery/new" className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Image
        </Link>
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
            <p className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white font-sans text-xs font-[500]">
              {item.title || 'Untitled Space'}
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
