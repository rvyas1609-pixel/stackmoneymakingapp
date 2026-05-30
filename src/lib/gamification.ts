import { prisma } from "./prisma";

export const XP_RULES = {
  COMPLETE_STEP: 50,
  COMPLETE_PLAYBOOK: 500,
  LOG_INCOME: 100,
  USE_AI_COACH: 25,
  DAILY_LOGIN: 50,
  STREAK_7_DAY: 200,
  SAVE_PROMPT: 10,
  DOWNLOAD_RESOURCE: 15,
};

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: "Hustler" },
  { level: 2, xp: 500, title: "Grinder" },
  { level: 3, xp: 1500, title: "Builder" },
  { level: 4, xp: 3500, title: "Operator" },
  { level: 5, xp: 7000, title: "CEO" },
  { level: 6, xp: 12000, title: "Legend" },
];

export async function awardXP(userId: string, amount: number, reason: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true, level: true }
  });

  if (!user) return;

  const newXP = user.xp + amount;
  let newLevel = user.level;
  let newTitle = "Hustler";

  // Check for level up
  for (const threshold of LEVEL_THRESHOLDS) {
    if (newXP >= threshold.xp) {
      newLevel = threshold.level;
      newTitle = threshold.title;
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: newXP,
      level: newLevel,
      levelTitle: newTitle,
    }
  });

  // Log bonus history
  await prisma.referralBonus.create({
    data: { userId, reason, amount }
  });

  return { leveledUp: newLevel > user.level, newLevel, newXP };
}

export async function checkAchievements(userId: string) {
  // Add logic to award badges based on milestones
  // e.g., if totalIncome > 1000, award "First $1K" badge
}
