import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

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
    await connectDB();
    const body = await req.json();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
