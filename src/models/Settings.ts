import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  storeName: string;
  brandBio: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  metaTitleFormat: string;
  metaDescription: string;
  analyticsId: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    storeName: { type: String, default: 'Ambica Home Decor' },
    brandBio: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    address: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    metaTitleFormat: { type: String, default: '%s | Ambica Home Decor' },
    metaDescription: { type: String, default: '' },
    analyticsId: { type: String, default: '' },
  },
  { timestamps: true }
);

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
