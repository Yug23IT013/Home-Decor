# Home Decor

A premium, luxury home decor catalog and interior inspiration platform. This application features a high-end editorial design, a robust administrative dashboard for product and content management, and integrated inquiry systems.

## ✨ Features

- **Luxury Product Catalog**: Filterable gallery of high-end home decor.
- **Interior Gallery**: Masonry-style inspiration board for room aesthetics.
- **Admin Dashboard**: Secure management for products, categories, gallery images, and testimonials.
- **Image Management**: Integrated with **Cloudinary** for professional image hosting and uploading.
- **Inquiry System**: Real-time customer inquiries with automated email notifications.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Storage**: [Cloudinary](https://cloudinary.com/)
- **Email**: [Nodemailer](https://nodemailer.com/)

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or later
- A MongoDB database (Local or Atlas)
- A Cloudinary account for image storage
- A Gmail account with "App Password" for email notifications

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd ambica-home-decor
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in your credentials:
```bash
cp .env.example .env.local
```
*Make sure to never commit your `.env.local` file.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📦 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/). Ensure all environment variables from `.env.local` are added to the Vercel project settings.

