import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Testimonial from '@/models/Testimonial';
import Gallery from '@/models/Gallery';
import { CATEGORIES, SEED_PRODUCTS, SEED_TESTIMONIALS } from '@/lib/seedData';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await connectDB();

    const results: Record<string, number> = {};

    // Seed Categories (skip if already exist)
    let catCount = 0;
    for (const cat of CATEGORIES) {
      const exists = await Category.findOne({ slug: cat.slug });
      if (!exists) {
        await Category.create(cat);
        catCount++;
      }
    }
    results.categories = catCount;

    // Seed Products (skip if already exist)
    let prodCount = 0;
    for (const prod of SEED_PRODUCTS) {
      const exists = await Product.findOne({ slug: prod.slug });
      if (!exists) {
        await Product.create(prod);
        prodCount++;
      }
    }
    results.products = prodCount;

    // Seed Testimonials (skip if count > 0)
    const existingTestimonials = await Testimonial.countDocuments();
    let testCount = 0;
    if (existingTestimonials === 0) {
      await Testimonial.insertMany(SEED_TESTIMONIALS);
      testCount = SEED_TESTIMONIALS.length;
    }
    results.testimonials = testCount;

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      inserted: results,
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Seed failed', details: error.message },
      { status: 500 }
    );
  }
}
