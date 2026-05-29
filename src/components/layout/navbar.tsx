"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  BookOpen,
  LogOut,
  Moon,
  ShoppingBag,
  Sun,
  User,
  LayoutDashboard,
  Heart,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";

export function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const items = useCart((s) => s.items);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2 text-xl font-black tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_15px_rgba(29,185,84,0.45)]">
            <BookOpen className="h-4.5 w-4.5" />
          </span>
          <span>Bookverse</span>
        </Link>

        {/* Center navigation links */}
        <nav className="hidden flex-shrink-0 items-center gap-1 text-sm font-bold text-muted-foreground lg:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/books"
            className="rounded-full px-4 py-2 transition-colors hover:text-foreground"
          >
            Browse Books
          </Link>
          <Link
            href="/new-releases"
            className="rounded-full px-4 py-2 transition-colors hover:text-foreground"
          >
            New Releases
          </Link>
          <Link
            href="/best-sellers"
            className="rounded-full px-4 py-2 transition-colors hover:text-foreground"
          >
            Best Sellers
          </Link>
          <Link
            href="/coming-soon"
            className="rounded-full px-4 py-2 transition-colors hover:text-foreground"
          >
            Coming Soon
          </Link>
        </nav>

        {/* Mock Search Input in Navbar - Constrained width prevents squishing other elements */}
        <div className="relative hidden w-full max-w-[160px] flex-shrink-0 sm:block md:max-w-[220px] lg:max-w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search books, authors, ISBN... ⌘K"
            className="h-9 w-full rounded-full border border-border bg-secondary/40 pl-9 pr-4 text-xs font-semibold text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary/50 focus:bg-secondary/70"
            onClick={() => {
              const el = document.getElementById("search-input");
              if (el) el.focus();
            }}
          />
        </div>

        {/* Right navigation / User profile */}
        <div className="relative z-10 flex flex-shrink-0 items-center gap-3">
          {/* Wishlist Link */}
          <Link
            href="/books?filter=wishlist"
            className="hidden items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground md:flex"
          >
            <Heart className="h-4 w-4" />
            <span>Wishlist</span>
          </Link>

          {/* Cart Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Cart"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="h-4.5 w-4.5" />
              {items.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground shadow-[0_0_8px_rgba(29,185,84,0.5)]">
                  {items.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Theme switcher */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4.5 w-4.5 dark:hidden" />
            <Moon className="h-4.5 w-4.5 hidden dark:block" />
          </Button>

          {session?.user ? (
            <div className="flex items-center gap-2">
              {session.user.role === "ADMIN" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                  aria-label="Admin"
                  asChild
                >
                  <Link href="/admin">
                    <LayoutDashboard className="h-4.5 w-4.5" />
                  </Link>
                </Button>
              )}

              {/* User Avatar with Google Auth Support */}
              <Link href="/dashboard/profile" className="flex items-center gap-2">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "Profile"}
                    className="h-8 w-8 rounded-full border border-border object-cover shadow-md transition-transform hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-xs font-black text-foreground hover:bg-muted">
                    {session.user.name ? (
                      session.user.name.substring(0, 2).toUpperCase()
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                )}
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => signOut()}
                aria-label="Sign out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-xs font-bold text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href="/login">Login</a>
              </Button>
              <Button size="sm" className="rounded-full px-4 text-xs font-bold" asChild>
                <a href="/register">Sign Up</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
