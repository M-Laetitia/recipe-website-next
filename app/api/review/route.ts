import { db } from "@/lib/db"
import { NextResponse } from "next/server";
// import { ClerkExpressWithAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express"; 

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { title, content, recipeId} = body;

        // Validation des champs
        if (!title || typeof title !== "string") {
            return new NextResponse("Title is required", {status: 400})
        }
        if (!content || typeof content !== "string") {
            return new NextResponse("Content is required", {status: 400})
        }
        if (!recipeId || typeof recipeId !== "string") {
            return new NextResponse("Recipe ID is required", { status: 400 });
        }

        const userId= 'user_2q5MoDx5nUHSVNwhbg7vrmJ5jAC';

        // Ajout de la review
        const NewReview = await db.review.create({
            data: {
                title,
                content,
                userId,
                recipe: {
                    connect: { id: recipeId }
                }
            }
        });

        return NextResponse.json(NewReview, { status:201 });
    } catch (error) {
        console.log("[REVIEW]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}