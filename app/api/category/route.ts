import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const main = searchParams.get("main");

  try {
    const categories = await db.category.findMany({
      where: {
        isMain: main === "true"
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}