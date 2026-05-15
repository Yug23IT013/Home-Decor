'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/categories', label: 'Categories' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav-scrolled py-3' : 'glass-nav py-5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
              <Image
                src="/logo.png"
                alt="Ambica Home Decor"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className={`transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              <p className={`font-serif font-[500] leading-none tracking-wide transition-all duration-300 ${
                scrolled ? 'text-brand-black text-base' : 'text-white text-base'
              }`}>
                AMBICA
              </p>
              <p className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-all duration-300 ${
                scrolled ? 'text-brand-gray' : 'text-white/70'
              }`}>
                Home Decor
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-xs tracking-[0.18em] uppercase transition-all duration-300 relative group ${
                    scrolled ? 'text-brand-charcoal hover:text-brand-black' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300 ${
                    scrolled ? 'bg-brand-gold' : 'bg-white'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className={`text-xs tracking-[0.18em] uppercase font-sans px-5 py-2.5 border transition-all duration-300 ${
                scrolled
                  ? 'border-brand-black text-brand-black hover:bg-brand-black hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-brand-black'
              }`}
            >
              Inquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-brand-black' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-brand-black/98 flex flex-col"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain" />
                <div>
                  <p className="font-serif text-white text-base font-[500] tracking-wide">AMBICA</p>
                  <p className="font-sans text-white/50 text-[9px] tracking-[0.25em] uppercase">Home Decor</p>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center p-8">
              <ul className="space-y-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className="font-serif text-3xl text-white/80 hover:text-white transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Inquire Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
