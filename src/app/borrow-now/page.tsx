'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import SwirlingEffectSpinner from '@/components/ui/spinner';
import { toast } from '@/hooks/use-toast';
import { searchBooks } from '@/lib/api/googleBooks';
import { useBorrowedBooksStore } from '@/lib/store/ borrowedBooksStore';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

export default function BorrowNow() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const [borrowers, setBorrowers] = useState<Record<string, { name: string; phone: string; email?: string }>>({});

  const { addBook } = useBorrowedBooksStore();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const fetchedBooks = await searchBooks('bestseller');
        setBooks(fetchedBooks);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleBorrowSubmit = (bookId: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const email = formData.get('email')?.toString() || '';

    setBorrowers(prev => ({ ...prev, [bookId]: { name, phone, email } }));

    const book = books.find((b) => b.id === bookId);
    if (book) {
      addBook({
        id: `${book.id}-${name}`,
        title: book.title,
        borrower: name,
        phone,
        date: new Date().toISOString().split('T')[0],
      });

      toast({
        title: '📚 Borrowed Successfully',
        description: `${name}, you have borrowed "${book.title}".`,
      });
    }

    setOpenFormId(null);
    e.currentTarget.reset();
  };


  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-primary">
        <BookOpen className="w-7 h-7" />
        Library Books List
      </h2>

      {loading ? (
        <p className="text-center text-muted-foreground text-lg"><SwirlingEffectSpinner /></p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <AnimatePresence>
            {books.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.35 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
                className="rounded-lg"
              >
                <Card className="rounded-lg border border-neutral-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="space-y-3">
                    <CardTitle className="border-b border-neutral-700 pb-2 text-xl font-semibold">
                      {book.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium italic">by {book.author}</p>

                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setOpenFormId(openFormId === book.id ? null : book.id)}
                      className="mt-1 px-0 text-primary hover:underline"
                    >
                      {openFormId === book.id ? 'Cancel' : 'Borrow this Book'}
                    </Button>

                    {openFormId === book.id && (
                      <form onSubmit={(e) => handleBorrowSubmit(book.id, e)} className="space-y-2 pt-2">
                        <Input name="name" placeholder="Your name" required />
                        <Input name="phone" placeholder="Phone number" required />
                        <Input name="email" placeholder="Email (optional)" />
                        <Button type="submit" variant="default">Submit</Button>
                      </form>
                    )}

                    {borrowers[book.id] && (
                      <p className="text-sm text-green-400 mt-2">
                        Borrowed by: {borrowers[book.id].name} ({borrowers[book.id].phone})
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </main>
  );
}
