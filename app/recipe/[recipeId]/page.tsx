'use client'
import { formatDate } from '@/lib/utils'
import { getCldImageUrl } from 'next-cloudinary';
import React, { useEffect, useState } from 'react'
import { jsPDF } from "jspdf"; 
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'


// const RecipePage =  ({ params }: { params: { recipeId: string }}) => {
//     const [recipe, setRecipe] = useState<any | null>(null) 
// Initialisation avec null pour indiquer qu'il n'y a pas encore de recette

type Recipe = {
    id: string;
    name: string;
    instruction: string;
    createdAt: Date; 
    duration: number;
    difficulty: number;
    image: string;
    ingredients: [];
    tools: [];
    steps: [];
    reviews: [];
    categories: [];
    user: User;
};

type Ingredient = {
    id: string;
    quantity: number;
    unit: string;
    ingredient: {
        name: string;
    };
};

type Review = {
    title: string;
    id: string;
    content: string;
    createdAt: Date;
    user : User;
  };

type Tool = {
    id: string;
    tool: {
        name: string;
    };
};

type Category = {
    id: string;
    name: string;
    
};
type Step = {
    id: string;
    number: string;
    duration: number;
    description: string;
    title: string;
};

type User = {
    id: string,
    username: string,
}

type Props = {
    params: Promise<{ recipeId: string }>
}

const RecipePage = ({ params }: Props)  => {
    const [recipe, setRecipe] = useState<Recipe | null>(null); // Initialisation avec null
    const [recipeId, setRecipeId] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipeId = async () => {
          const resolvedParams = await params;
          setRecipeId(resolvedParams.recipeId); 
        };
        
        fetchRecipeId();
      }, [params]); 

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipe/${recipeId}`);
            const data = await response.json();
            setRecipe(data);
        };

        if (recipeId) {
        fetchRecipe();
        }
        // console.log(`/api/recipe/${recipeId}`);
    }, [recipeId]);
    // }, [params.recipeId]);

    const generatePDF = () => {
        if (recipe) {
            const doc = new jsPDF();
        
            //ajouter le titre de la recette
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(18);
            doc.text(recipe.name, 20, 20);
        
            // aouter l'image de la recette
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(12);
            doc.text(`Description: ${recipe.instruction}`, 20, 30);
        
            // ajouter d'autres détails 
            doc.text("Ingrédients:", 20, 40);
            let yPosition = 50; // Position Y pour les lignes suivantes

            recipe.ingredients.map((ingredient: Ingredient, index: number) => {
            doc.text(`${index + 1}. ${ingredient.ingredient.name}`, 20, yPosition);
            yPosition += 10; // Ajouter un espace entre les lignes
            });
        
            // Sauvegarder le PDF
            doc.save(`${recipe.name}.pdf`);
        } else {
            console.log("Recipe is null");
        }
    
    }
    // if(!recipe) {
    //     redirect('/')
    // }

    if (!recipe) {
        return <p>Loading recipe...</p>;
    }

    console.log('page recette ind', recipe)

    // datas pour les onglets 
     // S'assurer que `recipe` n'est pas null avant d'accéder à ses propriétés
    const tabsData = recipe
        ? [
            {
                name: "Tools",
                items: recipe.tools.map((tool: Tool) => tool.tool.name) || [],
            },
            // {
            //     name: "Ingredients",
            //     items: recipe.ingredients.map(
            //         (ing: Ingredient) => ` ${ing.quantity}${ing.unit} ${ing.ingredient.name}`
            //     ) || [],
            // }
            {
                name: "Ingredients",
                items: recipe.ingredients.map(
                    (ing: Ingredient) =>
                        `${ing.ingredient.name} - ${ing.quantity} ${ing.unit ? ing.unit : ""} `  //.trim() : Supprime les espaces inutiles si unit est absent.
                ) || [],
            }

           
            
            ]
    : [];
            // console.log('recipe', recipe)

            // console.log('tabs content', tabsData)
    return (
        <div>
            <h1>Recipe : {recipe.name}</h1>
            <button onClick={generatePDF}>Générer le PDF</button>
            <figure>
                <img
                    src={getCldImageUrl({
                    src: recipe.image,
                    width: 960,
                    height: 600,
                    crop: 'fit'
                    })}
                    alt={recipe.name}
                />
            </figure>
            <p>Description: {recipe.instruction}</p>
            {/* <p>Creation date: {new Date(recipe.createdAt).toLocaleDateString()}</p> */}
            <p> Date: {formatDate(recipe.createdAt)}</p>
            <p>Duration: {recipe.duration}min</p>
            <p>Difficulty: {recipe.difficulty} /5</p>
            <p>Created by: {recipe.user?.username || 'Unknown'}</p>
            <p></p>

            <h3>CATEGORIES:</h3>
            <div>
            <div>
                { recipe && recipe.categories.length > 0 ? (
                    recipe.categories.map((category: Category, index: number) => (
                        <div key={category.id || index}>
                            <p>{category.name}</p>
                        </div>
                    ))
                ) : (
                    <div >No categories available</div>
                )}
            </div>

            </div>
            <h2>STEPS : </h2>
            <div>
                { recipe && recipe.steps.length > 0 ? (
                    recipe.steps.map((step: Step, index: number) => (
                        <div key={step.id || index}>
                            <p>{step.number} {step.title}  {step.duration}min</p>
                            <p>{step.description} </p>
                        </div>
                    ))
                ) : (
                    <div >No steps</div>
                )}
            </div>

            {/* <h3>INGREDIENTS</h3>
            <div>
                { recipe && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient: Ingredient, index: number) => (
                        <div key={ingredient.id || index}>
                            <p>{ingredient.ingredient.name} - {ingredient.quantity}{ingredient.unit}</p>
                        </div>
                    ))
                ) : (
                    <div >No ingredients</div>
                )}
            </div>
            <h3>TOOLS</h3>
            <div>
                { recipe && recipe.tools.length > 0 ? (
                    recipe.tools.map((tool: Tool, index: number) => (
                        <div key={tool.id || index}>
                            <p>{tool.tool.name} - </p>
                        </div>
                    ))
                ) : (
                    <div >No tools</div>
                )}
            </div> */}
            <h3>REVIEWS</h3>
            <div>
                { recipe && recipe.reviews.length > 0 ? (
                    recipe.reviews.map((review: Review, index: number) => (
                        <div key={review.id || index}>
                            <p>{review.content} 
                            {formatDate(review.createdAt)}
                            - {review.user.username}</p>
                            {/* <Link href={`/city/${city.id}`}>{city.name}</Link> */}
                        </div>
                    ))
                ) : (
                    <div >No reviews</div>
                )}
            </div>

            <h3>TABS</h3>
            <div>
                <TabGroup>
                {/* Onglets */}
                <TabList className="flex space-x-4 border-b-2 border-gray-300 pb-2">
                {tabsData.map((tab, index) => (
                    <Tab
                    key={index}
                    className={({ selected }) =>
                        `px-4 py-2 ${
                        selected
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500"
                        }`
                    }
                    >
                    {tab.name}
                    </Tab>
                ))}
                </TabList>

                {/* Contenu des onglets */}
                <TabPanels className="mt-4">
                {tabsData.map((tab, index) => (
                    <TabPanel key={index} className="p-4 bg-gray-50 rounded-md">
                    <ul className="list-disc list-inside">
                        {tab.items.map((item: string, i: number) => (
                        <li className='text-red-800' key={i}>{item}</li>
                        ))}
                    </ul>
                    </TabPanel>
                ))}
                </TabPanels>
            </TabGroup>
            </div>
        </div>
    );
}

export default RecipePage;