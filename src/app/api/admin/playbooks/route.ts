import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    await requireAdmin();
    const playbooks = await prisma.playbook.findMany({
      include: { steps: true },
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(playbooks);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 403 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = await req.json();
    const playbook = await prisma.playbook.create({
      data: {
        ...data,
        steps: {
          create: data.steps || []
        }
      }
    });
    return NextResponse.json(playbook);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const { id, steps, ...data } = await req.json();

    // Simple update: delete old steps and create new ones if provided
    if (steps) {
      await prisma.step.deleteMany({ where: { playbookId: id } });
    }

    const updated = await prisma.playbook.update({
      where: { id },
      data: {
        ...data,
        steps: steps ? { create: steps } : undefined
      }
    });
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

    await prisma.playbook.delete({ where: { id } });
    return new NextResponse("Deleted", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
