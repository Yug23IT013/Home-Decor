'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Ruler, Package, Tag, Send } from 'lucide-react';
import { SEED_PRODUCTS } from '@/lib/seedData';
import { use } from 'react';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
});
type FormData = z.infer<typeof schema>;

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = SEED_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const images = product.images.length > 0 ? product.images : ['/cat-showpieces.png', '/cat-wall-decor.png'];
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(false);

  const related = SEED_PRODUCTS.filter((p) => p.category === product.category && p.slug !== slug).slice(0, 4);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { message: `Hi, I'm interested in "${product.name}". Please share more details.` },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, productName: product.name }),
      });
      if (res.ok) { toast.success('Inquiry sent!'); reset(); }
      else toast.error('Error sending inquiry');
    } catch { toast.error('Network error'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 font-sans text-xs text-brand-gray tracking-[0.1em]">
          <Link href="/collection" className="hover:text-brand-black transition-colors flex items-center gap-1">
            <ArrowLeft size={12} /> Collection
          </Link>
          <span>/</span>
          <span className="text-brand-black">{product.name}</span>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Images */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-beige mb-4">
              <Image
                src={images[activeImg] || '/cat-showpieces.png'}
                alt={product.name}
                fill
                className="object-cover"
                priority
                onError={(e) => { (e.target as HTMLImageElement).src = '/cat-showpieces.png'; }}
              />
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={() => setActiveImg((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`relative w-16 h-16 overflow-hidden border-2 transition-all ${activeImg === i ? 'border-brand-black' : 'border-transparent'}`}>
                    <Image src={img || '/cat-showpieces.png'} alt="" fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/cat-showpieces.png'; }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-chip mb-4 inline-block">{product.category}</span>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-black mb-4">{product.name}</h1>
            <div className="divider-line mb-6" />
            <p className="font-sans text-brand-charcoal font-[300] leading-relaxed mb-8">{product.description}</p>

            {/* Details */}
            <div className="space-y-3 mb-8 bg-brand-beige p-5">
              {product.style && (
                <div className="flex items-center gap-3 text-sm font-sans">
                  <Tag size={14} className="text-brand-gold" />
                  <span className="text-brand-gray">Style:</span>
                  <span className="text-brand-black">{product.style}</span>
                </div>
              )}
              {product.material && (
                <div className="flex items-center gap-3 text-sm font-sans">
                  <Package size={14} className="text-brand-gold" />
                  <span className="text-brand-gray">Material:</span>
                  <span className="text-brand-black">{product.material}</span>
                </div>
              )}
              {Object.values(product.dimensions || {}).some(Boolean) && (
                <div className="flex items-start gap-3 text-sm font-sans">
                  <Ruler size={14} className="text-brand-gold mt-0.5" />
                  <span className="text-brand-gray">Dimensions:</span>
                  <span className="text-brand-black">
                    {[product.dimensions?.width && `W: ${product.dimensions.width}`, product.dimensions?.height && `H: ${product.dimensions.height}`, product.dimensions?.depth && `D: ${product.dimensions.depth}`].filter(Boolean).join(' · ')}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="label-chip text-[10px]">{tag}</span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/919876543210?text=Hi, I'm interested in: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 justify-center"
              >
                <MessageCircle size={16} /> WhatsApp Inquiry
              </a>
            </div>

            {/* Inquiry Form */}
            <div className="mt-10 pt-10 border-t border-brand-sand">
              <h3 className="font-serif text-2xl text-brand-black mb-6">Send Inquiry</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <input {...register('name')} placeholder="Your Name *" className="input-luxury" />
                <input {...register('email')} placeholder="Email *" className="input-luxury" />
                <input {...register('phone')} placeholder="Phone (optional)" className="input-luxury" />
                <textarea {...register('message')} rows={3} className="input-luxury resize-none" />
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  <Send size={14} /> {loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl text-brand-black mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/collection/${p.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-brand-beige mb-3">
                    <Image src={p.images[0] || '/cat-showpieces.png'} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = '/cat-showpieces.png'; }} />
                  </div>
                  <h4 className="font-serif text-base text-brand-black">{p.name}</h4>
                  <p className="font-sans text-xs text-brand-gray">{p.category}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
