"use client";

import { useState } from "react";

const goals = [
  "Машинное обучение",
  "Дизайн интерфейсов",
  "TypeScript / Frontend",
  "Физика и наука",
  "Продуктивность",
  "Продуктовый менеджмент",
  "Данные и аналитика",
  "Креативное мышление",
];

export default function ProfilePage() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Машинное обучение",
    "Дизайн интерфейсов",
  ]);
  const [name, setName] = useState("Алекс");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">Профиль и настройки</h1>

      {/* Avatar & Name */}
      <section className="mb-10 p-6 rounded-2xl bg-background-card border border-border">
        <div className="flex items-center gap-5 mb-6">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-semibold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-medium">{name}</h2>
            <p className="text-sm text-foreground-secondary">alex@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground-secondary mb-1.5">
              Имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="mb-10 p-6 rounded-2xl bg-background-card border border-border">
        <h3 className="font-medium mb-1">Ваши цели обучения</h3>
        <p className="text-sm text-foreground-secondary mb-5">
          На основе целей Lumina будет рекомендовать более релевантный контент
        </p>
        <div className="flex flex-wrap gap-2">
          {goals.map((goal) => {
            const active = selectedGoals.includes(goal);
            return (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-white"
                    : "bg-background border border-border text-foreground-secondary hover:border-primary/50"
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </section>

      {/* Theme */}
      <section className="mb-10 p-6 rounded-2xl bg-background-card border border-border">
        <h3 className="font-medium mb-4">Тема оформления</h3>
        <div className="flex gap-3">
          {(["dark", "light", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                theme === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground-secondary hover:border-primary/40"
              }`}
            >
              {t === "dark" ? "Тёмная" : t === "light" ? "Светлая" : "Системная"}
            </button>
          ))}
        </div>
      </section>

      {/* Stats placeholder */}
      <section className="p-6 rounded-2xl bg-background-card border border-border">
        <h3 className="font-medium mb-4">Статистика</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-background">
            <p className="text-2xl font-semibold text-primary">47</p>
            <p className="text-xs text-foreground-secondary mt-1">Часов просмотра</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-background">
            <p className="text-2xl font-semibold text-primary">12</p>
            <p className="text-xs text-foreground-secondary mt-1">Пройдено путей</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-background">
            <p className="text-2xl font-semibold text-primary">89</p>
            <p className="text-xs text-foreground-secondary mt-1">Полезных видео</p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2.5 rounded-xl bg-primary text-sm font-medium hover:bg-primary-hover transition-all">
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}
