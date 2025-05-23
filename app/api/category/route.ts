import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const main = searchParams.get("main");
  let whereClause = {};
    if (main === "true") {
        whereClause = { isPrimary: true };
    } else if (main === "false") {
        whereClause = { isPrimary: false };
    }

  try {
    // const categories = await db.category.findMany({
    //    where: {
    //             isPrimary: true,
    //         },
    //         orderBy: {
    //             number: 'asc',
    //         },
    // });
    const categories = await db.category.findMany({
      where: whereClause,
      orderBy: {
        number: 'asc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORY] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}