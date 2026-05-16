'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Star } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch(`/api/testimonials/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.testimonial) {
          setName(data.testimonial.name);
          setRole(data.testimonial.role || '');
          setReview(data.testimonial.review);
          setRating(data.testimonial.rating);
        } else {
          toast.error('Testimonial not found');
          router.push('/admin/testimonials');
        }
      })
      .catch(() => toast.error('Error fetching testimonial'))
      .finally(() => setFetching(false));
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) {
      return toast.error('Name and Review are required');
    }
    setLoading(true);

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, review, rating }),
      });

      if (!res.ok) throw new Error('Failed to update testimonial');
      
      toast.success('Testimonial updated successfully');
      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      toast.error('Error updating testimonial');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/testimonials" className="w-10 h-10 border border-brand-sand flex items-center justify-center text-brand-gray hover:text-brand-black hover:bg-brand-cream transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Edit Review</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">Update client testimonial</p>
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
            <Save size={16} /> {loading ? 'Saving...' : 'Update Review'}
          </button>
        </div>
      </form>
    </div>
  );
}
