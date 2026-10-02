import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
        <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold mb-2">Страница не найдена</h1>
      <p className="text-foreground-secondary mb-6 max-w-md">
        Возможно, видео удалили или ссылка устарела.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-primary text-sm font-medium hover:bg-primary-hover transition-all"
      >
        На главную
      </Link>
    </div>
  );
}
