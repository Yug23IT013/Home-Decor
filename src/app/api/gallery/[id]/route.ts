import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@/lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Await params per Next.js 15+ changes
    const { id } = await params;
    
    const item = await Gallery.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Extract Cloudinary public_id and delete
    if (item.image) {
      const parts = item.image.split('/');
      const filename = parts[parts.length - 1];
      const publicId = filename.split('.')[0];
      await cloudinary.uploader.destroy(`ambica-home-decor/${publicId}`);
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error: any) {
    console.error('Gallery delete error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
