import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { aiUsageStats } from "../../ai-coach/route";

export async function GET() {
  try {
    await requireAdmin();

    const [totalUsers, tierCounts, last30DaysUsers, topPlaybooks] = await Promise.all([
      prisma.user.count(),
      prisma.subscription.groupBy({
        by: ['tier'],
        _count: true,
      }),
      prisma.user.count({
        where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
      }),
      prisma.playbook.findMany({
        take: 5,
        orderBy: { views: 'desc' },
        select: { title: true, views: true }
      })
    ]);

    // Calculate MRR (Simplified)
    const prices = { free: 0, starter: 19, pro: 49, elite: 149 };
    const mrr = tierCounts.reduce((acc, curr) => {
      const price = prices[curr.tier as keyof typeof prices] || 0;
      return acc + (price * curr._count);
    }, 0);

    return NextResponse.json({
      totalUsers,
      newSignups: last30DaysUsers,
      mrr,
      aiCoachUsage: aiUsageStats.totalRequests,
      tierDistribution: tierCounts,
      topPlaybooks
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 403 });
  }
}
