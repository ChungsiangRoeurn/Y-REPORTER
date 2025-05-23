'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { extendedFeatures } from '../lib/data';

export default function HomePage() {
  const { toast } = useToast();



  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8" />
            Y-REPORT
          </h1>
        </div>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          A beautiful system to manage your library’s books, borrowers, and borrowing records—all at your fingertips.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {extendedFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() =>
                toast({
                  title: feature.title,
                  description: 'Coming soon!',
                })
              }
            >
              <Card
                className={cn(
                  'cursor-pointer hover:shadow-xl transition-all duration-300 border border-transparent rounded-xl ring-1',
                  feature.color
                )}
              >
                <CardContent className="pt-6 pb-8 px-6 h-40 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}
