'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NewGalleryImagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
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
        setImageUrl(data.url);
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
    setLoading(true);

    try {
      // Create a new gallery item, assume it's just pushing to /api/gallery
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: title || 'New Gallery Item', 
          image: imageUrl || '/hero-interior.png', 
          caption 
        }),
      });

      if (!res.ok) throw new Error('Failed to create gallery item');
      
      toast.success('Gallery image added successfully');
      router.push('/admin/gallery');
      router.refresh();
    } catch (error) {
      toast.error('Error adding gallery image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/gallery" className="w-10 h-10 border border-brand-sand flex items-center justify-center text-brand-gray hover:text-brand-black hover:bg-brand-cream transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Add Gallery Image</h1>
          <p className="font-sans text-sm text-brand-gray mt-1">Upload a new image to the inspiration gallery</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-brand-sand p-6 lg:p-8 space-y-6">
        <div>
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Gallery Image *</label>
          <div className="flex items-center gap-4">
            {imageUrl ? (
              <div className="relative w-32 h-32 border border-brand-sand bg-brand-cream">
                <img src={imageUrl} alt="Gallery" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-1 right-1 bg-white border border-brand-sand p-1 text-red-500 hover:bg-red-50"
                >
                  <X size={12} />
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
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Title / Room Type</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-brand-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors"
            placeholder="e.g., Minimalist Living Room Setup"
          />
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5">Caption (Optional)</label>
          <textarea
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border border-brand-sand px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors resize-none"
            placeholder="Describe the interior inspiration..."
          />
        </div>

        <div className="mt-10 pt-6 border-t border-brand-sand flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            <Save size={16} /> {loading ? 'Saving...' : 'Save Gallery Image'}
          </button>
        </div>
      </form>
    </div>
  );
}
