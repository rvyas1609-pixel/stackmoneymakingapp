import { prisma } from "./prisma";
import { isYesterday, isToday, differenceInDays } from "date-fns";

export async function checkAndUpdateStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastActive: true, streakDays: true, longestStreak: true },
  });

  if (!user) return null;

  const now = new Date();
  const lastActive = user.lastActive;

  // 1. If never active, set today
  if (!lastActive) {
    await prisma.user.update({
      where: { id: userId },
      data: { lastActive: now, streakDays: 1, longestStreak: 1 },
    });
    return { streakDays: 1, message: "First day started!" };
  }

  // 2. If active today, do nothing
  if (isToday(lastActive)) {
    return { streakDays: user.streakDays, message: "Streak maintained." };
  }

  // 3. If active yesterday, increment streak
  if (isYesterday(lastActive)) {
    const newStreak = user.streakDays + 1;
    const newLongest = Math.max(newStreak, user.longestStreak);

    // Award XP (Rule: 50 XP per day, 200 at 7-day streak)
    let xpAward = 50;
    if (newStreak === 7) xpAward += 200;

    await prisma.user.update({
      where: { id: userId },
      data: {
        lastActive: now,
        streakDays: newStreak,
        longestStreak: newLongest,
        xp: { increment: xpAward }
      },
    });
    return { streakDays: newStreak, message: `Streak increased! +${xpAward} XP` };
  }

  // 4. If more than 1 day missed, reset streak to 1
  await prisma.user.update({
    where: { id: userId },
    data: { lastActive: now, streakDays: 1 },
  });

  return { streakDays: 1, message: "Your streak was broken. New streak started!" };
}
