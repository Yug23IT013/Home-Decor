import Link from 'next/link';
import Image from 'next/image';
import { Camera, Globe, Play, MapPin, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const categories = [
  { href: '/categories/wall-decor', label: 'Wall Decor' },
  { href: '/categories/showpieces', label: 'Showpieces' },
  { href: '/categories/mirrors', label: 'Mirrors' },
  { href: '/categories/table-decor', label: 'Table Decor' },
  { href: '/categories/handmade-decor', label: 'Handmade Decor' },
  { href: '/categories/luxury-accessories', label: 'Luxury Accessories' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white/70">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="Ambica Home Decor" width={44} height={44} className="w-11 h-11 object-contain" />
              <div>
                <p className="font-serif text-white text-lg font-[500] tracking-wider">AMBICA</p>
                <p className="font-sans text-white/40 text-[9px] tracking-[0.3em] uppercase">Home Decor</p>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-white/50 mb-6">
              Curating luxury home decor that transforms spaces into expressions of beauty. Each piece tells a story of artistry and craftsmanship.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: Globe, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Play, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.22em] uppercase text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.22em] uppercase text-white mb-6">Collections</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.22em] uppercase text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-brand-gold shrink-0" />
                <span className="font-sans text-sm text-white/50 leading-relaxed">
                  Ambica Home Decor,<br />Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-gold shrink-0" />
                <a href="tel:+919876543210" className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-gold shrink-0" />
                <a href="mailto:info@ambicahomedecor.com" className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200">
                  info@ambicahomedecor.com
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href={`https://wa.me/919876543210?text=Hello, I'm interested in your decor collection`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase font-sans text-[#25D366] hover:text-[#1DAA52] transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Ambica Home Decor. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/30">
            Crafted with passion for beautiful spaces.
          </p>
        </div>
      </div>
    </footer>
  );
}
