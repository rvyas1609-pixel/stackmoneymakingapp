import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get aggregated income
    const incomeAggregation = await prisma.incomeEntry.aggregate({
      where: { userId: user.id },
      _sum: { amount: true },
    });

    return NextResponse.json({
      ...user,
      totalIncome: incomeAggregation._sum.amount || 0,
    });
  } catch (error) {
    console.error("[USER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
