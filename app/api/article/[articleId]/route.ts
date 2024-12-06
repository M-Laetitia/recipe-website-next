import { db} from "@/lib/db"
import { NextResponse } from "next/server";


// À partir de Next.js 13.4, la méthode GET n'accepte pas un objet destructuré avec { params } comme deuxième argument. Elle ne supporte que l'objet requête et le contexte (Request context), qui inclut params.
// export async function GET(req: Request, { params }: { params: {articleId: string } }) {
  export async function GET(req: Request, context: { params: { articleId: string } }) {
    const {articleId } = context.params; 
      try {
      const article = await db.article.findUnique({
        where: {
          id: articleId, 
        },
        include: {
            user: {  
                select: {
                  username: true,  
                },
            },
            tags: {
              include: {
                tag: { 
                  select: {
                    name: true,  
                  },
                },
              },
            },
            comments: {
                orderBy: {
                  createdAt: 'desc', 
                },
                include: {
                    user: {  
                        select: {
                          username: true,  
                        },
                    }
                }
            },
    
        },
       
      });
  

      console.log("article detail", article)
  
        return NextResponse.json(article);
      } catch (error) {
        console.error("[RECIPES] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }