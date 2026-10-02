"use client";

import { useState } from "react";
import { mockVideos, mockLearningPaths, mockChannels } from "@/lib/mock-data";
import { VideoCard } from "@/components/video/VideoCard";
import { LearningPathCard } from "@/components/home/LearningPathCard";
import Image from "next/image";
import Link from "next/link";
import { formatViews } from "@/lib/utils";

const categories = [
  "Все",
  "AI & ML",
  "Дизайн",
  "Программирование",
  "Наука",
  "Продуктивность",
  "Бизнес",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredVideos = mockVideos.filter((v) => {
    const matchesQuery =
      !query ||
      v.title.toLowerCase().includes(query.toLowerCase()) ||
      v.channel.name.toLowerCase().includes(query.toLowerCase()) ||
      v.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory =
      activeCategory === "Все" ||
      v.tags?.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase().split(" ")[0]));
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
      {/* Search input (mobile mainly) */}
      <div className="mb-6 md:hidden">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-background-card border border-border text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-background-card border border-border text-foreground-secondary hover:border-primary/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Desktop search */}
      <div className="hidden md:block mb-8">
        <div className="relative max-w-2xl">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Искать видео, каналы, пути обучения..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-background-card border border-border text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-foreground-secondary">
        Найдено: {filteredVideos.length} видео
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mb-12">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Channels section */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Каналы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockChannels.map((channel) => (
            <Link
              key={channel.id}
              href={`/channel/${channel.id}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-background-card border border-border hover:border-primary/40 transition-all"
            >
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-background-elevated shrink-0">
                <Image src={channel.avatar} alt={channel.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate flex items-center gap-1">
                  {channel.name}
                  {channel.verified && (
                    <svg className="h-3.5 w-3.5 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </p>
                <p className="text-sm text-foreground-secondary">
                  {formatViews(channel.subscribers)} подписчиков
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Paths */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Пути обучения</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockLearningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </section>
    </div>
  );
}
