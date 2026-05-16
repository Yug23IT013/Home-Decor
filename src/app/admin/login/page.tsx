'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      loginSchema.parse({ email, password });

      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Welcome back!');
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((issue) => toast.error(issue.message));
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Image src="/logo.png" alt="Ambica Home Decor" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-white">Admin Panel</h1>
          <p className="font-sans text-white/40 text-xs tracking-[0.15em] uppercase mt-1">Ambica Home Decor</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur border border-white/10 p-8 space-y-6">
          <div className="relative">
            <Mail size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-white/20 py-3 pl-6 text-white font-sans text-sm placeholder-white/30 focus:outline-none focus:border-brand-gold transition-colors duration-300"
            />
          </div>
          <div className="relative">
            <Lock size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-white/20 py-3 pl-6 pr-8 text-white font-sans text-sm placeholder-white/30 focus:outline-none focus:border-brand-gold transition-colors duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-gold text-brand-black font-sans text-sm tracking-[0.15em] uppercase hover:bg-brand-gold-light transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center font-sans text-white/20 text-xs mt-6">
          Secure admin access only
        </p>
      </div>
    </div>
  );
}
