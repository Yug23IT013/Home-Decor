'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactSection() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Your inquiry has been received. We\'ll be in touch!');
        reset();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section className="py-24 bg-brand-beige" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subheading mb-3">Get In Touch</p>
          <div className="divider-line mx-auto mb-4" />
          <h2 className="section-heading">Inquire About Our Collection</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <input {...register('name')} placeholder="Your Name *" className="input-luxury" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('email')} placeholder="Email Address *" className="input-luxury" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <input {...register('phone')} placeholder="Phone Number (optional)" className="input-luxury" />
              </div>
              <div>
                <textarea
                  {...register('message')}
                  placeholder="Tell us about your requirements... *"
                  rows={5}
                  className="input-luxury resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                  {loading ? 'Sending...' : <><Send size={15} /> Send Inquiry</>}
                </button>
                <a
                  href="https://wa.me/919876543210?text=Hello, I'd like to inquire about your collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-serif text-2xl text-brand-black mb-6">Visit Our Showroom</h3>
              <div className="space-y-5">
                {[
                  { Icon: MapPin, label: 'Address', value: 'Ambica Home Decor, Mumbai, Maharashtra, India' },
                  { Icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                  { Icon: Mail, label: 'Email', value: 'info@ambicahomedecor.com', href: 'mailto:info@ambicahomedecor.com' },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-black flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-[0.12em] uppercase text-brand-gray mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="font-sans text-brand-black text-sm hover:text-brand-teal transition-colors">{value}</a>
                      ) : (
                        <p className="font-sans text-brand-black text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video bg-brand-sand flex items-center justify-center relative overflow-hidden">
              <iframe
                title="Ambica Home Decor Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="font-serif text-lg text-brand-black mb-3">Business Hours</h4>
              <div className="space-y-2">
                {[
                  { day: 'Mon – Sat', hours: '10:00 AM – 7:00 PM' },
                  { day: 'Sunday', hours: '11:00 AM – 5:00 PM' },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between font-sans text-sm border-b border-brand-sand pb-2">
                    <span className="text-brand-gray">{h.day}</span>
                    <span className="text-brand-black">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
