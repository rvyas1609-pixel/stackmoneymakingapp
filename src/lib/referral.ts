import { prisma } from "./prisma";
import crypto from "crypto";

export function generateReferralCode() {
  return `STACK-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
}

export async function trackReferral(referralCode: string, newUserId: string) {
  const referrer = await prisma.user.findUnique({
    where: { referralCode },
  });

  if (!referrer) return null;

  return await prisma.user.update({
    where: { id: newUserId },
    data: { referredById: referrer.id },
  });
}

export async function awardReferralBonus(referrerId: string) {
  // Rule: 500 XP bonus
  await prisma.user.update({
    where: { id: referrerId },
    data: { xp: { increment: 500 } },
  });

  await prisma.referralBonus.create({
    data: {
      userId: referrerId,
      reason: "Successful Referral",
      amount: 500,
    },
  });

  // Check tiers for extension logic
  const referralCount = await prisma.user.count({
    where: { referredById: referrerId },
  });

  // If 3 referrals, could add logic here for 1 month free extension
  // ...
}
