
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // types de requête API : GET, POST, PUT, OPTIONS, PATCH, DELETE, HEAD, CONNECT, TRACE

    const { searchParams } = new URL(req.url); //extraire les paramètres de la requête
    const limit = searchParams.get("limit");  // Récupère le paramètre `limit` (ex. ?limit=5) / si limit est défini, la clause take est ajoutée pour limiter le nombre de résultats.
    const category = searchParams.get("category");
    //fetch('/api/recipes')
    // fetch('/api/recipes?limit=5')
    //fetch('/api/recipes?category=dessert')
    // fetch('/api/recipes?limit=5&category=dessert')

    console.log("Paramètres reçus:", { limit, category });

    try {
        const recipes = await db.recipe.findMany({
            orderBy: {
                createdAt: 'desc' 
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },

                reviews: {
                    select: {
                        content: true  // Sélectionne uniquement le champ 'text'
                    }
                }
            },
            // Toujours inclure la base (comme 10) par précaution, même si ici : un paramètre de requête HTTP la chaîne sera très probablement déjà en base 10. Cela évite toute ambiguïté et est considéré comme une bonne pratique.
            ...(limit && { take: parseInt(limit, 10) }), // Limite si `limit` est défini
            ...(category && { // Filtrer par catégorie si définie
                where: {
                    categories: {
                        some: {
                            category: {
                                name: {
                                equals: category,
                                mode: 'insensitive'  // Ignorer la casse
                                }
                            },
                        },
                    },
                },
            }),

        })

        console.log("recipes / categ / limite",recipes )
        return NextResponse.json(recipes)

    } catch (error) {
        // ce console log ne s'affiche pas dans le navigateur (pour cela il faudrait qu'on soit dans un composant client) or ici on est côté serveur mais dans le terminal dans lequel on est en train d'exécuter le projet 
        // SSR
        console.log("[RECIPES]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}