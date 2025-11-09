import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

const PLAN_LIMITS: Record<string, { maxDownloads: number; canDownload: boolean }> = {
  Free: { maxDownloads: 0, canDownload: false },
  Standard: { maxDownloads: 10, canDownload: true },
  Premium: { maxDownloads: Infinity, canDownload: true },
};

function canDownloadExample(plan: string, downloadsThisMonth: number): boolean {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.Free;
  if (!limits.canDownload) return false;
  return downloadsThisMonth < limits.maxDownloads;
}

function getUpgradeMessage(plan: string): string {
  if (plan === "Free") {
    return "This feature is available only for Standard or Premium users.";
  }
  if (plan === "Standard") {
    return "Download limit reached. Upgrade to Premium for unlimited access.";
  }
  return "Please upgrade your plan to access this feature.";
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please sign in to download" },
        { status: 401 }
      );
    }

    const { slug } = params;

    // Get full user data with plan
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!fullUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get example by slug
    const example = await prisma.example.findUnique({
      where: { slug },
    });

    if (!example) {
      return NextResponse.json({ error: "Example not found" }, { status: 404 });
    }

    // Check if we need to reset monthly counters
    const now = new Date();
    const lastReset = fullUser.lastResetDate || fullUser.createdAt;
    const daysSinceReset = Math.floor(
      (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24)
    );

    let downloadsThisMonth = fullUser.downloadsThisMonth || 0;
    if (daysSinceReset >= 30) {
      // Reset monthly counters
      await prisma.user.update({
        where: { id: user.id },
        data: {
          downloadsThisMonth: 0,
          commentsThisMonth: 0,
          lastResetDate: now,
        },
      });
      downloadsThisMonth = 0;
    }

    // Check plan limits
    if (!canDownloadExample(fullUser.plan, downloadsThisMonth)) {
      return NextResponse.json(
        {
          error: "Download not allowed",
          message: getUpgradeMessage(fullUser.plan),
          requiresUpgrade: true,
        },
        { status: 403 }
      );
    }

    // Update user's download count
    await prisma.user.update({
      where: { id: user.id },
      data: {
        downloadCount: fullUser.downloadCount + 1,
        downloadsThisMonth: downloadsThisMonth + 1,
      },
    });

    // Return download data (in a real app, you might generate a download link or file)
    return NextResponse.json({
      success: true,
      message: "Download started",
      downloadUrl: example.imageUrl, // For now, return the image URL
      example: {
        id: example.id,
        title: example.title,
        description: example.description,
        imageUrl: example.imageUrl,
        body: example.body,
      },
    });
  } catch (error) {
    console.error("Error processing download:", error);
    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 }
    );
  }
}

