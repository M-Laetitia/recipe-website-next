import { db} from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";


type Props = {
  params: Promise<{ articleId: string }>
}


export async function GET(request: NextRequest, { params }: Props) {
      try {
        const { articleId } = await params;
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