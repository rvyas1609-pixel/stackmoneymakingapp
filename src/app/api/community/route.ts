import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export async function GET(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const channel = searchParams.get("channel") || "wins";

    const messages = await prisma.message.findMany({
      where: { channel },
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[COMMUNITY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { channel, content } = await req.json();

    const message = await prisma.message.create({
      data: {
        userId: user.id,
        channel,
        content,
      },
      include: { user: true },
    });

    // Award XP for contributing to community
    await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: { increment: 25 },
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("[COMMUNITY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
