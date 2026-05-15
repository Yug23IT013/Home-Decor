import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  image: string;
  category: string;
  featured: boolean;
  active: boolean;
  createdAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    title: { type: String, default: '' },
    image: { type: String, required: true },
    category: { type: String, default: 'Interior' },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Gallery: Model<IGalleryItem> =
  mongoose.models.Gallery || mongoose.model<IGalleryItem>('Gallery', GallerySchema);

export default Gallery;
