import { prisma } from "./prisma";

export async function resetMonthlyCounters(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return;

  const now = new Date();
  const lastReset = user.lastResetDate || user.createdAt;
  const daysSinceReset = Math.floor(
    (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceReset >= 30) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        downloadsThisMonth: 0,
        commentsThisMonth: 0,
        lastResetDate: now,
      },
    });
  }
}


