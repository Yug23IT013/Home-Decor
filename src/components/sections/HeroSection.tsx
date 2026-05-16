'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-interior.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black/45" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="font-sans text-xs tracking-[0.35em] uppercase text-white/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Luxury Interior Collections
        </motion.p>

        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-[400] leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Where Every Space
          <br />
          <span className="font-light-serif">Becomes Art</span>
        </motion.h1>

        <motion.p
          className="font-sans text-base md:text-lg text-white/70 font-[300] max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Curated luxury decor pieces that transform interiors into extraordinary living experiences.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/collection" className="btn-primary">
            Explore Collection <ArrowRight size={16} />
          </Link>
          <Link href="/gallery" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/50 text-white text-sm font-sans font-[400] tracking-[0.12em] uppercase transition-all duration-500 hover:bg-white hover:text-brand-black">
            View Gallery
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/50 text-white text-sm font-sans font-[400] tracking-[0.12em] uppercase transition-all duration-500 hover:bg-white hover:text-brand-black">
            Contact Us <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
