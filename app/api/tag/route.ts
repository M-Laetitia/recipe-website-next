// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// fonction `POST`, qui gère les requêtes HTTP de type POST. Cette fonction sera appelée lorsque la route associée à `/api/tag` recevra une requête POST
export async function POST(req: Request) {
    try {
        // On récupère le corps de la requête (request body) au format JSON avec `req.json()`
        // La fonction `json()` est asynchrone car le corps de la requête peut être volumineux, donc on utilise `await` pour attendre la réponse
        // body est un objet js, et il contient toutes les données envoyées avec la requête,
        const body = await req.json();

        // On extrait la propriété `name` du corps de la requête
        //  utilise la déstructuration d'objet pour extraire spécifiquement la propriété name de l'objet body = const name = body.name;
        // si plusieurs propriétés : const { name, description } = body;
        const { name } = body;
  

        // Vérification de la validité du `name` :
        // - Si `name` est absent ou falsy (null, undefined, etc.), ou si ce n'est pas une chaîne de caractères (`typeof name !== "string"`)
        // - ou si la longueur du `name` est inférieure à 3 caractères
        if (!name || typeof name !== "string" || name.length < 3) {
            // Si une des conditions échoue, une réponse JSON est renvoyée avec un message d'erreur et un statut HTTP 400 (Bad Request)
            return NextResponse.json({ message: "Invalid tag name" }, { status: 400 });
        }
  
        // Si toutes les conditions sont validées, un nouveau tag est créé dans la base de données avec la méthode `db.tag.create()`.
        // `data` contient les données à insérer, ici le `name`.
        const newTag = await db.tag.create({
            data: { name },
        });
    
        // Si l'ajout du tag a réussi, une réponse JSON est renvoyée avec les informations du tag nouvellement créé et un statut HTTP 201 (Created).
        return NextResponse.json(newTag, { status: 201 });

        
        } catch (error) {
         // Si une erreur se produit dans le bloc `try` l'erreur est capturée et affichée dans la console.
        console.error("Error:", error);
        // Une réponse JSON avec un message d'erreur générique "Internal Server Error" est renvoyée avec un statut HTTP 500 (Internal Server Error).
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
      const tags = await db.tag.findMany();
      return NextResponse.json(tags);
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
}