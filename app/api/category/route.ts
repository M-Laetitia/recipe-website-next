import { db} from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url); //extraire les paramètres de la requête
    const main = searchParams.get("main"); 
    // const main = searchParams.get("main") === "true"; 

    let whereClause = {};
    if (main === "true") {
        whereClause = { isPrimary: true };
    } else if (main === "false") {
        whereClause = { isPrimary: false };
    }

    try {
        const categories = await db.category.findMany({
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
            // ...(main && { 
            //     where : {
            //         isPrimary: true,
            //     }
            // }),
            where: whereClause,
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
