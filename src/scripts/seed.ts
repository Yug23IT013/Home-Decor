/**
 * Seed script — run with: npx tsx src/scripts/seed.ts
 * Requires MONGODB_URI in .env.local
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import { SEED_PRODUCTS, SEED_TESTIMONIALS } from '../lib/seedData';

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Lazy load models
  const { default: Product } = await import('../models/Product');
  const { default: Testimonial } = await import('../models/Testimonial');

  // Clear existing
  await Product.deleteMany({});
  await Testimonial.deleteMany({});
  console.log('Cleared existing data');

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

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
