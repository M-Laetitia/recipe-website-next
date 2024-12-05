
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    // types de requête API : GET, POST, PUT, OPTIONS, PATCH, DELETE, HEAD, CONNECT, TRACE
    try {
        const recipes = await db.recipe.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                // comments : true // récupérer tout ce qu'il y a dans commentaire

                reviews: {
                    select: {
                        content: true  // Sélectionne uniquement le champ 'text'
                    }
                }
                
            }
        })
 

        // return une réponse au format Json
        console.log("liste recette", recipes)
        return NextResponse.json(recipes)

    } catch (error) {
        // ce console log ne s'affiche pas dans le navigateur (pour cela il faudrait qu'on soit dans un composant client) or ici on est côté serveur mais dans le terminal dans lequel on est en train d'exécuter le projet 
        // SSR
        console.log("[ARTICLES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}