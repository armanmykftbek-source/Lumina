import { mockVideos } from "@/lib/mock-data";
import { VideoCard } from "@/components/video/VideoCard";
import { formatViews, formatDuration } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  const video = mockVideos.find((v) => v.id === id);
  
  if (!video) notFound();

  const related = mockVideos.filter((v) => v.id !== id).slice(0, 6);

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4 md:p-6 max-w-[1600px] mx-auto">
      <div className="flex-1 min-w-0">
        {/* Player */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-background-card border border-border mb-4">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all glow-primary">
              <svg className="h-7 w-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <span className="absolute bottom-3 right-3 px-2 py-1 text-xs font-medium bg-black/80 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold leading-snug mb-3">
          {video.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-background-card">
              <Image src={video.channel.avatar} alt={video.channel.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-medium flex items-center gap-1">
                {video.channel.name}
                {video.channel.verified && (
                  <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </p>
              <p className="text-sm text-foreground-secondary">
                {formatViews(video.channel.subscribers)} подписчиков
              </p>
            </div>
            <button className="ml-2 px-4 py-2 rounded-xl bg-primary text-sm font-medium hover:bg-primary-hover transition-all">
              Подписаться
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background-card hover:bg-background-elevated transition-all text-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
              Полезно
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background-card hover:bg-background-elevated transition-all text-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" x2="12" y1="2" y2="15" />
              </svg>
              Поделиться
            </button>
          </div>
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl bg-background-card border border-border p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-md bg-primary/20 flex items-center justify-center">
              <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
              </svg>
            </div>
            <h3 className="font-medium">Умное содержание</h3>
          </div>
          
          {video.summary && (
            <p className="text-sm text-foreground-secondary mb-4 leading-relaxed">
              {video.summary}
            </p>
          )}

          {video.chapters && video.chapters.length > 0 && (
            <div>
              <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-2">
                Главы
              </p>
              <div className="space-y-1">
                {video.chapters.map((ch, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-elevated text-left transition-all"
                  >
                    <span className="text-xs font-mono text-primary w-12">
                      {formatDuration(ch.timestamp)}
                    </span>
                    <span className="text-sm">{ch.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-foreground-secondary leading-relaxed">
          <p className="mb-2">{formatViews(video.views)} просмотров</p>
          <p>{video.description}</p>
        </div>
      </div>

      <aside className="w-full xl:w-96 shrink-0 space-y-4">
        <h3 className="font-medium text-sm text-foreground-secondary">Похожие видео</h3>
        {related.map((v) => (
          <VideoCard key={v.id} video={v} variant="compact" />
        ))}
      </aside>
    </div>
  );
}
