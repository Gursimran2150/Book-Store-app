import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Mail, Calendar, Shield, BookOpen, Heart, ShoppingBag } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const memberSince = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="container max-w-4xl space-y-8 px-4 py-10">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name ?? "Profile"}
                className="h-24 w-24 rounded-full border-4 border-primary/20 object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary/20 bg-primary/10 text-2xl font-black text-primary shadow-lg">
                {user.name ? (
                  user.name.substring(0, 2).toUpperCase()
                ) : (
                  <User className="h-10 w-10" />
                )}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Shield className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              {user.name ?? "Bookverse Reader"}
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user.email}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Member since {memberSince}
              </span>
            </div>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {user.role === "ADMIN" ? "Administrator" : "Reader"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">12</p>
            <p className="text-xs font-semibold text-muted-foreground">Books Purchased</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">8</p>
            <p className="text-xs font-semibold text-muted-foreground">Wishlist Items</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">5</p>
            <p className="text-xs font-semibold text-muted-foreground">Total Orders</p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-5 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-black text-foreground">Account Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Full Name
            </label>
            <p className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm font-semibold text-foreground">
              {user.name ?? "Not set"}
            </p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <p className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm font-semibold text-foreground">
              {user.email}
            </p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Role
            </label>
            <p className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm font-semibold capitalize text-foreground">
              {user.role?.toLowerCase() ?? "user"}
            </p>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Account Status
            </label>
            <p className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm font-semibold text-primary">
              Active
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="/dashboard/orders"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
        >
          <ShoppingBag className="h-5 w-5 text-primary" />
          <div>
            <p className="font-bold text-foreground">Order History</p>
            <p className="text-xs text-muted-foreground">View all your past orders</p>
          </div>
        </a>
        <a
          href="/dashboard/wishlist"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
        >
          <Heart className="h-5 w-5 text-primary" />
          <div>
            <p className="font-bold text-foreground">My Wishlist</p>
            <p className="text-xs text-muted-foreground">Books saved for later</p>
          </div>
        </a>
      </div>
    </div>
  );
}
