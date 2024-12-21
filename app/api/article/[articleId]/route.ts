import { db} from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/express"; 

// 1 
// export async function GET(req: Request, { params }: { params: {articleId: string } }) {

// 2 
// À partir de Next.js 13.4, la méthode GET n'accepte pas un objet destructuré avec { params } comme deuxième argument. Elle ne supporte que l'objet requête et le contexte (Request context), qui inclut params.
// export async function GET(req: Request, context: { params: { articleId: string } }) {
// const { articleId } = context.params;

//3 
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
            },
    
        },
       
      });

      if (!article) {
        return new NextResponse("Article not found", { status: 404 });
      }

      const articleWithUser = await (async () => {
        try {
          const user = await clerkClient.users.getUser(article.userId);
          return {
            user: {
              id: user.id,
              username: user.username || null,
              imageUrl: user.imageUrl || null,
              publicMetadata : user.publicMetadata || null,
            },
          };
        } catch (error) {
          console.error(`Error when fetching the user of the article ${article.id}:`, error);
          return { user: null };
        }
      })();

      const commentsWithUsers = await Promise.all(
        article.comments.map(async (comment) => {
          try {
            const user = await clerkClient.users.getUser(comment.userId);
            return {
              ...comment,
              user: {
                id: user.id,
                username: user.username || null,
                imageUrl : user.imageUrl || null,
              },
              // user: { ...user }, // Inclut toutes les données de l'utilisateur
            };
          } catch (error) {
            console.error(`Erreur lors de la récupération de l'user pour la review ${comment.id}:`, error);
            return {
              ...comment,
              user: null,
            };
          }
        })
      );

      const articleComplete= {
        ...article,  
        user: articleWithUser.user, 
        comments : commentsWithUsers,
      };

      console.log("article detail", articleComplete)
  
        return NextResponse.json(articleComplete);
      } catch (error) {
        console.error("[RECIPES] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
      }
    }