import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { completedSteps } = await req.json();

    const progress = await prisma.playbookProgress.upsert({
      where: {
        userId_playbookId: {
          userId: user.id,
          playbookId: params.id,
        },
      },
      update: {
        completedSteps: completedSteps,
        isCompleted: false, // In a real app, check if steps === total
      },
      create: {
        userId: user.id,
        playbookId: params.id,
        completedSteps: completedSteps,
      },
    });

    // Award XP if completed a step (+50 XP)
    await prisma.user.update({
      where: { id: user.id },
      data: { xp: { increment: 50 } },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("[PLAYBOOK_PROGRESS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
