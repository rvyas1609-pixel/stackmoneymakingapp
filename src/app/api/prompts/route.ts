import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export async function GET(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const packs = await prisma.promptPack.findMany({
      where: { published: true },
      include: {
        prompts: category ? { where: { category } } : true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(packs);
  } catch (error) {
    console.error("[PROMPTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
