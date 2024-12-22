import { db } from "@/lib/db"
import { NextResponse } from "next/server";
// import { ClerkExpressWithAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express"; 

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {content, articleId} = body;

        // Validation des champs
        if (!content || typeof content !== "string") {
            return new NextResponse("Content is required", {status: 400})
        }
        if (!articleId || typeof articleId !== "string") {
            return new NextResponse("Recipe ID is required", { status: 400 });
        }

        const userId= 'user_2q5MoDx5nUHSVNwhbg7vrmJ5jAC';

        // Ajout de la review
        const NewComment= await db.comment.create({
            data: {
                content,
                userId,
                article: {
                    connect: { id: articleId }
                }
            }
        });

        return NextResponse.json(NewComment, { status:201 });
    } catch (error) {
        console.log("[COMMENT]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}