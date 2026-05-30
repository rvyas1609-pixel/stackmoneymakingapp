import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export async function GET(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "user"; // "user" or "leaderboard"

    if (type === "leaderboard") {
      const rankingType = searchParams.get("ranking") || "total"; // "total", "monthly", "xp", "streak"

      let users: any[] = [];

      if (rankingType === "total") {
        users = await prisma.user.findMany({
          take: 100,
          orderBy: { totalIncome: "desc" },
          select: { id: true, username: true, profileImage: true, totalIncome: true, xp: true, streakDays: true, subscription: { select: { tier: true } } }
        });
      } else if (rankingType === "xp") {
        users = await prisma.user.findMany({
          take: 100,
          orderBy: { xp: "desc" },
          select: { id: true, username: true, profileImage: true, totalIncome: true, xp: true, streakDays: true, subscription: { select: { tier: true } } }
        });
      } else if (rankingType === "streak") {
        users = await prisma.user.findMany({
          take: 100,
          orderBy: { streakDays: "desc" },
          select: { id: true, username: true, profileImage: true, totalIncome: true, xp: true, streakDays: true, subscription: { select: { tier: true } } }
        });
      }

      return NextResponse.json(users);
    }

    const entries = await prisma.incomeEntry.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error("[INCOME_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { amount, source, playbookId, notes, isPublic } = await req.json();

    const amountFloat = parseFloat(amount);

    const entry = await prisma.incomeEntry.create({
      data: {
        userId: user.id,
        amount: amountFloat,
        source,
        playbookId,
        notes,
        isPublic,
      },
    });

    // Award XP (Rule: 100 XP per income log)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: { increment: 100 },
        totalIncome: { increment: amountFloat },
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("[INCOME_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
