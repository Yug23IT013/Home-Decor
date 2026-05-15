'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, Package, Grid, Image as ImageIcon,
  MessageSquare, Star, Settings, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/categories', icon: Grid, label: 'Categories' },
  { href: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { href: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-brand-sand flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-brand-sand flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="w-9 h-9 object-contain" />
          <div>
            <p className="font-serif text-brand-black text-base font-[500]">AMBICA</p>
            <p className="font-sans text-brand-gray text-[9px] tracking-[0.2em] uppercase">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-brand-gray">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`admin-sidebar-link ${pathname.startsWith(href) ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  {label}
                  {pathname.startsWith(href) && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-brand-sand">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="admin-sidebar-link w-full text-red-400 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-brand-sand px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-brand-gray hover:text-brand-black">
            <Menu size={22} />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/" target="_blank" className="font-sans text-xs text-brand-gray hover:text-brand-black transition-colors tracking-[0.1em] uppercase">
              View Site ↗
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
