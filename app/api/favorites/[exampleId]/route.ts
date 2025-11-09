import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

const PLAN_LIMITS: Record<string, { maxSaves: number }> = {
  Free: { maxSaves: 5 },
  Standard: { maxSaves: 20 },
  Premium: { maxSaves: Infinity },
};

function canSaveExample(plan: string, currentSaves: number): boolean {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.Free;
  return currentSaves < limits.maxSaves;
}

function getUpgradeMessage(plan: string): string {
  if (plan === "Free") {
    return "This feature is available only for Standard or Premium users.";
  }
  return "Please upgrade your plan to access this feature.";
}

export async function POST(
  request: NextRequest,
  { params }: { params: { exampleId: string } }
) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized", message: "Please sign in to continue" }, { status: 401 });
    }

    const { exampleId } = params;

    // Get full user data with plan
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        favorites: true,
      },
    });

    if (!fullUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if example exists
    const example = await prisma.example.findUnique({
      where: { id: exampleId },
    });

    if (!example) {
      return NextResponse.json({ error: "Example not found" }, { status: 404 });
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_exampleId: {
          userId: user.id,
          exampleId: exampleId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Already favorited", isFavorite: true });
    }

    // Check plan limits
    const currentSaves = fullUser.favorites.length;
    if (!canSaveExample(fullUser.plan, currentSaves)) {
      return NextResponse.json(
        { 
          error: "Limit reached", 
          message: getUpgradeMessage(fullUser.plan),
          requiresUpgrade: true 
        },
        { status: 403 }
      );
    }

    // Create favorite
    await prisma.favorite.create({
      data: {
        userId: user.id,
        exampleId: exampleId,
      },
    });

    return NextResponse.json({ message: "Added to favorites", isFavorite: true });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { exampleId: string } }
) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { exampleId } = params;

    await prisma.favorite.deleteMany({
      where: {
        userId: user.id,
        exampleId: exampleId,
      },
    });

    return NextResponse.json({ message: "Removed from favorites", isFavorite: false });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { exampleId: string } }
) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ isFavorite: false });
    }

    const { exampleId } = params;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_exampleId: {
          userId: user.id,
          exampleId: exampleId,
        },
      },
    });

    return NextResponse.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error("Error checking favorite:", error);
    return NextResponse.json({ isFavorite: false });
  }
}




