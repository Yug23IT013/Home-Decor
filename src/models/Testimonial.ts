import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
  active: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Customer' },
    image: { type: String, default: '' },
    review: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
