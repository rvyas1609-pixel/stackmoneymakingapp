import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getOrCreateUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    include: {
      subscription: true,
      achievements: true,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.username || clerkUser.firstName || "stacker",
        displayName: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        profileImage: clerkUser.imageUrl,
        subscription: {
          create: {
            tier: "free",
            status: "active",
          },
        },
      },
      include: {
        subscription: true,
        achievements: true,
      },
    });
  }

  return user;
}
