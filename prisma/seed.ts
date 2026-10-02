import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await hash("password123", 10);

  const user1 = await prisma.user.upsert({
    where: { email: "alex@lumina.dev" },
    update: {},
    create: {
      email: "alex@lumina.dev",
      name: "Алекс",
      passwordHash,
      goals: JSON.stringify(["Машинное обучение", "Дизайн интерфейсов"]),
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "maria@lumina.dev" },
    update: {},
    create: {
      email: "maria@lumina.dev",
      name: "Мария",
      passwordHash,
      goals: JSON.stringify(["TypeScript", "Frontend"]),
    },
  });

  const channel1 = await prisma.channel.upsert({
    where: { ownerId: user1.id },
    update: {},
    create: {
      name: "Neural Academy",
      description: "Глубокие разборы AI и машинного обучения",
      verified: true,
      ownerId: user1.id,
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=neural",
    },
  });

  const channel2 = await prisma.channel.upsert({
    where: { ownerId: user2.id },
    update: {},
    create: {
      name: "Design Clarity",
      description: "Чистый дизайн и UX",
      verified: true,
      ownerId: user2.id,
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=design",
    },
  });

  const video1 = await prisma.video.create({
    data: {
      title: "Как работают трансформеры: полное объяснение с нуля",
      description: "Разбираем архитектуру Transformer от Attention до Decoder.",
      thumbnail: "https://picsum.photos/seed/transformers/640/360",
      videoUrl: "https://example.com/video1.mp4",
      duration: 1842,
      views: 128400,
      tags: JSON.stringify(["AI", "Machine Learning", "Transformers"]),
      summary:
        "Трансформеры — основа современных LLM. Разбираем механизм внимания, позиционные кодировки и почему эта архитектура победила RNN.",
      isPublished: true,
      channelId: channel1.id,
      chapters: {
        create: [
          { title: "Введение", timestamp: 0 },
          { title: "Self-Attention", timestamp: 180 },
          { title: "Multi-Head Attention", timestamp: 420 },
          { title: "Позиционные кодировки", timestamp: 780 },
          { title: "Encoder-Decoder", timestamp: 1100 },
          { title: "Практика", timestamp: 1500 },
        ],
      },
    },
  });

  await prisma.video.create({
    data: {
      title: "Системный дизайн интерфейсов: от хаоса к ясности",
      description: "Как создавать интерфейсы, которые не перегружают пользователя.",
      thumbnail: "https://picsum.photos/seed/design/640/360",
      videoUrl: "https://example.com/video2.mp4",
      duration: 1320,
      views: 45600,
      tags: JSON.stringify(["Design", "UI/UX"]),
      summary: "Практический подход к созданию чистых интерфейсов.",
      isPublished: true,
      channelId: channel2.id,
    },
  });

  const path = await prisma.learningPath.create({
    data: {
      title: "Основы машинного обучения",
      description: "От линейной регрессии до нейросетей.",
      thumbnail: "https://picsum.photos/seed/ml-path/640/360",
      category: "AI & ML",
      videos: {
        create: [{ order: 1, videoId: video1.id }],
      },
    },
  });

  console.log("Seed complete:");
  console.log("- Users:", user1.email, user2.email);
  console.log("- Password for both: password123");
  console.log("- Channels:", channel1.name, channel2.name);
  console.log("- Path:", path.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
