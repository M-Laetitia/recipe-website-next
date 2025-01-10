import { db} from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    try {
      // Extraire le paramètre de recherche depuis l'URL
      const keyword = request.nextUrl.searchParams.get("keyword");

      if (!keyword) {
        return new NextResponse("Missing keyword", { status: 400 });
      }

      const recipes = await db.recipe.findMany({
        where: {
          name: {
          contains: keyword, // Recherche partielle
          mode: "insensitive", // Ignore la casse
          }, 
        },
        select: {
          id: true,
          name: true,
        },
        
      });

      if (!recipes) {
        return new NextResponse("No result", { status: 404 });
      }
  
      const articles = await db.article.findMany({
        where: {
            title: {
            contains: keyword, // Recherche partielle
            mode: "insensitive", // Ignore la casse
            }, 
        },
        select: {
          id: true,
          title: true,
        },
        
      });

      const allResults = {
        recipes: recipes || [],
        articles: articles || [],
        };
  
      // console.log("results", allResults);
  
        return NextResponse.json(allResults);
      } catch (error) {
        console.error("[RECIPES] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }