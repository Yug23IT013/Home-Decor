'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, MessageSquare, Image as ImageIcon, Star, TrendingUp, Clock, Eye } from 'lucide-react';
import { SEED_PRODUCTS, SEED_TESTIMONIALS } from '@/lib/seedData';

const stats = [
  { label: 'Total Products', value: SEED_PRODUCTS.length, icon: Package, color: 'bg-brand-black', href: '/admin/products' },
  { label: 'New Inquiries', value: 3, icon: MessageSquare, color: 'bg-brand-teal', href: '/admin/inquiries' },
  { label: 'Gallery Items', value: 8, icon: ImageIcon, color: 'bg-brand-gold', href: '/admin/gallery' },
  { label: 'Testimonials', value: SEED_TESTIMONIALS.length, icon: Star, color: 'bg-brand-charcoal', href: '/admin/testimonials' },
];

export default function AdminDashboard() {
  const [recentInquiries] = useState([
    { name: 'Priya Sharma', product: 'Gold Leaf Mirror', time: '2 hours ago', status: 'new' },
    { name: 'Rahul Mehta', product: 'Arch Frame Wall Art', time: '5 hours ago', status: 'read' },
    { name: 'Sunita Patel', product: 'General Inquiry', time: '1 day ago', status: 'replied' },
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-black">Dashboard</h1>
        <p className="font-sans text-sm text-brand-gray mt-1">Welcome back to Ambica Home Decor Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, href }) => (
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
            {recentInquiries.map((inq, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-brand-sand last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-beige flex items-center justify-center font-serif text-sm text-brand-black">
                    {inq.name[0]}
                  </div>
                  <div>
                    <p className="font-sans text-sm text-brand-black font-[500]">{inq.name}</p>
                    <p className="font-sans text-xs text-brand-gray">{inq.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-sans ${
                    inq.status === 'new' ? 'bg-brand-gold/20 text-brand-charcoal' :
                    inq.status === 'read' ? 'bg-blue-50 text-blue-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {inq.status}
                  </span>
                  <span className="font-sans text-xs text-brand-gray flex items-center gap-1">
                    <Clock size={10} /> {inq.time}
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

          {/* View site link */}
          <div className="mt-6 pt-6 border-t border-brand-sand">
            <Link href="/" target="_blank" className="flex items-center gap-2 font-sans text-xs text-brand-gray hover:text-brand-black transition-colors">
              <Eye size={14} /> Preview Live Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
