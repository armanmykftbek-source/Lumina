import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") || 20), 50);

    const channels = await prisma.channel.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { subscribers: true, videos: true } },
      },
    });

    return NextResponse.json({ channels });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
