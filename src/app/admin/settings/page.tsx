'use client';

import { useState } from 'react';
import { Save, Info, Globe, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'seo'>('general');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      toast.success('Settings updated successfully');
      setLoading(false);
    }, 800);
  };

  const inputCls = "w-full border border-brand-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors bg-white";
  const labelCls = "block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5";

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-black">Settings</h1>
        <p className="font-sans text-sm text-brand-gray mt-1">Manage global website configuration</p>
      </div>

      <div className="bg-white border border-brand-sand flex mb-6 overflow-x-auto">
        {[
          { id: 'general', label: 'General & Brand', icon: Info },
          { id: 'contact', label: 'Contact Details', icon: MessageCircle },
          { id: 'seo', label: 'SEO & Metadata', icon: Globe },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-6 py-4 font-sans text-xs tracking-[0.1em] uppercase transition-colors whitespace-nowrap ${
              activeTab === id ? 'bg-brand-black text-white' : 'text-brand-gray hover:text-brand-black hover:bg-brand-cream'
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-white border border-brand-sand p-6 lg:p-8">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-brand-black border-b border-brand-sand pb-4">Brand Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className={labelCls}>Store Name</label>
                <input type="text" defaultValue="Ambica Home Decor" className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Short Brand Bio (Footer)</label>
                <textarea rows={3} className={`${inputCls} resize-none`} defaultValue="Curating premium interior decor pieces and handmade accessories that bring elegance, warmth, and artistic expression to your living spaces." />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-brand-black border-b border-brand-sand pb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Primary Email</label>
                <input type="email" defaultValue="contact@ambicahomedecor.com" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Phone Number</label>
                <input type="text" defaultValue="+91 98765 43210" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>WhatsApp Number</label>
                <input type="text" defaultValue="+91 98765 43210" className={inputCls} />
                <p className="text-[10px] text-brand-gray mt-1">Used for direct WhatsApp inquiries</p>
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Physical Address</label>
                <textarea rows={2} className={`${inputCls} resize-none`} defaultValue="123 Luxury Avenue, Design District, Mumbai, Maharashtra 400001, India" />
              </div>
              <div>
                <label className={labelCls}>Instagram URL</label>
                <input type="url" defaultValue="https://instagram.com/ambicahomedecor" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Facebook URL</label>
                <input type="url" defaultValue="https://facebook.com/ambicahomedecor" className={inputCls} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-brand-black border-b border-brand-sand pb-4">SEO Settings</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={labelCls}>Global Meta Title Format</label>
                <input type="text" defaultValue="%s | Ambica Home Decor" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Global Meta Description</label>
                <textarea rows={3} className={`${inputCls} resize-none`} defaultValue="Discover Ambica Home Decor's premium collection of luxury interior pieces, wall art, and handmade accessories." />
              </div>
              <div>
                <label className={labelCls}>Google Analytics ID</label>
                <input type="text" placeholder="G-XXXXXXXXXX" className={inputCls} />
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-brand-sand flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save size={16} /> {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
