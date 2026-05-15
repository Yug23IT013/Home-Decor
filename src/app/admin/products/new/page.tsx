'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Plus, X, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, STYLES, MATERIALS } from '@/lib/seedData';

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Only lowercase, numbers, hyphens'),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  category: z.string().min(1),
  style: z.string().optional(),
  material: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  depth: z.string().optional(),
  weight: z.string().optional(),
  featured: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewProductPage() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { featured: false },
  });

  // Auto-generate slug from name
  const nameValue = watch('name');
  const autoSlug = () => {
    setValue('slug', nameValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

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
        setImages((prev) => [...prev, data.url]);
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const productData = {
        ...data,
        tags,
        dimensions: { width: data.width, height: data.height, depth: data.depth, weight: data.weight },
        images,
        active: true,
      };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        toast.success('Product created!');
        router.push('/admin/products');
      } else {
        toast.error('Error saving product. Check MongoDB connection.');
      }
    } catch {
      toast.error('Network error');
    }
    setLoading(false);
  };

  const inputCls = 'w-full border border-brand-sand px-3 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-black transition-colors bg-white';
  const labelCls = 'block font-sans text-[10px] tracking-[0.15em] uppercase text-brand-gray mb-1.5';
  const errorCls = 'font-sans text-xs text-red-500 mt-1';

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-brand-gray hover:text-brand-black transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-brand-black">Add New Product</h1>
          <p className="font-sans text-sm text-brand-gray">Fill in the product details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-brand-sand p-6 space-y-5">
            <h2 className="font-serif text-lg text-brand-black border-b border-brand-sand pb-3">Product Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelCls}>Product Name *</label>
                <input {...register('name')} onBlur={autoSlug} className={inputCls} placeholder="e.g. Gold Arch Mirror" />
                {errors.name && <p className={errorCls}>{errors.name.message}</p>}
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Slug (URL) *</label>
                <input {...register('slug')} className={inputCls} placeholder="e.g. gold-arch-mirror" />
                {errors.slug && <p className={errorCls}>{errors.slug.message}</p>}
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Short Description *</label>
                <input {...register('shortDescription')} className={inputCls} placeholder="One-line product description" />
                {errors.shortDescription && <p className={errorCls}>{errors.shortDescription.message}</p>}
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Full Description *</label>
                <textarea {...register('description')} rows={5} className={`${inputCls} resize-none`} placeholder="Detailed product description..." />
                {errors.description && <p className={errorCls}>{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white border border-brand-sand p-6">
            <h2 className="font-serif text-lg text-brand-black border-b border-brand-sand pb-3 mb-5">Dimensions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['width', 'height', 'depth', 'weight'].map((dim) => (
                <div key={dim}>
                  <label className={labelCls}>{dim.charAt(0).toUpperCase() + dim.slice(1)}</label>
                  <input
                    {...register(dim as 'width' | 'height' | 'depth' | 'weight')}
                    className={inputCls}
                    placeholder={dim === 'weight' ? 'e.g. 2.5 kg' : 'e.g. 24"'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white border border-brand-sand p-6">
            <div className="flex items-center justify-between border-b border-brand-sand pb-3 mb-5">
              <h2 className="font-serif text-lg text-brand-black">Product Images</h2>
              <label className="btn-outline cursor-pointer text-xs py-1.5 px-3">
                <Upload size={14} className="mr-2" />
                {uploadingImage ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            </div>
            
            {images.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-brand-sand">
                <p className="font-sans text-xs text-brand-gray">No images uploaded yet</p>
                <p className="font-sans text-[10px] text-brand-gray mt-1">Requires Cloudinary environment variables</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-square border border-brand-sand bg-brand-cream">
                    <Image src={url} alt="Product image" fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-white border border-brand-sand p-1 text-red-500 hover:bg-red-50"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white border border-brand-sand p-6">
            <h2 className="font-serif text-lg text-brand-black border-b border-brand-sand pb-3 mb-5">Tags</h2>
            <div className="flex gap-2 mb-3">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className={`${inputCls} flex-1`}
                placeholder="Add a tag and press Enter"
              />
              <button type="button" onClick={addTag} className="px-4 py-2 bg-brand-black text-white text-sm hover:bg-brand-charcoal transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="label-chip flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-brand-sand p-6 space-y-5">
            <h2 className="font-serif text-lg text-brand-black border-b border-brand-sand pb-3">Details</h2>
            <div>
              <label className={labelCls}>Category *</label>
              <select {...register('category')} className={inputCls}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
              </select>
              {errors.category && <p className={errorCls}>{errors.category.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Style</label>
              <select {...register('style')} className={inputCls}>
                <option value="">Select style</option>
                {STYLES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Material</label>
              <select {...register('material')} className={inputCls}>
                <option value="">Select material</option>
                {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="featured" {...register('featured')} className="w-4 h-4 accent-brand-gold" />
              <label htmlFor="featured" className="font-sans text-sm text-brand-black cursor-pointer">Mark as Featured</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            <Save size={16} /> {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
