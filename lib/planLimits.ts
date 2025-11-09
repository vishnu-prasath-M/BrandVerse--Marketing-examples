export type Plan = "Free" | "Standard" | "Premium";

export interface PlanLimits {
  maxSaves: number;
  maxDownloads: number;
  maxCommentsPerDay: number;
  canDownload: boolean;
  canComment: boolean;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  Free: {
    maxSaves: 5,
    maxDownloads: 0,
    maxCommentsPerDay: 5,
    canDownload: false,
    canComment: true,
  },
  Standard: {
    maxSaves: 20,
    maxDownloads: 10,
    maxCommentsPerDay: 50,
    canDownload: true,
    canComment: true,
  },
  Premium: {
    maxSaves: Infinity,
    maxDownloads: Infinity,
    maxCommentsPerDay: Infinity,
    canDownload: true,
    canComment: true,
  },
};

export function getPlanLimits(plan: string): PlanLimits {
  return PLAN_LIMITS[plan as Plan] || PLAN_LIMITS.Free;
}

export function canSaveExample(plan: string, currentSaves: number): boolean {
  const limits = getPlanLimits(plan);
  return currentSaves < limits.maxSaves;
}

export function canDownloadExample(plan: string, downloadsThisMonth: number): boolean {
  const limits = getPlanLimits(plan);
  if (!limits.canDownload) return false;
  return downloadsThisMonth < limits.maxDownloads;
}

export function canComment(plan: string, commentsToday: number): boolean {
  const limits = getPlanLimits(plan);
  if (!limits.canComment) return false;
  return commentsToday < limits.maxCommentsPerDay;
}

export function getUpgradeMessage(plan: string, action?: "save" | "download" | "comment"): string {
  if (plan === "Free") {
    return "This feature is available only for Standard or Premium users.";
  }
  if (plan === "Standard" && action === "download") {
    return "Download limit reached. Upgrade to Premium for unlimited access.";
  }
  return "Please upgrade your plan to access this feature.";
}

