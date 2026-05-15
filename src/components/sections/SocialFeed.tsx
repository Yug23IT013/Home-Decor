'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera } from 'lucide-react';

const socialPosts = [
  { id: 1, src: '/gallery-1.png', likes: 234 },
  { id: 2, src: '/cat-wall-decor.png', likes: 189 },
  { id: 3, src: '/style-modern-minimal.png', likes: 312 },
  { id: 4, src: '/gallery-2.png', likes: 267 },
  { id: 5, src: '/cat-showpieces.png', likes: 145 },
  { id: 6, src: '/style-luxury-gold.png', likes: 423 },
];

export default function SocialFeed() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subheading mb-3">Follow Us</p>
          <div className="divider-line mx-auto mb-4" />
          <h2 className="section-heading">@ambicahomedecor</h2>
          <p className="font-sans text-brand-gray text-sm mt-3">Share your space with #AmbicaHomeDécor</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {socialPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Image
                src={post.src}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/50 transition-colors duration-400 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <Camera size={20} className="text-white mx-auto mb-1" />
                  <p className="text-white text-xs font-sans">❤ {post.likes}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline"
          >
            <Camera size={16} /> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
