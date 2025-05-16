import { db} from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";


// export : rend cette fonction accessible depuis l'extérieur
// async : indique que la fonction retourne une Promise. Cela permet d'utiliser await pour gérer les appels asynchrones.
// function GET : Nom de la fonction qui correspond à la méthode HTTP GET. Next.js associera cette fonction à un appel GET à la route définie (/api/category/[id]/recipes).

//req: Request : L'objet req représente la requête entrante : Request est un type standard utilisé pour décrire les objets requêtes dans les environnements basés sur fetch - Il contient des informations comme l'URL, les headers, le corps de la requête, etc. Ici, il n'est pas utilisé, mais il est nécessaire pour suivre la signature correcte d'une API Next.js.
// params : Objet contenant les paramètres dynamiques de la route. Ici, c'est l'ID de la catégorie
// id: string : params.id est défini comme une chaîne de caractères (string). Cela correspond à l'ID extrait de l'URL dynamique ([id] dans /api/category/[id]/recipes).

type Props = {
  params:{ categoryId: string }
};



export async function GET(request: NextRequest, { params }: Props) {
  // const { categoryId } = params; // Get the category ID from the params

    try {
    const { categoryId } = await params;
    // Recherche des recettes associées à cette catégorie
    const recipes = await db.categoryRecipe.findMany({
      where: { categoryId: categoryId },
      include: {
        recipe: true,  // Inclut les détails de la recette liée
      },
    });

    // console.log("recettes", recipes);

      return NextResponse.json(recipes);
    } catch (error) {
      console.error("[RECIPES] Error:", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }