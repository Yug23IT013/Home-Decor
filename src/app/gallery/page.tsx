import type { Metadata } from 'next';
import GallerySection from '@/components/sections/GallerySection';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore our interior inspiration gallery — beautiful spaces adorned with Ambica Home Decor pieces.',
};

export default function GalleryPage() {
  return (
    <div>
      <div className="bg-brand-black pt-32 pb-16 text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Inspiration</p>
        <h1 className="font-serif text-5xl text-white">Interior Gallery</h1>
      </div>
      <GallerySection showViewAll={false} limit={100} hideHeader={true} />
    </div>
  );
}
