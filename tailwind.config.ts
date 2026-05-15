import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FAF8F5',
          beige: '#F0EBE1',
          sand: '#E8DDD0',
          warm: '#D4C5B0',
          taupe: '#B8A898',
          gray: '#8C8579',
          charcoal: '#4A4440',
          black: '#1A1A1A',
          teal: '#7BA7A0',
          'teal-light': '#A8C5C0',
          gold: '#C9A96E',
          'gold-light': '#E3C98A',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
