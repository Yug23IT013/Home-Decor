import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

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
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
