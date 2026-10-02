"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logout, type AuthUser } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const [user, setUserState] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUserState(getUser());
  }, []);

  function handleLogout() {
    logout();
    setUserState(null);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/30 transition-all" />
              <svg viewBox="0 0 40 40" className="relative h-8 w-8" fill="none">
                <path d="M20 4 L36 32 L4 32 Z" stroke="url(#logo-gradient)" strokeWidth="2" fill="none" strokeLinejoin="round" />
                <circle cx="20" cy="22" r="5" fill="url(#logo-gradient)" className="opacity-90" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A5B4FC" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground hidden sm:block">
              Lumina
            </span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Искать видео, пути обучения, каналы..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-background-card border border-border text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/upload"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-foreground-secondary hover:bg-background-card hover:text-foreground transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <span className="hidden lg:inline">Загрузить</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30"
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:block text-sm text-foreground-secondary hover:text-foreground px-2"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-2 rounded-xl text-sm font-medium text-foreground-secondary hover:bg-background-card transition-all"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 rounded-xl text-sm font-medium bg-primary hover:bg-primary-hover transition-all"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
