import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const example = await prisma.example.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!example) {
      return NextResponse.json({ error: "Example not found" }, { status: 404 });
    }

    // Get related examples (same category, excluding current)
    const categoryIds = example.categories.map((ec) => ec.categoryId);
    const relatedExamples = await prisma.example.findMany({
      where: {
        id: { not: example.id },
        categories: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
      },
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Get next and previous examples
    const [nextExample, prevExample] = await Promise.all([
      prisma.example.findFirst({
        where: {
          createdAt: { gt: example.createdAt },
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.example.findFirst({
        where: {
          createdAt: { lt: example.createdAt },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const formattedExample = {
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
      related: relatedExamples.map((ex) => ({
        id: ex.id,
        slug: ex.slug,
        title: ex.title,
        description: ex.description,
        imageUrl: ex.imageUrl,
        monthlyRevenue: ex.monthlyRevenue,
        categories: ex.categories.map((ec) => ({
          id: ec.category.id,
          name: ec.category.name,
          slug: ec.category.slug,
        })),
      })),
      next: nextExample
        ? { slug: nextExample.slug, title: nextExample.title }
        : null,
      previous: prevExample
        ? { slug: prevExample.slug, title: prevExample.title }
        : null,
    };

    return NextResponse.json(formattedExample);
  } catch (error) {
    console.error("Error fetching example:", error);
    return NextResponse.json(
      { error: "Failed to fetch example" },
      { status: 500 }
    );
  }
}

