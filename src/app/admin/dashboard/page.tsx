'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, MessageSquare, Image as ImageIcon, Star, TrendingUp, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, newInquiries: 0, gallery: 0, testimonials: 0 });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch all counts in parallel with individual error catching
    Promise.all([
      fetch('/api/products').then(r => r.ok ? r.json() : { products: [] }).catch(() => ({ products: [] })),
      fetch('/api/inquiries').then(r => r.ok ? r.json() : { inquiries: [] }).catch(() => ({ inquiries: [] })),
      fetch('/api/gallery').then(r => r.ok ? r.json() : { gallery: [] }).catch(() => ({ gallery: [] })),
      fetch('/api/testimonials').then(r => r.ok ? r.json() : { testimonials: [] }).catch(() => ({ testimonials: [] })),
    ]).then(([products, inquiries, gallery, testimonials]) => {
      const allInquiries = inquiries.inquiries || [];
      setStats({
        products: (products.products || []).length,
        newInquiries: allInquiries.filter((i: any) => i.status === 'new' || !i.status).length,
        gallery: (gallery.gallery || []).length,
        testimonials: (testimonials.testimonials || []).length,
      });
      setRecentInquiries(allInquiries.slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const formatTime = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return 'Just now';
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-brand-black', href: '/admin/products' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: MessageSquare, color: 'bg-brand-teal', href: '/admin/inquiries' },
    { label: 'Gallery Items', value: stats.gallery, icon: ImageIcon, color: 'bg-brand-gold', href: '/admin/gallery' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'bg-brand-charcoal', href: '/admin/testimonials' },
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-brand-gold/20 text-brand-charcoal',
    read: 'bg-blue-50 text-blue-600',
    replied: 'bg-green-50 text-green-600',
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Dashboard</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">Welcome back to Ambica Home Decor Admin</p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-brand-gold">
            <div className="w-2 h-2 bg-brand-gold animate-bounce" />
            <div className="w-2 h-2 bg-brand-gold animate-bounce delay-75" />
            <div className="w-2 h-2 bg-brand-gold animate-bounce delay-150" />
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="bg-white border border-brand-sand p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${color} flex items-center justify-center`}>
                <Icon size={18} className="text-white" />
              </div>
              <TrendingUp size={14} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-serif text-3xl text-brand-black mb-1">{value}</p>
            <p className="font-sans text-xs text-brand-gray tracking-[0.1em] uppercase">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white border border-brand-sand p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-brand-black">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="font-sans text-xs text-brand-teal hover:text-brand-black transition-colors">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentInquiries.length === 0 && (
              <p className="font-sans text-sm text-brand-gray text-center py-6">No inquiries yet.</p>
            )}
            {recentInquiries.map((inq, i) => (
              <div key={inq._id || i} className="flex items-center justify-between py-3 border-b border-brand-sand last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-beige flex items-center justify-center font-serif text-sm text-brand-black">
                    {inq.name?.[0] || '?'}
                  </div>
                  <div>
                    <p className="font-sans text-sm text-brand-black font-[500]">{inq.name}</p>
                    <p className="font-sans text-xs text-brand-gray">{inq.productName || 'General Inquiry'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-sans ${statusColors[inq.status || 'new'] || statusColors.new}`}>
                    {inq.status || 'new'}
                  </span>
                  <span className="font-sans text-xs text-brand-gray flex items-center gap-1">
                    <Clock size={10} /> {formatTime(inq.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-brand-sand p-6">
          <h2 className="font-serif text-xl text-brand-black mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Add New Product', href: '/admin/products/new', color: 'bg-brand-black text-white hover:bg-brand-charcoal' },
              { label: 'Upload Gallery Image', href: '/admin/gallery/new', color: 'bg-brand-teal text-white hover:bg-brand-teal/80' },
              { label: 'Add Testimonial', href: '/admin/testimonials/new', color: 'bg-brand-gold text-brand-black hover:bg-brand-gold-light' },
              { label: 'View Inquiries', href: '/admin/inquiries', color: 'bg-brand-beige text-brand-black hover:bg-brand-sand border border-brand-sand' },
            ].map(({ label, href, color }) => (
              <Link key={label} href={href} className={`block w-full px-4 py-3 text-center font-sans text-xs tracking-[0.1em] uppercase transition-all duration-200 ${color}`}>
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-brand-sand">
            <Link href="/" target="_blank" className="flex items-center gap-2 font-sans text-xs text-brand-gray hover:text-brand-black transition-colors">
              Preview Live Site →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
