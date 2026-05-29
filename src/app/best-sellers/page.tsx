"use client";
import { useEffect, useState } from "react";
import { BookCard } from "@/components/books/book-card";
import { Trophy, TrendingUp, Flame } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
  rating: number;
};

export default function BestSellersPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books?sort=rating&limit=20")
      .then((r) => r.json())
      .then((res) => setBooks(res.data?.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container px-4 py-10 md:px-8">
      {/* Hero Banner */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-yellow-500/15 via-card to-card p-8 md:p-12">
        <div className="absolute right-4 top-4 opacity-20">
          <Trophy className="h-32 w-32 text-yellow-500" />
        </div>
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-600 dark:text-yellow-400">
            <Flame className="h-3.5 w-3.5" />
            Trending Now
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
            Best Sellers
          </h1>
          <p className="max-w-xl text-muted-foreground">
            The books everyone is reading — top-rated titles loved by thousands of readers
            worldwide.
          </p>
        </div>
      </div>

      {/* Top 3 Featured */}
      {books.length >= 3 && (
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {books.slice(0, 3).map((book, i) => (
            <div
              key={book.id}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg"
            >
              <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-black text-black shadow-md">
                #{i + 1}
              </div>
              <div className="flex items-center gap-4 pt-6">
                <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                  <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-foreground">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs font-bold text-primary">
                    <TrendingUp className="h-3 w-3" />
                    <span>{book.rating} rating</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Books Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
