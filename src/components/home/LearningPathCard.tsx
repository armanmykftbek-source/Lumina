import Link from "next/link";
import Image from "next/image";
import { LearningPath } from "@/types";

interface LearningPathCardProps {
  path: LearningPath;
}

export function LearningPathCard({ path }: LearningPathCardProps) {
  return (
    <Link
      href={`/library?path=${path.id}`}
      className="group relative block rounded-2xl overflow-hidden bg-background-card border border-border hover:border-primary/40 transition-all"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={path.thumbnail}
          alt={path.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-card via-background-card/40 to-transparent" />
        
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-medium">
          <svg className="h-3.5 w-3.5 text-primary-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          {path.category}
        </div>
      </div>

      <div className="p-4 pt-0 -mt-6 relative">
        <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">
          {path.title}
        </h3>
        <p className="text-sm text-foreground-secondary mt-1.5 line-clamp-2">
          {path.description}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-foreground-muted">
            {path.videosCount} видео
          </span>
          
          {typeof path.progress === "number" && (
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${path.progress}%` }}
                />
              </div>
              <span className="text-xs text-foreground-secondary">{path.progress}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
