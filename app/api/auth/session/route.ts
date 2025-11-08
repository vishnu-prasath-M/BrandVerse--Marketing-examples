import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSession();

    if (!session || typeof session.userId !== "string") {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId as string },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json({ user: user || null });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json({ user: null });
  }
}

