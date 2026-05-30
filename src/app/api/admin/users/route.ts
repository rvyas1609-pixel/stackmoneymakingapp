import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        include: { subscription: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 403 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { email, username, password, isAdmin } = body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        clerkId: `admin_created_${Date.now()}`,
        email,
        username,
        passwordHash,
        isAdmin: !!isAdmin,
        subscription: {
          create: { tier: "free", status: "active" },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}
