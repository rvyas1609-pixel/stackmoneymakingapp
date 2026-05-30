import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const resource = await prisma.resource.findUnique({
      where: { id: params.id },
    });

    if (!resource) return new NextResponse("Not Found", { status: 404 });

    // Check tier
    const tiers = { free: 0, starter: 1, pro: 2, elite: 3 };
    const userTier = user.subscription?.tier || "free";
    
    if (tiers[userTier as keyof typeof tiers] < tiers[resource.tier as keyof typeof tiers]) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json(resource);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    // Increment download count and track
    await prisma.resource.update({
      where: { id: params.id },
      data: { downloads: { increment: 1 } },
    });

    // Award XP (+15 XP per download)
    await prisma.user.update({
      where: { id: user.id },
      data: { xp: { increment: 15 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
