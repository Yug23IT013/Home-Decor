import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const item = await Gallery.create(body);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error: any) {
    console.error('Gallery creation error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
