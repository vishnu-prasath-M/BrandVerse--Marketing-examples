import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export async function POST() {
  try {
    await deleteSession();
    const response = NextResponse.json({ message: "Signed out successfully" });
    // Also clear cookie in response headers
    response.cookies.delete("session");
    return response;
  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.json(
      { error: "Failed to sign out" },
      { status: 500 }
    );
  }
}

