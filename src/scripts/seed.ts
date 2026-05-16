/**
 * Seed script — run with: npx tsx src/scripts/seed.ts
 * Requires MONGODB_URI in .env.local
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import { CATEGORIES, SEED_PRODUCTS, SEED_TESTIMONIALS, SEED_GALLERY } from '../lib/seedData';

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Lazy load models
  const { default: Product } = await import('../models/Product');
  const { default: Testimonial } = await import('../models/Testimonial');
  const { default: Category } = await import('../models/Category');
  const { default: Gallery } = await import('../models/Gallery');

  // Clear existing
  await Product.deleteMany({});
  await Testimonial.deleteMany({});
  await Category.deleteMany({});
  await Gallery.deleteMany({});
  console.log('Cleared existing data');

  // Seed Categories
  for (const cat of CATEGORIES) {
    await Category.create(cat);
  }
  console.log(`Seeded ${CATEGORIES.length} categories`);

  // Seed products
  for (const p of SEED_PRODUCTS) {
    await Product.create({ ...p, active: true, inquiryCount: 0 });
  }
  console.log(`Seeded ${SEED_PRODUCTS.length} products`);

  // Seed testimonials
  for (const t of SEED_TESTIMONIALS) {
    await Testimonial.create({ ...t, active: true });
  }
  console.log(`Seeded ${SEED_TESTIMONIALS.length} testimonials`);

  // Seed gallery
  for (const item of SEED_GALLERY) {
    await Gallery.create({ ...item, active: true });
  }
  console.log(`Seeded ${SEED_GALLERY.length} gallery items`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
