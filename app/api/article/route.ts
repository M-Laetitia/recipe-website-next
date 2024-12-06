import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const articles = await db.article.findMany({
            orderBy : {
                createdAt: 'desc'
            },
            include: {
                user: true,

                tags: {
                    include: {
                        tag: true
                    }
                },
            }

        })

        console.log('articles all', articles)
        return NextResponse.json(articles)

    } catch (error) {
        console.log("[ARTICLES]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}