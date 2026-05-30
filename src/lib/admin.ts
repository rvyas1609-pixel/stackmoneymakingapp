import { auth } from "@clerk/nextjs";
import { prisma } from "./prisma";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { isAdmin: true }
  });

  if (!user?.isAdmin) throw new Error("Forbidden: Admin access only");
  return userId;
}
