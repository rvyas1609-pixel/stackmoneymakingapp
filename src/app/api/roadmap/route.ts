import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const roadmaps = await prisma.roadmap.findMany({
      where: { published: true },
      include: { milestones: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json(roadmaps);
  } catch (error) {
    console.error("[ROADMAP_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
