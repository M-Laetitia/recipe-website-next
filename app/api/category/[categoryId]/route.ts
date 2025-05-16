import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: any, context: { params: { categoryId: string } }) {
  try {
    const { categoryId } = context.params;

    const recipes = await db.categoryRecipe.findMany({
      where: { categoryId },
      include: { recipe: true },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("[CATEGORY RECIPES] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}