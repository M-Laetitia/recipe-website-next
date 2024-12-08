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
            },
            include: {
                categories: {
                    select: {
                        recipeId: true, 
                    }
                },
            },
        });

        // Calculer le nb de recettes par catégories
        const categoriesWithRecipeCount  = categories.map(category => ({
            // spread operator copie toutes les propriétés de l'objet category dans un nouveau tableau
            ...category,
            recipeCount: category.categories.length,
        }));
        return NextResponse.json(categoriesWithRecipeCount)
    } catch (error) {
        console.error("[CATEGORIES] Error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
