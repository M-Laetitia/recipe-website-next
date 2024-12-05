import { db} from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: {recipeId: string } }) {
    const {recipeId } = params; // Get therecipe ID from the params
    console.log("Recipe ID:",recipeId);
      try {
  
      // Recherche des recettes associées à cette catégorie
      const recipe = await db.recipe.findUnique({
        where: {
          id: recipeId, // Recherche la recette par son ID
        },
        include: {
            user: {  // Inclusion de l'utilisateur
                select: {
                  username: true,  // Sélectionne uniquement l'username
                },
            },
            categories: {
              include: {
                category: { 
                  select: {
                    name: true,  // sélectionner uniquement le nom de la catégorie
                  },
                },
              },
            },
            ingredients: {
                include: {
                    ingredient: {  
                        select: {
                          name: true,  
                        },
                    }
                }
            },
            tools: {
                include: {
                  tool: { 
                    select: {
                      name: true,  // sélectionner uniquement le nom de la catégorie
                    },
                  },
                },
              },
        //   steps: true,  // tout inclure
          steps: {
            orderBy: {
              number: 'asc', // Tri des steps par 'number' en ordre croissant
            },
        },
        reviews: {
            orderBy: {
              createdAt: 'desc', // Tri des steps par 'number' en ordre croissant
            },
            include: {
                user: {  // Inclusion de l'utilisateur
                    select: {
                      username: true,  // Sélectionne uniquement l'username
                    },
                }
            }
        },
        },
      });
  
  
      console.log("recette détail", recipe);
  
        return NextResponse.json(recipe);
      } catch (error) {
        // console.error("[RECIPES] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }