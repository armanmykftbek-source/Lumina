import { mockChannels, mockVideos } from "@/lib/mock-data";
import { VideoCard } from "@/components/video/VideoCard";
import { formatViews } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChannelPage({ params }: PageProps) {
  const { id } = await params;
  const channel = mockChannels.find((c) => c.id === id);
  if (!channel) notFound();

  const channelVideos = mockVideos.filter((v) => v.channel.id === id);

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
      {/* Channel header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8 p-6 rounded-2xl bg-background-card border border-border">
        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-background-elevated shrink-0">
          <Image src={channel.avatar} alt={channel.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            {channel.name}
            {channel.verified && (
              <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
          </h1>
          <p className="text-foreground-secondary mt-1">
            {formatViews(channel.subscribers)} подписчиков · {channelVideos.length} видео
          </p>
          <p className="text-sm text-foreground-muted mt-2 max-w-xl">
            Образовательный канал. Глубокие разборы без воды.
          </p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-sm font-medium hover:bg-primary-hover transition-all shrink-0">
          Подписаться
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-5">Видео канала</h2>
      {channelVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {channelVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {mockVideos.slice(0, 4).map((video) => (
            <VideoCard key={video.id} video={{ ...video, channel }} />
          ))}
        </div>
      )}
    </div>
  );
}
