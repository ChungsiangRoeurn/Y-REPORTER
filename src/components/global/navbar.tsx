'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const menuItems = [
  { label: '🧾 Add Book', href: '/add-book' },
  { label: '🙋 Add Borrower', href: '/add-borrower' },
  { label: '🔄 Borrow Book', href: '/borrow-book' },
  { label: '📄 View Borrow List', href: '/borrow-list' },
  { label: '🖨 Export Report', href: '/export-report' },
];

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">📚 Library Tracker</h1>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <nav className="flex flex-col space-y-3 mt-4">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost" className="w-full justify-start text-base">
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost">{item.label}</Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
