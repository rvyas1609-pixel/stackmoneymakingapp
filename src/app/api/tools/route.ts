import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const tools = await prisma.aITool.findMany({
      where: { published: true },
      orderBy: { rating: "desc" },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error("[TOOLS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
