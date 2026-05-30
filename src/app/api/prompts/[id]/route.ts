import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    // Track usage
    await prisma.promptUsage.create({
      data: {
        userId: user.id,
        promptId: params.id,
      },
    });

    // Award XP (+10 XP per save/use)
    await prisma.user.update({
      where: { id: user.id },
      data: { xp: { increment: 10 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PROMPT_LOG_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
