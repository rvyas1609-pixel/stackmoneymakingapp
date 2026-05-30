import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { isAdmin: true }
  });

  if (!user?.isAdmin) throw new Error("Forbidden: Admin access only");
  return userId;
}
