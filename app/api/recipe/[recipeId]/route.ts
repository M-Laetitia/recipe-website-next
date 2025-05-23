import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: any, context: { params: { recipeId: string } }) {
  try {
    const { recipeId } = context.params;

    const recipe = await db.recipe.findUnique({
      where: { id: recipeId },
    });

    return recipe
      ? NextResponse.json(recipe)
      : new NextResponse("Recipe not found", { status: 404 });
  } catch (error) {
    console.error("[RECIPE] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}