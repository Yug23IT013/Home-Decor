import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Ambica Home Decor | Luxury Interior & Wall Decor',
    template: '%s | Ambica Home Decor',
  },
  description:
    'Discover curated luxury home decor, wall art, showpieces, mirrors and handcrafted interior pieces. Ambica Home Decor — where every space becomes extraordinary.',
  keywords: [
    'luxury home decor', 'wall decor', 'interior decor', 'showpieces', 'mirrors',
    'handmade decor', 'premium decor', 'Ambica', 'home decor India',
  ],
  openGraph: {
    title: 'Ambica Home Decor | Luxury Interior & Wall Decor',
    description: 'Curated luxury home decor and wall art collections',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Ambica Home Decor',
  },
  robots: { index: true, follow: true },
};

import ClientWrapper from '@/components/ClientWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientWrapper>{children}</ClientWrapper>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#FAF8F5',
              fontFamily: 'Jost, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.05em',
              borderRadius: '0',
              padding: '12px 20px',
            },
          }}
        />
      </body>
    </html>
  );
}
