'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(data => setProducts(data.products || []));
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.slug !== slug));
        toast.success('Product deleted');
      } else {
        toast.error('Error deleting product');
      }
    } catch {
      toast.error('Network error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Products</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-brand-sand font-sans text-sm focus:outline-none focus:border-brand-black transition-colors bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-brand-sand overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-sand bg-brand-beige">
              {['Product', 'Category', 'Style', 'Material', 'Featured', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <motion.tr
                key={p.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-brand-sand last:border-0 hover:bg-brand-cream/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden bg-brand-beige shrink-0">
                      <Image
                        src={p.images[0] || '/cat-showpieces.png'}
                        alt={p.name}
                        fill
                        className="object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/cat-showpieces.png'; }}
                      />
                    </div>
                    <div>
                      <p className="font-sans text-sm text-brand-black font-[500]">{p.name}</p>
                      <p className="font-sans text-xs text-brand-gray line-clamp-1">{p.shortDescription}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-sans text-xs text-brand-charcoal">{p.category}</td>
                <td className="px-4 py-3 font-sans text-xs text-brand-charcoal">{p.style || '—'}</td>
                <td className="px-4 py-3 font-sans text-xs text-brand-charcoal">{p.material || '—'}</td>
                <td className="px-4 py-3">
                  {p.featured && <Star size={14} className="fill-brand-gold text-brand-gold" />}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${p.slug}/edit`}
                      className="p-1.5 text-brand-gray hover:text-brand-black transition-colors"
                      aria-label="Edit"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.slug)}
                      className="p-1.5 text-brand-gray hover:text-red-500 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-12 font-sans text-brand-gray text-sm">No products found</p>
        )}
      </div>
    </div>
  );
}
