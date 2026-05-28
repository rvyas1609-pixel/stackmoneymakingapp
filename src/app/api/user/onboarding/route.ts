import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { skill, hours, goal } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        primarySkill: skill,
        weeklyHours: parseInt(hours),
        incomeGoal: parseInt(goal),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[ONBOARDING_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
