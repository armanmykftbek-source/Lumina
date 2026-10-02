import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// POST /api/likes — toggle like
export async function POST(req: NextRequest) {
  try {
    const { userId, videoId } = await req.json();
    if (!userId || !videoId) {
      return NextResponse.json({ error: "userId и videoId обязательны" }, { status: 400 });
    }

    const existing = await prisma.like.findUnique({
      where: { userId_videoId: { userId, videoId } },
    });

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      return NextResponse.json({ liked: false });
    }

    await prisma.like.create({ data: { userId, videoId } });
    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}

// GET /api/likes?userId=&videoId=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const videoId = searchParams.get("videoId");

    if (!userId || !videoId) {
      return NextResponse.json({ error: "нужны userId и videoId" }, { status: 400 });
    }

    const like = await prisma.like.findUnique({
      where: { userId_videoId: { userId, videoId } },
    });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
