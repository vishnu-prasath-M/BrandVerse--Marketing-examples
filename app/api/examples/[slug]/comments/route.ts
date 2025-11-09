import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { z } from "zod";

const PLAN_LIMITS: Record<string, { maxCommentsPerDay: number }> = {
  Free: { maxCommentsPerDay: 5 },
  Standard: { maxCommentsPerDay: 50 },
  Premium: { maxCommentsPerDay: Infinity },
};

function canComment(plan: string, commentsToday: number): boolean {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.Free;
  return commentsToday < limits.maxCommentsPerDay;
}

function getUpgradeMessage(plan: string): string {
  if (plan === "Free") {
    return "This feature is available only for Standard or Premium users.";
  }
  return "Please upgrade your plan to access this feature.";
}

const commentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please sign in to comment" },
        { status: 401 }
      );
    }

    const { slug } = params;
    const body = await request.json();
    const { text } = commentSchema.parse(body);

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

    let commentsThisMonth = fullUser.commentsThisMonth;
    if (daysSinceReset >= 30) {
      // Reset monthly counters
      commentsThisMonth = 0;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          commentsThisMonth: 0,
          downloadsThisMonth: 0,
          lastResetDate: now,
        },
      });
    }

    // Check plan limits for comments
    // For daily limit, we'll check comments from last 24 hours
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const commentsToday = await prisma.comment.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: oneDayAgo,
        },
      },
    });

    if (!canComment(fullUser.plan, commentsToday)) {
      return NextResponse.json(
        {
          error: "Limit reached",
          message: getUpgradeMessage(fullUser.plan),
          requiresUpgrade: true,
        },
        { status: 403 }
      );
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        userId: user.id,
        exampleId: example.id,
        text,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Update user's comment count
    await prisma.user.update({
      where: { id: user.id },
      data: {
        commentsThisMonth: commentsThisMonth + 1,
      },
    });

    return NextResponse.json({
      comment: {
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          name: comment.user.name || comment.user.email,
          email: comment.user.email,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get example by slug
    const example = await prisma.example.findUnique({
      where: { slug },
    });

    if (!example) {
      return NextResponse.json({ error: "Example not found" }, { status: 404 });
    }

    // Get all comments for this example
    const comments = await prisma.comment.findMany({
      where: {
        exampleId: example.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      comments: comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          name: comment.user.name || comment.user.email,
          email: comment.user.email,
        },
      })),
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

