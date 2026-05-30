import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const achievements = await prisma.achievement.findMany({
      orderBy: { xpReward: "asc" },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error("[ACHIEVEMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
