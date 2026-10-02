import { mockVideos, mockLearningPaths } from "@/lib/mock-data";
import { VideoCard } from "@/components/video/VideoCard";
import { LearningPathCard } from "@/components/home/LearningPathCard";

export default function HomePage() {
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
      {/* Hero */}
      <section className="mb-10 rounded-2xl bg-gradient-to-br from-primary/20 via-background-card to-background-card border border-border p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 text-primary mb-3">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            </svg>
            <span className="text-sm font-medium">Рекомендации на основе целей</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
            Что вы хотите понять сегодня?
          </h1>
          <p className="text-foreground-secondary max-w-xl mb-5">
            Укажите цель — и Lumina подберёт видео и пути обучения, которые действительно помогут.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Машинное обучение", "Дизайн интерфейсов", "TypeScript", "Физика", "Продуктивность"].map(
              (goal) => (
                <button
                  key={goal}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-background/60 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  {goal}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <h2 className="text-xl font-semibold">Пути обучения</h2>
          </div>
          <button className="text-sm text-primary hover:text-primary-hover transition-colors">
            Смотреть все
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockLearningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <h2 className="text-xl font-semibold">Рекомендуем вам</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Continue */}
      <section>
        <h2 className="text-xl font-semibold mb-5">Продолжить просмотр</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {mockVideos.slice(0, 4).map((video) => (
            <VideoCard key={`continue-${video.id}`} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
