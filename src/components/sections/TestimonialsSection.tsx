'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(data => setTestimonials(data.testimonials || []));
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-brand-black" id="testimonials">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/40 mb-3">Client Stories</p>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-16">What Our Clients Say</h2>
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Quote mark */}
              <p className="font-serif text-7xl text-brand-gold/20 leading-none mb-4">"</p>

              {/* Review */}
              <blockquote className="font-serif text-xl md:text-2xl text-white/80 font-[300] italic leading-relaxed mb-10 max-w-2xl mx-auto">
                {testimonials[current].review}
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center justify-center">
                {testimonials[current].image && (
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border border-brand-sand/20">
                    <Image src={testimonials[current].image} alt="Client" width={64} height={64} className="object-cover w-full h-full" />
                  </div>
                )}
                <p className="font-serif text-white text-lg">{testimonials[current].name}</p>
                <p className="font-sans text-white/40 text-xs tracking-[0.15em] uppercase mt-1">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-white/60 hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 ${
                    i === current ? 'w-6 h-1 bg-brand-gold' : 'w-2 h-1 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-white/60 hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        ) : (
          <p className="text-white/40 font-sans text-sm pb-10">No testimonials yet.</p>
        )}
      </div>
    </section>
  );
}
