'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, X, Star } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Customer');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
        toast.success('Image uploaded!');
      } else {
        toast.error(data.error || 'Upload failed. Check Cloudinary ENV vars.');
      }
    } catch {
      toast.error('Network error uploading image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) {
      return toast.error('Name and Review are required');
    }
    setLoading(true);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, review, rating, image }),
      });

      if (!res.ok) throw new Error('Failed to create testimonial');
      
      toast.success('Testimonial added successfully');
      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      toast.error('Error adding testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/testimonials" className="w-10 h-10 border border-brand-sand flex items-center justify-center text-brand-gray hover:text-brand-black hover:bg-brand-cream transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Add Review</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">Add a new client testimonial</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-brand-sand p-6 lg:p-8 space-y-6">
        <div>
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Client Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-brand-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors"
            placeholder="e.g. Sarah J."
          />
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Role / Location</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-brand-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors"
            placeholder="e.g. Interior Designer, London"
          />
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Client Avatar / Image</label>
          <div className="flex items-center gap-4">
            {image ? (
              <div className="relative w-20 h-20 rounded-full border border-brand-sand bg-brand-cream overflow-hidden">
                <img src={image} alt="Client" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-1 right-1 bg-white border border-brand-sand p-1 rounded-full text-red-500 hover:bg-red-50"
                >
                  <X size={10} />
                </button>
              </div>
            ) : (
              <label className="btn-outline cursor-pointer text-xs py-2 px-4">
                <Upload size={14} className="mr-2" />
                {uploadingImage ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Rating (1-5)</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className="p-1"
              >
                <Star size={24} className={rating >= num ? 'fill-brand-gold text-brand-gold' : 'text-brand-sand'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Review *</label>
          <textarea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border border-brand-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors resize-none"
            placeholder="The quality of this decor is incredible..."
          />
        </div>

        <div className="mt-10 pt-6 border-t border-brand-sand flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save size={16} /> {loading ? 'Saving...' : 'Save Review'}
          </button>
        </div>
      </form>
    </div>
  );
}
