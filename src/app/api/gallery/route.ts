import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const gallerySchema = z.object({
  title: z.string().min(2).optional().default('New Gallery Item'),
  image: z.string().url(),
  category: z.string().optional().default('Interior'),
  featured: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ gallery: items });
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
    const validatedData = gallerySchema.parse(body);
    
    const item = await Gallery.create(validatedData);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }
    console.error('Gallery creation error:', error);
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
