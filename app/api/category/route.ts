import { db} from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await db.category.findMany({
            where: {
                isPrimary: true,
            },
            orderBy: {
                number: 'asc',
            }
          });
        return NextResponse.json(categories)
    } catch (error) {
        console.error("[CATEGORIES] Error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
