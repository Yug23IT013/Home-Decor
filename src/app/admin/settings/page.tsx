'use client';

import { useState, useEffect } from 'react';
import { Save, Info, Globe, MessageCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'seo'>('general');
  
  const [settings, setSettings] = useState({
    storeName: '',
    brandBio: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    instagramUrl: '',
    facebookUrl: '',
    metaTitleFormat: '',
    metaDescription: '',
    analyticsId: '',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setFetching(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full border border-brand-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors bg-white disabled:bg-gray-50";
  const labelCls = "block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5";

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-brand-gray">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="font-sans text-xs tracking-widest uppercase">Loading Configuration...</p>
      </div>
    );
  }

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
                <input 
                  type="text" 
                  name="storeName"
                  value={settings.storeName} 
                  onChange={handleChange}
                  className={inputCls} 
                />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Short Brand Bio (Footer)</label>
                <textarea 
                  name="brandBio"
                  rows={3} 
                  className={`${inputCls} resize-none`} 
                  value={settings.brandBio}
                  onChange={handleChange}
                />
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
                <input 
                  type="email" 
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className={inputCls} 
                />
              </div>
              <div>
                <label className={labelCls}>Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className={inputCls} 
                />
              </div>
              <div>
                <label className={labelCls}>WhatsApp Number</label>
                <input 
                  type="text" 
                  name="whatsapp"
                  value={settings.whatsapp}
                  onChange={handleChange}
                  className={inputCls} 
                />
                <p className="text-[10px] text-brand-gray mt-1">Used for direct WhatsApp inquiries</p>
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Physical Address</label>
                <textarea 
                  name="address"
                  rows={2} 
                  className={`${inputCls} resize-none`} 
                  value={settings.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={labelCls}>Instagram URL</label>
                <input 
                  type="url" 
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={handleChange}
                  className={inputCls} 
                />
              </div>
              <div>
                <label className={labelCls}>Facebook URL</label>
                <input 
                  type="url" 
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleChange}
                  className={inputCls} 
                />
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
                <input 
                  type="text" 
                  name="metaTitleFormat"
                  value={settings.metaTitleFormat}
                  onChange={handleChange}
                  className={inputCls} 
                />
              </div>
              <div>
                <label className={labelCls}>Global Meta Description</label>
                <textarea 
                  name="metaDescription"
                  rows={3} 
                  className={`${inputCls} resize-none`} 
                  value={settings.metaDescription}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={labelCls}>Google Analytics ID</label>
                <input 
                  type="text" 
                  name="analyticsId"
                  placeholder="G-XXXXXXXXXX" 
                  value={settings.analyticsId}
                  onChange={handleChange}
                  className={inputCls} 
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-brand-sand flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
