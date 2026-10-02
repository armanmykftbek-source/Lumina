import Link from "next/link";
import Image from "next/image";
import { Video } from "@/types";
import { formatDuration, formatViews } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  variant?: "default" | "compact";
}

export function VideoCard({ video, variant = "default" }: VideoCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/watch/${video.id}`} className="group flex gap-3">
        <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-background-card shrink-0">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="160px"
          />
          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-medium bg-black/80 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-foreground-secondary mt-1">{video.channel.name}</p>
          <p className="text-xs text-foreground-muted">
            {formatViews(video.views)} просмотров
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group">
      <Link href={`/watch/${video.id}`} className="block">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-background-card mb-3">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-xs font-medium bg-black/80 rounded">
            {formatDuration(video.duration)}
          </span>
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
        </div>
      </Link>
      
      <div className="flex gap-3">
        <Link href={`/channel/${video.channel.id}`} className="relative h-9 w-9 rounded-full overflow-hidden bg-background-card shrink-0">
          <Image
            src={video.channel.avatar}
            alt={video.channel.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/watch/${video.id}`}>
            <h3 className="font-medium text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
          </Link>
          <Link href={`/channel/${video.channel.id}`} className="text-sm text-foreground-secondary mt-1 flex items-center gap-1 hover:text-foreground transition-colors">
            {video.channel.name}
            {video.channel.verified && (
              <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
          </Link>
          <p className="text-sm text-foreground-muted">
            {formatViews(video.views)} просмотров
          </p>
        </div>
      </div>
    </div>
  );
}
