import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, image } = body;

    const article = await db.article.create({
      data: { title, content, image }
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("[ARTICLE CREATE] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}