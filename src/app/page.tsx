'use client';

import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import StylesSection from '@/components/sections/StylesSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import SocialFeed from '@/components/sections/SocialFeed';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <StylesSection />
      <FeaturedProducts />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
      <SocialFeed />
    </>
  );
}
