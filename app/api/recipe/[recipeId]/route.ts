import { db} from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: {recipeId: string } }) {
    const {recipeId } = params; // Get the recipe id from the params
    console.log("Recipe ID:",recipeId);
      try {
  

      const recipe = await db.recipe.findUnique({
        where: {
          id: recipeId, 
        },
        include: {
            user: {  
                select: {
                  username: true,  
                },
            },
            categories: {
              include: {
                category: { 
                  select: {
                    name: true,  
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
                      name: true,  
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
        console.error("[RECIPES] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }