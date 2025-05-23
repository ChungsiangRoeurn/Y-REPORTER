'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import SwirlingEffectSpinner from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { Book, searchBooks } from '@/lib/api/googleBooks';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AllBookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-primary">
        <BookOpen className="w-7 h-7" />
        Welcome to the Library
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
                    <p className="leading-relaxed text-neutral-500">{book.description}</p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-1 px-0 text-primary hover:underline"
                      aria-label={`Read more about ${book.title}`}
                      onClick={() =>
                        toast({
                          title: 'Coming Soon!',
                          description: `Details for "${book.title}" will be available soon.`,
                        })
                      }
                    >
                      Read More
                    </Button>
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
