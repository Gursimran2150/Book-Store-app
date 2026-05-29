"use client";
import { BookOpen, CalendarDays, Bell } from "lucide-react";

const upcomingBooks = [
  {
    title: "The Last Algorithm",
    author: "Sarah Chen",
    expectedDate: "June 15, 2026",
    genre: "Science Fiction",
    description: "A thrilling exploration of what happens when AI develops consciousness.",
    cover: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
  },
  {
    title: "Whispers of the Ocean",
    author: "Marcus Rivera",
    expectedDate: "June 22, 2026",
    genre: "Fiction",
    description: "A family saga set across three generations on the coast of Portugal.",
    cover: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  },
  {
    title: "Mind Over Markets",
    author: "Dr. Priya Patel",
    expectedDate: "July 1, 2026",
    genre: "Finance",
    description: "The definitive guide to behavioral economics in modern trading.",
    cover: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
  {
    title: "Code & Canvas",
    author: "Alex Thornton",
    expectedDate: "July 10, 2026",
    genre: "Technology",
    description: "Where art meets algorithms — creative coding for the next decade.",
    cover: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    title: "The Forgotten Empire",
    author: "Yuki Tanaka",
    expectedDate: "July 18, 2026",
    genre: "Fantasy",
    description: "An epic fantasy spanning a lost civilization beneath the earth.",
    cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
  {
    title: "Quantum Hearts",
    author: "Emily Dawson",
    expectedDate: "August 2, 2026",
    genre: "Romance",
    description: "A love story that defies the laws of physics and time.",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
];

export default function ComingSoonPage() {
  return (
    <div className="container px-4 py-10 md:px-8">
      {/* Hero Banner */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-purple-500/15 via-card to-card p-8 md:p-12">
        <div className="absolute right-4 top-4 opacity-20">
          <CalendarDays className="h-32 w-32 text-purple-500" />
        </div>
        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
            <Bell className="h-3.5 w-3.5" />
            Pre-order Available
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
            Coming Soon
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Get a sneak peek at upcoming releases. Pre-order now and be the first to read these
            highly anticipated titles.
          </p>
        </div>
      </div>

      {/* Upcoming Books List */}
      <div className="space-y-4">
        {upcomingBooks.map((book, i) => (
          <div
            key={i}
            className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md sm:flex-row"
          >
            {/* Cover */}
            <div className="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-secondary shadow-md sm:h-36 sm:w-24">
              <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-foreground transition-colors group-hover:text-primary">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground">
                    {book.genre}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{book.description}</p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Expected: {book.expectedDate}
                </div>
                <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
        <BookOpen className="mx-auto mb-3 h-10 w-10 text-primary" />
        <h2 className="text-xl font-black text-foreground">Never Miss a Release</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Subscribe to our newsletter and get notified when new books become available.
        </p>
        <div className="mx-auto mt-5 flex max-w-sm gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="h-10 flex-1 rounded-full border border-border bg-secondary/30 px-4 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50"
          />
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
