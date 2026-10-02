import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET /api/videos/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
            verified: true,
            description: true,
            _count: { select: { subscribers: true } },
          },
        },
        chapters: { orderBy: { timestamp: "asc" } },
        comments: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        _count: { select: { likes: true } },
      },
    });

    if (!video) {
      return NextResponse.json({ error: "Видео не найдено" }, { status: 404 });
    }

    // increment views (fire and forget)
    prisma.video
      .update({ where: { id }, data: { views: { increment: 1 } } })
      .catch(() => {});

    return NextResponse.json(video);
  } catch (error) {
    console.error("GET /api/videos/[id] error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
