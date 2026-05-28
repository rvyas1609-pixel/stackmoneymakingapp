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
    const slug = searchParams.get("slug");

    if (slug) {
      const playbook = await prisma.playbook.findUnique({
        where: { slug, published: true },
        include: { steps: { orderBy: { order: "asc" } } },
      });
      return NextResponse.json(playbook);
    }

    const playbooks = await prisma.playbook.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(playbooks);
  } catch (error) {
    console.error("[PLAYBOOKS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
