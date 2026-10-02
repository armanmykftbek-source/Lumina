import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// POST /api/subscribe — toggle subscription
export async function POST(req: NextRequest) {
  try {
    const { userId, channelId } = await req.json();
    if (!userId || !channelId) {
      return NextResponse.json({ error: "userId и channelId обязательны" }, { status: 400 });
    }

    const existing = await prisma.subscription.findUnique({
      where: { userId_channelId: { userId, channelId } },
    });

    if (existing) {
      await prisma.subscription.delete({ where: { id: existing.id } });
      return NextResponse.json({ subscribed: false });
    }

    await prisma.subscription.create({ data: { userId, channelId } });
    return NextResponse.json({ subscribed: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
