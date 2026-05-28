import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
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
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { amount, date, methodId, notes } = await req.json();

    const entry = await prisma.incomeEntry.create({
      data: {
        userId: user.id,
        amount: parseFloat(amount),
        date: new Date(date),
        methodId,
        notes,
      },
    });

    // Award XP for logging income
    await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: { increment: 50 },
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("[INCOME_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
