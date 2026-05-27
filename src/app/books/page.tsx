"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BookCard } from "@/components/books/book-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";

type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
  rating: number;
};

function BooksContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [sort, setSort] = useState(sp.get("sort") ?? "newest");
  const [category, setCategory] = useState(sp.get("category") ?? "");
  const [page, setPage] = useState(Number(sp.get("page") ?? 1));
  const debounced = useDebounce(q);

  const [data, setData] = useState<{ items: Book[]; pages: number; total: number }>({
    items: [],
    pages: 1,
    total: 0,
  });
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((res) => setCategories(res.data ?? []));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounced) params.set("q", debounced);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    params.set("page", String(page));
    setLoading(true);
    fetch(`/api/books?${params}`)
      .then((r) => r.json())
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
    router.replace(`/books?${params}`, { scroll: false });
  }, [debounced, sort, category, page, router]);

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">Browse Books</h1>
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <Input
              placeholder="Title or author..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort by</label>
            <select
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>
        <section>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : data.items.length === 0 ? (
            <p className="text-muted-foreground">No books found.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {data.items.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>
                <span className="text-sm">
                  Page {page} of {data.pages}
                </span>
                <Button
                  variant="outline"
                  disabled={page >= data.pages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <p className="text-muted-foreground">Loading books...</p>
        </div>
      }
    >
      <BooksContent />
    </Suspense>
  );
}
