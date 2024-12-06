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

    include :{
        tools: {
            tool: Tool;
        }[];
        ingredients: {
            ingredient: Ingredient;
        }[];
          categories: {
            category: Category;
        }[];
          reviews: {
            review: Review;
        }[];
        steps: {
            step: Step;
        }[];
        user: {
            id: string;
            username: string;
        }
    }
};
type Review = {
    title: string;
    id: string;
    content: string;
    createdAt: Date;
     include : {
        user: {
            username:string
        }
     }
  };

type Tool = {
    id: string;
    name: string;
};
type Ingredient = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
};
type Category = {
    id: string;
    name: string;
};
type Step = {
    id: string;
    number: string;
    duration: number;
    description: string
};

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
        console.log('passe ici')
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipe/${recipeId}`);
            const data = await response.json();
            console.log(data); 
            setRecipe(data);
        };

        if (recipeId) {
        fetchRecipe();
        }
        console.log(`/api/recipe/${recipeId}`);
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

            recipe.include.ingredients.map((ingredient, index: number) => {
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

    // datas pour les onglets 
     // S'assurer que `recipe` n'est pas null avant d'accéder à ses propriétés
    const tabsData = recipe
        ? [
            {
                name: "Tools",
                items: recipe.include.tools.map((tool) => tool.tool.name) || [],
            },
            {
                name: "Ingredients",
                items: recipe.include.ingredients.map((ing) => ing.ingredient.name) || [],
            },
            ]
    : [];


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
            <p>Created by: {recipe.include.user?.username || 'Unknown'}</p>
            <p></p>

            <h3>CATEGORIES:</h3>
            <div>
            <div>
                { recipe && recipe.include.categories.length > 0 ? (
                    recipe.include.categories.map((category, index: number) => (
                        <div key={category.category.id || index}>
                            <p>{category.category.name}</p>
                        </div>
                    ))
                ) : (
                    <div >No categories available</div>
                )}
            </div>

            </div>
            <h2>STEPS : </h2>
            <div>
                { recipe && recipe.include.steps.length > 0 ? (
                    recipe.include.steps.map((step, index: number) => (
                        <div key={step.step.id || index}>
                            <p>{step.step.number} - {step.step.description} - {step.step.duration}min</p>
                        </div>
                    ))
                ) : (
                    <div >No steps</div>
                )}
            </div>

            <h3>INGREDIENTS</h3>
            <div>
                { recipe && recipe.include.ingredients.length > 0 ? (
                    recipe.include.ingredients.map((ingredient, index: number) => (
                        <div key={ingredient.ingredient.id || index}>
                            <p>{ingredient.ingredient.name} - {ingredient.ingredient.quantity}{ingredient.ingredient.unit}</p>
                        </div>
                    ))
                ) : (
                    <div >No ingredients</div>
                )}
            </div>
            <h3>TOOLS</h3>
            <div>
                { recipe && recipe.include.tools.length > 0 ? (
                    recipe.include.tools.map((tool, index: number) => (
                        <div key={tool.tool.id || index}>
                            <p>{tool.tool.name} - </p>
                        </div>
                    ))
                ) : (
                    <div >No tools</div>
                )}
            </div>
            <h3>REVIEWS</h3>
            <div>
                { recipe && recipe.include.reviews.length > 0 ? (
                    recipe.include.reviews.map((review, index: number) => (
                        <div key={review.review.id || index}>
                            <p>{review.review.content} 
                            {formatDate(review.review.createdAt)}
                            - {review.review.include?.user.username}</p>
                            {/* <Link href={`/city/${city.id}`}>{city.name}</Link> */}
                        </div>
                    ))
                ) : (
                    <div >No reviews</div>
                )}
            </div>

            <h3>TEST TABS with headlessui</h3>
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