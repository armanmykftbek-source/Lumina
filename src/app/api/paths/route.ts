import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const paths = await prisma.learningPath.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        videos: {
          orderBy: { order: "asc" },
          include: {
            video: {
              include: {
                channel: { select: { id: true, name: true, avatar: true } },
              },
            },
          },
        },
        _count: { select: { videos: true } },
      },
    });

    return NextResponse.json({ paths });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
