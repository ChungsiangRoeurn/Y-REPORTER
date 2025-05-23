'use client';

import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';
import SwirlingEffectSpinner from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useBorrowedReportStore } from '@/lib/borrowedReportStore';
import { useBorrowedBooksStore } from '@/lib/store/ borrowedBooksStore';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Inbox } from 'lucide-react';

const MotionTableRow = motion(TableRow);
const MotionMain = motion.main;

export default function BorrowListPage() {
  const { toast } = useToast();
  const { addItem } = useBorrowedReportStore();
  const { books } = useBorrowedBooksStore();
  const loading = false;

  return (
    <MotionMain
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12"
    >
      <div className="mb-8 flex items-center gap-3">
        <BookOpen className="w-7 h-7 text-primary" />
        <h2 className="text-3xl font-extrabold text-primary">
          List of User Borrowed Books
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <SwirlingEffectSpinner />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-xl border border-border bg-background/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Date Borrowed</TableHead>
                    <TableHead>Book Title</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Inbox className="w-10 h-10 text-muted-foreground" />
                          <p className="text-sm">No borrowed books yet. Please add some!</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <AnimatePresence>
                      {books.map((entry) => (
                        <MotionTableRow
                          key={entry.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TableCell>{entry.borrower}</TableCell>
                          <TableCell>{entry.phone}</TableCell>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.title}</TableCell>
                          <TableCell className="text-right">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                  addItem(entry);
                                  toast({
                                    title: 'Added to Report',
                                    description: `"${entry.title}" has been successfully added.`,
                                  });
                                }}
                              >
                                Add to Report
                              </Button>
                            </motion.div>
                          </TableCell>
                        </MotionTableRow>
                      ))}
                    </AnimatePresence>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </MotionMain>
  );
}
