import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const channel = await prisma.channel.findUnique({
      where: { id },
      include: {
        videos: {
          where: { isPublished: true },
          orderBy: { createdAt: "desc" },
          include: {
            channel: { select: { id: true, name: true, avatar: true, verified: true } },
          },
        },
        _count: { select: { subscribers: true, videos: true } },
      },
    });

    if (!channel) {
      return NextResponse.json({ error: "Канал не найден" }, { status: 404 });
    }

    return NextResponse.json(channel);
  } catch (error) {
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
