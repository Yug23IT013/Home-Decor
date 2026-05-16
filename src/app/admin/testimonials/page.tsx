'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(data => setTestimonials(data.testimonials || []));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    
    // Optimistic update
    setTestimonials((prev) => prev.filter((t) => t._id !== id));
    
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Deleted');
    } catch (error) {
      toast.error('Failed to delete');
      // Re-fetch to sync
      fetch('/api/testimonials').then(r => r.json()).then(data => setTestimonials(data.testimonials || []));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Testimonials</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">{testimonials.length} reviews</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-primary"><Plus size={16} /> Add Review</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white border border-brand-sand p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="font-serif text-brand-black text-base italic mb-4">"{t.review}"</p>
                <div>
                  <p className="font-sans text-sm font-[500] text-brand-black">{t.name}</p>
                  <p className="font-sans text-xs text-brand-gray">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link 
                  href={`/admin/testimonials/edit/${t._id}`}
                  className="p-1.5 text-brand-gray hover:text-brand-black transition-colors"
                >
                  <Edit2 size={14} />
                </Link>
                <button 
                  onClick={() => handleDelete(t._id)} 
                  className="p-1.5 text-brand-gray hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
