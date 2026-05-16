import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const productUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  shortDescription: z.string().max(200).optional(),
  category: z.string().min(1).optional(),
  style: z.string().optional(),
  material: z.string().optional(),
  price: z.number().optional(),
  images: z.array(z.string()).min(1).optional(),
  dimensions: z.object({
    width: z.string().optional(),
    height: z.string().optional(),
    depth: z.string().optional(),
    weight: z.string().optional(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const product = await Product.findOne({ slug, active: true });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const related = await Product.find({
      category: product.category,
      slug: { $ne: slug },
      active: true,
    }).limit(4);

    return NextResponse.json({ product, related });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;
    const body = await req.json();

    // Validate body
    const validatedData = productUpdateSchema.parse(body);

    const product = await Product.findOneAndUpdate({ slug }, validatedData, { new: true });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ product });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;
    await Product.findOneAndDelete({ slug });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
