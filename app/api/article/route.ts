import { db } from "@/lib/db"
import { NextResponse } from "next/server";
// import { ClerkExpressWithAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express"; 

export async function GET() {
    try {
        const articles = await db.article.findMany({
            orderBy : {
                createdAt: 'desc'
            },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                },
            }
        })

        // 2. rajouter aux articles les infos de l'user depuis Clerk
        // Promise.all est utilisé pour exécuter plusieurs promesses en parallèle. Cela permet de récupérer les informations utilisateur de Clerk pour chaque article en simultané, au lieu de le faire séquentiellement (un après l'autre).
        const articleWithUser = await Promise.all(
            // mpa pour itérer sur les articles : à chaque itération, une promesse asynchrone est retournée. Cela signifie que chaque article est associé à une promesse qui va récupérer l'utilisateur associé via clerkClient.users.getUser(article.userId).
            articles.map(async (article) => {
                try {
                    // 3. Récupérer l'user de Clerk via userId
                    const user = await clerkClient.users.getUser(article.userId); // Remplacer par l'ID user de Clerk
                    // 4. Retourner l'article avec les données user
                    return {
                        ...article,
                        user: {
                            id: user.id,
                            username: user.username, 
                        }
                    };
                } catch (error) {
                    console.log(`Erreur lors de la récupération de l'user pour l'article ${article.id}:`, error);
                    return { ...article, user: null };
                }
            })
        );

        console.log('articles all', articleWithUser)
        return NextResponse.json(articleWithUser)

    } catch (error) {
        console.log("[ARTICLES]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { title, content} = body;


        // Validation des champs
        if (!title || typeof title !== "string") {
            return NextResponse.json({ message: "Invalid title article" }, { status: 400 });
        }

        if (!content || typeof content !== "string") {
            return NextResponse.json({ message: "Invalid content article" }, { status: 400 });
        }

        // ajouter le slug 
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        const userId= 'user_2q5MoDx5nUHSVNwhbg7vrmJ5jAC';


        // Création de l'article
        const newArticle = await db.article.create({
            data: { 
                title, 
                content, 
                slug, 
                userId 
            },
        });

        return NextResponse.json(newArticle, { status:201 });

    } catch (error) {
        console.log("Error", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}