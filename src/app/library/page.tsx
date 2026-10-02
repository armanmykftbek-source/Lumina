"use client";

import { useState } from "react";
import { mockVideos, mockLearningPaths } from "@/lib/mock-data";
import { VideoCard } from "@/components/video/VideoCard";
import { LearningPathCard } from "@/components/home/LearningPathCard";

const tabs = [
  { id: "paths", label: "Пути обучения" },
  { id: "history", label: "История" },
  { id: "liked", label: "Понравившиеся" },
  { id: "watchlater", label: "Смотреть позже" },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("paths");

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Библиотека</h1>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-background-card border border-border mb-8 w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "paths" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-foreground-secondary text-sm">
              Ваши пути обучения и прогресс
            </p>
            <button className="text-sm text-primary hover:text-primary-hover">
              Создать путь
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockLearningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <p className="text-foreground-secondary text-sm mb-5">
            Недавно просмотренные видео
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {mockVideos.slice(0, 6).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "liked" && (
        <div>
          <p className="text-foreground-secondary text-sm mb-5">
            Видео, которые вы отметили как полезные
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {mockVideos.slice(2, 6).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "watchlater" && (
        <div>
          <p className="text-foreground-secondary text-sm mb-5">
            Сохранённые на потом
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {mockVideos.slice(1, 5).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
