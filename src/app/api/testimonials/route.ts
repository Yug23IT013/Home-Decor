import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().optional(),
  review: z.string().min(5),
  rating: z.number().min(1).max(5),
  active: z.boolean().optional(),
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ testimonials });
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
    const validatedData = testimonialSchema.parse(body);
    
    const testimonial = await Testimonial.create(validatedData);
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
