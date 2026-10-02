import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const limit = Math.min(Number(searchParams.get("limit") || 20), 50);
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const skip = (page - 1) * limit;

    const videos = await prisma.video.findMany({
      where: {
        isPublished: true,
        ...(q
          ? {
              OR: [
                { title: { contains: q } },
                { description: { contains: q } },
                { tags: { contains: q } },
              ],
            }
          : {}),
      },
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
            verified: true,
          },
        },
        chapters: {
          orderBy: { timestamp: "asc" },
        },
        _count: { select: { likes: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    });

    const total = await prisma.video.count({
      where: { isPublished: true },
    });

    return NextResponse.json({
      videos,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/videos error:", error);
    return NextResponse.json(
      { error: "Не удалось загрузить видео" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, videoUrl, thumbnail, duration, tags, channelId, summary } = body;

    if (!title || !videoUrl || !channelId) {
      return NextResponse.json(
        { error: "title, videoUrl и channelId обязательны" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        title,
        description: description || null,
        videoUrl,
        thumbnail: thumbnail || null,
        duration: duration || 0,
        tags: typeof tags === "string" ? tags : JSON.stringify(tags || []),
        summary: summary || null,
        channelId,
        isPublished: true,
      },
      include: {
        channel: true,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error("POST /api/videos error:", error);
    return NextResponse.json(
      { error: "Не удалось создать видео" },
      { status: 500 }
    );
  }
}
