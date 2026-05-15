'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', icon: '🏷️' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      toast.error('Failed to load categories');
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNewModal = () => {
    setIsEditing(null);
    setFormData({ name: '', slug: '', description: '', icon: '🏷️' });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setIsEditing(cat.slug);
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description, icon: cat.icon });
    setIsModalOpen(true);
  };

  const autoSlug = (name: string) => {
    if (!isEditing) {
      setFormData({ ...formData, name, slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') });
    } else {
      setFormData({ ...formData, name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/categories/${isEditing}` : '/api/categories';
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Category updated' : 'Category created');
        setIsModalOpen(false);
        fetchCategories();
      } else {
        toast.error('Failed to save category');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/categories/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.slug !== slug));
        toast.success('Category deleted');
      } else {
        toast.error('Error deleting category');
      }
    } catch {
      toast.error('Network error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Categories</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">Manage product categories</p>
        </div>
        <button onClick={openNewModal} className="btn-primary">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-white border border-brand-sand overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-brand-sand flex gap-4">
          <div className="relative max-w-md w-full">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-sand font-sans text-sm focus:outline-none focus:border-brand-black transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-brand-beige border-b border-brand-sand">
              <th className="text-left px-6 py-3 font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray w-16">Icon</th>
              <th className="text-left px-6 py-3 font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray">Category Name</th>
              <th className="text-left px-6 py-3 font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray">Description</th>
              <th className="text-right px-6 py-3 font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat, i) => (
              <motion.tr
                key={cat.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-brand-sand last:border-0 hover:bg-brand-cream/50 transition-colors"
              >
                <td className="px-6 py-4 text-2xl">{cat.icon}</td>
                <td className="px-6 py-4">
                  <span className="font-sans text-sm font-[500] text-brand-black">{cat.name}</span>
                  <p className="font-sans text-[10px] text-brand-gray">/{cat.slug}</p>
                </td>
                <td className="px-6 py-4 font-sans text-sm text-brand-charcoal">{cat.description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(cat)} className="p-2 text-brand-gray hover:text-brand-black transition-colors" aria-label="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.slug)}
                      className="p-2 text-brand-gray hover:text-red-500 transition-colors"
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
          <div className="text-center py-12">
            <p className="font-sans text-sm text-brand-gray">No categories found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 shadow-xl border border-brand-sand">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl text-brand-black">{isEditing ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-gray hover:text-brand-black"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Category Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => autoSlug(e.target.value)}
                  className="w-full border border-brand-sand px-3 py-2 text-sm focus:outline-none focus:border-brand-black"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Slug (URL) *</label>
                <input
                  required
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full border border-brand-sand px-3 py-2 text-sm focus:outline-none focus:border-brand-black"
                  readOnly={!!isEditing}
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full border border-brand-sand px-3 py-2 text-sm focus:outline-none focus:border-brand-black"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-brand-sand px-3 py-2 text-sm focus:outline-none focus:border-brand-black resize-none"
                  rows={3}
                />
              </div>
              <button type="submit" className="w-full btn-primary flex justify-center mt-4">
                <Save size={16} /> Save Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
