import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { content, articleId } = body;

    const comment = await db.comment.create({
      data: {
        content,
        articleId
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("[COMMENT] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}