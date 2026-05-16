import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/mongodb';
import CategoryModel from '@/models/Category';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Explore all home decor categories at Ambica — Wall Decor, Mirrors, Showpieces, Handmade & more.',
};

export default async function CategoriesPage() {
  await connectDB();
  const categories = await CategoryModel.find({ active: true }).sort({ name: 1 });

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-black pt-32 pb-16 text-center mb-12">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Shop By</p>
        <h1 className="font-serif text-5xl text-white">All Categories</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/collection?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white border border-brand-sand p-8 text-center hover:border-brand-black hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h2 className="font-serif text-xl text-brand-black mb-2 group-hover:text-brand-charcoal transition-colors">{cat.name}</h2>
              <p className="font-sans text-xs text-brand-gray leading-relaxed">{cat.description}</p>
              <span className="inline-block mt-4 text-xs tracking-[0.15em] uppercase font-sans text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Browse →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
