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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    console.log('Fetching testimonial with ID:', id);
    const testimonial = await Testimonial.findById(id);
    console.log('Database result:', testimonial ? 'Found' : 'Not Found');
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ testimonial });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const validatedData = testimonialSchema.parse(body);

    const testimonial = await Testimonial.findByIdAndUpdate(id, validatedData, { new: true });
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ testimonial });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('Deleting testimonial with ID:', id);
    const testimonial = await Testimonial.findByIdAndDelete(id);
    console.log('Delete result:', testimonial ? 'Success' : 'Failed (Not Found)');
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
