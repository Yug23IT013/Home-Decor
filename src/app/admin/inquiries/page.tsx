'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, Phone, MessageSquare, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const statusColors: Record<string, string> = {
  new: 'bg-brand-gold/20 text-brand-charcoal',
  read: 'bg-blue-50 text-blue-600',
  replied: 'bg-green-50 text-green-600',
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/inquiries')
      .then(r => r.json())
      .then(data => setInquiries(data.inquiries || []));
  }, []);

  const filtered = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  const markAs = (id: string, status: string) => {
    setInquiries((prev) => prev.map((i) => i._id === id ? { ...i, status } : i));
    toast.success(`Marked as ${status}`);
  };

  const formatTime = (iso: string) => {
    if (!iso) return 'Unknown time';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Inquiries</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">{inquiries.filter(i => i.status === 'new').length} new inquiries</p>
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 font-sans text-xs uppercase tracking-[0.1em] transition-colors duration-200 ${
                filter === f ? 'bg-brand-black text-white' : 'border border-brand-sand text-brand-gray hover:border-brand-black'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((inq, i) => (
          <motion.div
            key={inq._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white border border-brand-sand p-6"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-brand-beige flex items-center justify-center font-serif text-brand-black shrink-0">
                  {inq.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-sans text-sm font-[500] text-brand-black">{inq.name}</h3>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-sans ${statusColors[inq.status || 'new'] || statusColors.new}`}>
                      {inq.status || 'new'}
                    </span>
                    {inq.productName && (
                      <span className="label-chip text-[10px]">{inq.productName}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 font-sans text-xs text-brand-gray hover:text-brand-black transition-colors">
                      <Mail size={11} /> {inq.email}
                    </a>
                    {inq.phone && (
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 font-sans text-xs text-brand-gray hover:text-brand-black transition-colors">
                        <Phone size={11} /> {inq.phone}
                      </a>
                    )}
                    <span className="flex items-center gap-1.5 font-sans text-xs text-brand-gray">
                      <Clock size={11} /> {formatTime(inq.createdAt)}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-brand-charcoal leading-relaxed">{inq.message}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  href={`mailto:${inq.email}?subject=Re: Your Inquiry at Ambica Home Decor`}
                  className="flex items-center gap-1.5 px-3 py-2 border border-brand-black text-brand-black font-sans text-xs tracking-[0.1em] uppercase hover:bg-brand-black hover:text-white transition-all duration-200"
                >
                  <Mail size={12} /> Reply
                </a>
                {inq.status !== 'replied' && (
                  <button
                    onClick={() => markAs(inq._id, 'replied')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white font-sans text-xs uppercase tracking-[0.1em] hover:bg-green-700 transition-colors"
                  >
                    <Check size={12} /> Mark Replied
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare size={32} className="text-brand-sand mx-auto mb-3" />
            <p className="font-sans text-brand-gray">No inquiries found</p>
          </div>
        )}
      </div>
    </div>
  );
}
