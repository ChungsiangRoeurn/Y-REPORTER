'use client';

import Invoice from '@/components/pkgs/invoice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BorrowedItem } from '@/lib/borrowedReportStore';
import { useBorrowedReportStore } from '@/lib/borrowedReportStore';
import { motion } from 'framer-motion';
import { BookOpen, EllipsisVertical, Printer, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';


export default function ExportReportPage() {
  const { items, clearItems, removeItem } = useBorrowedReportStore();
  const [openInvoiceItem, setOpenInvoiceItem] = useState<BorrowedItem | null>(null);


  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-primary">
        <Printer className="w-7 h-7" />
        Export Report
      </h2>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-10 flex flex-col items-center justify-center space-y-6"
        >
          <BookOpen className="w-16 h-16 text-primary" />
          <h3 className="text-xl font-semibold text-gray-700 text-center">
            No borrowed books yet
          </h3>
          <p className="text-muted-foreground text-center max-w-xs">
            It looks like you haven't added any borrowed books yet. Start by adding some to generate your reports.
          </p>
          <Link href="/borrow-list">
            <Button
              variant="default"
              size="lg"
            >
              Add Borrowed Book
            </Button></Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.borrower} - {item.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Date: {item.date}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" aria-label="Actions">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => removeItem(item.id)}
                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenInvoiceItem(item)}
                      >
                        <Printer className="w-4 h-4 mr-2" />
                        View Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <div className="flex flex-col sm:flex-row sm:justify-end gap-4 pt-4">
            <Button variant="outline" onClick={clearItems}>
              Clear All
            </Button>
          </div>
        </motion.div>
      )}

      <Dialog
        open={!!openInvoiceItem}
        onOpenChange={(open) => !open && setOpenInvoiceItem(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice Report</DialogTitle>
          </DialogHeader>
          {openInvoiceItem && <Invoice item={openInvoiceItem} />}
        </DialogContent>
      </Dialog>
    </main>
  );
}
