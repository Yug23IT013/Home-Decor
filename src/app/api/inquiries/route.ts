import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, message, productId, productName } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const inquiry = await Inquiry.create({ name, email, phone, message, productId, productName });

    // Send email notification (if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: Number(process.env.EMAIL_PORT),
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.ADMIN_EMAIL,
          subject: `New Inquiry from ${name}`,
          html: `
            <h2>New Inquiry - Ambica Home Decor</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
      }
    }

    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 });
  } catch (err) {
    console.error('Inquiry POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ inquiries });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
