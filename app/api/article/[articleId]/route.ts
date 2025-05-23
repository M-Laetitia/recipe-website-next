import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClerkClient } from "@clerk/backend";

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing CLERK_SECRET_KEY in environment variables.");
}

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

type Props = {
  params: Promise<{ articleId: string }>
}


export async function GET(request: NextRequest,  { params }: Props) {
  try {
    const { articleId } = await params;

    const article = await db.article.findUnique({
      where: { id: articleId },
      include: {
        tags: {
          include: {
            tag: { select: { name: true } }
          }
        },
        comments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!article) {
      return new NextResponse("Article not found", { status: 404 });
    }

    const user = await clerk.users.getUser(article.userId).catch(() => null);

    const commentsWithUsers = await Promise.all(
      article.comments.map(async (comment) => {
        const user = await clerk.users.getUser(comment.userId).catch(() => null);
        return { ...comment, user };
      })
    );

    const articleComplete = {
      ...article,
      user: user ? {
        id: user.id,
        username: user.username ?? null,
        imageUrl: user.imageUrl ?? null,
        publicMetadata: user.publicMetadata ?? null,
      } : null,
      comments: commentsWithUsers,
    };

    return NextResponse.json(articleComplete);

  } catch (error) {
    console.error("[ARTICLE] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}