import { db} from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/express"; 

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
            categories: {
              include: {
                category: { 
                  select: {
                    name: true,  
                    isPrimary : true,
                    id: true,
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
            createdAt: 'desc', 
          },
        },
        },
      });

      if (!recipe) {
        return new NextResponse("Recipe not found", { status: 404 });
      }
  

      const recipeWithUser = await (async () => {
        try {
          const user = await clerkClient.users.getUser(recipe.userId);
          return {
            
            user: {
              id: user.id,
              username: user.username || null,
            },
          };
        } catch (error) {
          console.error(`Erreur lors de la récupération de l'user pour la recette ${recipe.id}:`, error);
          return { user: null };
        }
      })();

      const reviewsWithUsers = await Promise.all(
        recipe.reviews.map(async (review) => {
          try {
            const user = await clerkClient.users.getUser(review.userId);
            return {
              ...review,
              user: {
                id: user.id,
                username: user.username || null,
              },
            };
          } catch (error) {
            console.error(`Erreur lors de la récupération de l'user pour la review ${review.id}:`, error);
            return {
              ...review,
              user: null,
            };
          }
        })
      );
  
      const recipeWithUserAndReviews = {
        ...recipe,  
        user: recipeWithUser.user, 
        reviews: reviewsWithUsers, 
      };
  
      console.log("recette détail + user + reviews user", recipeWithUserAndReviews);
  
        return NextResponse.json(recipeWithUserAndReviews);
      } catch (error) {
        console.error("[RECIPES] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }