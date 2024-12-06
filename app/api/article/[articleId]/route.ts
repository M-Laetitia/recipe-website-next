import { db} from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: {articleId: string } }) {
    const {articleId } = params; 
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
        // console.error("[RECIPES] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }