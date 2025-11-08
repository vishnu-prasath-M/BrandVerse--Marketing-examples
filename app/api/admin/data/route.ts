import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// API Key authentication middleware
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key") || request.headers.get("authorization")?.replace("Bearer ", "");
  const validApiKey = process.env.ADMIN_API_KEY || "your-admin-api-key-change-in-production";
  
  if (!apiKey) {
    return false;
  }
  
  return apiKey === validApiKey;
}

export async function GET(request: NextRequest) {
  try {
    // Verify API key
    if (!verifyApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing API key." },
        { status: 401 }
      );
    }

    // Get query parameters for pagination and filtering
    const searchParams = request.nextUrl.searchParams;
    const includeDetails = searchParams.get("includeDetails") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = (page - 1) * limit;

    // Fetch counts
    const [totalUsers, totalSubscribers, totalExamples, totalCategories] = await Promise.all([
      prisma.user.count(),
      prisma.subscription.count(),
      prisma.example.count(),
      prisma.category.count(),
    ]);

    // Base response with counts
    const response: any = {
      counts: {
        totalUsers,
        totalSubscribers,
        totalExamples,
        totalCategories,
      },
      timestamp: new Date().toISOString(),
    };

    // If includeDetails is true, fetch all details
    if (includeDetails) {
      const [users, subscribers, examples, categories] = await Promise.all([
        // Users (exclude password)
        prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: "desc" },
          skip: skip,
          take: limit,
        }),
        // Subscribers
        prisma.subscription.findMany({
          orderBy: { createdAt: "desc" },
          skip: skip,
          take: limit,
        }),
        // Examples with categories
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
          skip: skip,
          take: limit,
        }),
        // Categories with example counts
        prisma.category.findMany({
          include: {
            _count: {
              select: {
                examples: true,
              },
            },
          },
          orderBy: { name: "asc" },
        }),
      ]);

      // Format examples to include category names
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

      response.details = {
        users,
        subscribers,
        examples: formattedExamples,
        categories: categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          exampleCount: cat._count.examples,
          createdAt: cat.createdAt,
          updatedAt: cat.updatedAt,
        })),
      };

      response.pagination = {
        page,
        limit,
        hasMore: {
          users: users.length === limit,
          subscribers: subscribers.length === limit,
          examples: examples.length === limit,
        },
      };
    }

    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
      },
    });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin data", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
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


