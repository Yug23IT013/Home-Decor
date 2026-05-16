import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  shortDescription: z.string().max(200),
  category: z.string().min(1),
  style: z.string().optional(),
  material: z.string().optional(),
  price: z.number().optional(),
  images: z.array(z.string()).min(1),
  dimensions: z.object({
    width: z.string().optional(),
    height: z.string().optional(),
    depth: z.string().optional(),
    weight: z.string().optional(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const style = searchParams.get('style');
    const material = searchParams.get('material');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'createdAt';
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 12);

    const query: Record<string, unknown> = { active: true };
    if (category) query.category = { $regex: category, $options: 'i' };
    if (style) query.style = { $regex: style, $options: 'i' };
    if (material) query.material = { $regex: material, $options: 'i' };
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const sortMap: Record<string, any> = {
      createdAt: { createdAt: -1 },
      name: { name: 1 },
      featured: { featured: -1, createdAt: -1 },
    };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortMap[sort] || { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    
    // Validate body
    const validatedData = productSchema.parse(body);
    
    // Create slug if not provided
    const slug = body.slug || validatedData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const product = await Product.create({ ...validatedData, slug });
    return NextResponse.json({ product }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
