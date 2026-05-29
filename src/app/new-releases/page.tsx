"use client";
import { useEffect, useState } from "react";
import { BookCard } from "@/components/books/book-card";
import { Sparkles, Clock } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
  rating: number;
};

export default function NewReleasesPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books?sort=newest&limit=20")
      .then((r) => r.json())
      .then((res) => setBooks(res.data?.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-10 px-4 md:px-8">
      {/* Hero Banner */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-8 md:p-12">
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="h-32 w-32 text-primary" />
        </div>
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Clock className="h-3.5 w-3.5" />
            Updated Weekly
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
            New Releases
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Fresh off the press — discover the latest titles added to our collection this week.
            Be the first to read what&apos;s new.
          </p>
        </div>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-card border border-border" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}

      {books.length === 0 && !loading && (
        <div className="text-center py-20 text-muted-foreground">
          <Sparkles className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p className="font-semibold">New releases coming soon!</p>
        </div>
      )}
    </div>
  );
}
