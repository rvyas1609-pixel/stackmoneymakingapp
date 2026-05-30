import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getOrCreateUser();

    if (!user) {
      console.log("[USER_GET] No user session found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get aggregated income
    const incomeAggregation = await prisma.incomeEntry.aggregate({
      where: { userId: user.id },
      _sum: { amount: true },
    });

    console.log("[USER_GET] Successfully fetched profile for:", user.email);

    return NextResponse.json({
      ...user,
      totalIncome: incomeAggregation._sum.amount || 0,
    });
  } catch (error: any) {
    console.error("[USER_GET_ERROR]", error.message);
    return new NextResponse("Internal Server Error: " + error.message, { status: 500 });
  }
}
