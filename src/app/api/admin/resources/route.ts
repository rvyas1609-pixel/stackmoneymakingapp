import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    await requireAdmin();
    const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(resources);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 403 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = await req.json();
    const resource = await prisma.resource.create({ data });
    return NextResponse.json(resource);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const { id, ...data } = await req.json();
    const updated = await prisma.resource.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return new NextResponse("ID required", { status: 400 });

    await prisma.resource.delete({ where: { id } });
    return new NextResponse("Deleted", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
