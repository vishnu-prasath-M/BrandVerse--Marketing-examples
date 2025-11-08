import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key") || request.headers.get("authorization")?.replace("Bearer ", "");
  const validApiKey = process.env.ADMIN_API_KEY || "your-admin-api-key-change-in-production";
  return apiKey === validApiKey;
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing API key." },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = (page - 1) * limit;

    const [examples, total] = await Promise.all([
      prisma.example.findMany({
        include: {
          categories: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.example.count(),
    ]);

    const formattedExamples = examples.map((example) => ({
      id: example.id,
      slug: example.slug,
      title: example.title,
      description: example.description,
      body: example.body,
      imageUrl: example.imageUrl,
      monthlyRevenue: example.monthlyRevenue,
      categories: example.categories.map((ec) => ({
        id: ec.category.id,
        name: ec.category.name,
        slug: ec.category.slug,
      })),
      createdAt: example.createdAt,
      updatedAt: example.updatedAt,
    }));

    return NextResponse.json({
      examples: formattedExamples,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + examples.length < total,
      },
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
      },
    });
  } catch (error) {
    console.error("Error fetching examples:", error);
    return NextResponse.json(
      { error: "Failed to fetch examples" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
    },
  });
}


