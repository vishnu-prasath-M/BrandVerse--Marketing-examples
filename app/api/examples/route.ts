import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const take = parseInt(searchParams.get("take") || "9", 10);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: any = {};

    // Build filter conditions
    const conditions: any[] = [];

    // Category filter
    if (category) {
      conditions.push({
        categories: {
          some: {
            category: {
              slug: category,
            },
          },
        },
      });
    }

    // Search filter
    if (search) {
      conditions.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    // Combine all conditions with AND
    if (conditions.length > 0) {
      where.AND = conditions;
    }

    // Cursor pagination
    const cursorCondition = cursor ? { id: cursor } : undefined;

    // Log query for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("Querying examples with filters:", { where, cursor, take });
    }

    const examples = await prisma.example.findMany({
      where,
      take: take + 1, // Take one extra to check if there's more
      cursor: cursorCondition,
      skip: cursor ? 1 : 0,
      orderBy: { createdAt: "desc" },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (process.env.NODE_ENV === "development") {
      console.log(`Found ${examples.length} examples`);
    }

    const hasMore = examples.length > take;
    const examplesToReturn = hasMore ? examples.slice(0, take) : examples;
    const nextCursor = hasMore ? examplesToReturn[examplesToReturn.length - 1].id : null;

    const formattedExamples = examplesToReturn.map((example) => ({
      id: example.id,
      slug: example.slug,
      title: example.title,
      description: example.description,
      body: example.body,
      imageUrl: example.imageUrl,
      monthlyRevenue: example.monthlyRevenue,
      createdAt: example.createdAt.toISOString(),
      updatedAt: example.updatedAt.toISOString(),
      categories: example.categories.map((ec) => ({
        id: ec.category.id,
        name: ec.category.name,
        slug: ec.category.slug,
      })),
    }));

    return NextResponse.json({
      examples: formattedExamples,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching examples:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { 
        error: "Failed to fetch examples",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

