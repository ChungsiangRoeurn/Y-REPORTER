'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { menuItems } from '@/lib/navbar';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-white border-b shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          YREPORTER
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="p-6 space-y-6 bg-background shadow-xl"
            >
              <div className="text-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                  Y-REPORTER
                </Link>
              </div>

              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="flex flex-col gap-3"
              >
                {menuItems.map(({ label, href, icon: Icon }) => (
                  <motion.div
                    key={href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <SheetClose asChild>
                      <Link href={href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-base gap-3 px-4 py-2 rounded-lg hover:bg-muted"
                        >
                          <Icon className="w-5 h-5" />
                          {label}
                        </Button>
                      </Link>
                    </SheetClose>
                  </motion.div>
                ))}
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="hidden md:flex space-x-4"
        >
          {menuItems.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href}>
              <motion.div whileHover={{ x: 4 }}>
                <Button variant="ghost" className="gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </motion.div>
            </Link>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
}
