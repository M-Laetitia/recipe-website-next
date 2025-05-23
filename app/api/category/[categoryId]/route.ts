import { NextResponse, NextRequest} from "next/server";
import { db } from "@/lib/db";

type Props = {
  params: Promise<{ categoryId: string }>
}


export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { categoryId } = await params;

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