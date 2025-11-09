import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        example: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const examples = favorites.map((fav) => ({
      id: fav.example.id,
      slug: fav.example.slug,
      title: fav.example.title,
      description: fav.example.description,
      imageUrl: fav.example.imageUrl,
      monthlyRevenue: fav.example.monthlyRevenue,
      categories: fav.example.categories.map((ec) => ({
        id: ec.category.id,
        name: ec.category.name,
        slug: ec.category.slug,
      })),
    }));

    return NextResponse.json({ examples });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}





