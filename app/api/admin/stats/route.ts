import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key") || request.headers.get("authorization")?.replace("Bearer ", "");
  const validApiKey = process.env.ADMIN_API_KEY || "your-admin-api-key-change-in-production";
  return apiKey === validApiKey;
}

export async function GET(request: NextRequest) {
  try {
    // Verify API key for security
    if (!verifyApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing API key." },
        { status: 401 }
      );
    }

    const [totalUsers, totalSubscribers, totalExamples, totalCategories] = await Promise.all([
      prisma.user.count(),
      prisma.subscription.count(),
      prisma.example.count(),
      prisma.category.count(),
    ]);

    return NextResponse.json({
      totalUsers,
      totalSubscribers,
      totalExamples,
      totalCategories,
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
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



