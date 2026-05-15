import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  style: string;
  material: string;
  tags: string[];
  images: string[];
  dimensions: { width?: string; height?: string; depth?: string; weight?: string };
  featured: boolean;
  active: boolean;
  inquiryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    category: { type: String, required: true },
    style: { type: String, default: '' },
    material: { type: String, default: '' },
    tags: [{ type: String }],
    images: [{ type: String }],
    dimensions: {
      width: String,
      height: String,
      depth: String,
      weight: String,
    },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    inquiryCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
