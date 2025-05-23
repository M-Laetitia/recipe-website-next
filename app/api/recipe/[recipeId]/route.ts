import { db} from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ recipeId: string }>
}


export async function GET(request: NextRequest, { params }: Props) {

    try {
      const { recipeId } = await params;
      const recipe = await db.recipe.findUnique({
        where: {
          id: recipeId, 
        },
        include: {
            // user: {  
            //     select: {
            //       username: true,  
            //     },
            // },
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
            // include: {
            //     user: {  // Inclusion de l'utilisateur
            //         select: {
            //           username: true,  // Sélectionne uniquement l'username
            //         },
            //     }
            // }
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