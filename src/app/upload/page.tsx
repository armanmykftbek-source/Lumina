"use client";

import { useState } from "react";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Загрузить видео</h1>
      <p className="text-foreground-secondary text-sm mb-8">
        Поделитесь знаниями. После загрузки можно добавить главы и краткое содержание.
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        className={`mb-8 rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
          dragOver
            ? "border-primary bg-primary/10"
            : "border-border bg-background-card hover:border-primary/40"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center">
            <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Перетащите видео сюда</p>
            <p className="text-sm text-foreground-secondary mt-1">
              или нажмите, чтобы выбрать файл
            </p>
          </div>
          <p className="text-xs text-foreground-muted">
            MP4, WebM, MOV · до 2 ГБ
          </p>
          <button className="mt-2 px-5 py-2 rounded-xl bg-primary text-sm font-medium hover:bg-primary-hover transition-all">
            Выбрать файл
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-5 p-6 rounded-2xl bg-background-card border border-border">
        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-1.5">
            Название *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Как работают трансформеры с нуля"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-1.5">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Кратко расскажите, о чём видео и кому оно будет полезно"
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-1.5">
            Теги
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="AI, Machine Learning, Образование (через запятую)"
            className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input type="checkbox" id="learning" className="h-4 w-4 rounded border-border" defaultChecked />
          <label htmlFor="learning" className="text-sm text-foreground-secondary">
            Это образовательный контент (включить умные главы и summary)
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-background-card transition-all">
          Сохранить как черновик
        </button>
        <button className="px-6 py-2.5 rounded-xl bg-primary text-sm font-medium hover:bg-primary-hover transition-all">
          Опубликовать
        </button>
      </div>
    </div>
  );
}
