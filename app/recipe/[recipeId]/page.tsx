'use client'
import { formatDate } from '@/lib/utils'
import { getCldImageUrl } from 'next-cloudinary';
import React, { useEffect, useState } from 'react'
import { jsPDF } from "jspdf"; 
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Image from 'next/image';
import CursiveLabel from '@/components/CursiveLabel';
import Tag from '@/components/Tag';
import DifficultyRating from '@/components/DifficultyRating';
import FavoriteIcon from '@/components/FavoriteIcon';
import { Clock4, MessageSquareText  } from 'lucide-react';



//& TYPE ------------------------------------------------------------------
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
    category: {
        name: string;
        isPrimary : boolean;
    };
    
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
            console.log('data recette', data)
        };

        if (recipeId) {
            fetchRecipe();
        }

    }, [recipeId]);

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

    // & RETURN ----------------------------------------------------------------
    return (
        <div className='bg-darkGrey w-[65%]  m-auto pt-24'>
            <div className=' flex flex-col items-center justify-center mb-20 '>
                <CursiveLabel text="Let's cook !" />
                <div className='flex items-center justify-center gap-4'>
                    <h1 className='text-4xl font-normal uppercase tracking-[3px]'>{recipe.name}</h1>
                    <Image 
                    src = "/img/zigzag.svg"
                    width={120}
                    height={30}
                    objectFit="contain"
                    alt= "zigzag icon"
                    />
                </div>
            </div>


            {/* //& TOP ----------------------------------------------------- */}
            <div className='w-full h-[550px] flex gap-24'>
                
                <div className='w-[60%] h-full relative'>
                    {/* //~ Description --------------------------------------------- */}
                    <div className='text-xl font-light mb-9'>
                        {recipe.instruction}
                    </div>

                        <div><FavoriteIcon /></div>
                    
                    
                    {/* //~ Tags ---------------------------------------------------- */}
                    <div className='flex gap-5'>
                        { recipe && recipe.categories.length > 0 ? (
                            recipe.categories.map((category: Category, index: number) => (
                                <Tag 
                                key={category.id || index}
                                text={`#${category.category.name}`} 
                                bgColor={category.category.isPrimary ? "var(--accentColor)" : "var(--darkGrey)"} 
                            />
                            ))
                        ) : (
                            <div >No categories available</div>
                        )}
                    </div>

                    {/* //~ Infos --------------------------------------------------- */}
                    <div className='bg-lightGrey w-[calc(100%+16rem)] h-36 z-10 absolute bottom-16 flex '>
                        <div className='flex'>
                            <div>
                                <p>Cooking time</p>
                                <div className='flex'><Clock4 /><p>{recipe.duration}min</p> </div>
                            </div>
                            <div>
                                <p>Difficulty</p>
                 
                                <div>
                                <DifficultyRating difficulty= {recipe.difficulty} />
                                </div>
                                
                            </div>
                            <div >
                                <p>Review</p>
                                <div className='flex'> <MessageSquareText /><p> 2 </p></div>
                            </div>
                        </div>
                        <div>
                            <p>♥</p>
                        </div>

                    </div>
                </div>

                {/* //~ Image --------------------------------------------------- */}
                <div className="w-[40%] h-full">
                    <figure className="w-full h-full relative">
                        <Image
                            src={getCldImageUrl({
                                src: recipe.image,
                                width: 960,
                                height: 600,
                                crop: 'fit',
                            })}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                        />
                    </figure>
                </div>
            </div>

            {/* //& STEPS / TOOLS / ING ------------------------------------- */}
            <p>Description: </p>
            {/* <p>Creation date: {new Date(recipe.createdAt).toLocaleDateString()}</p> */}
            <p> Date: {formatDate(recipe.createdAt)}</p>
           
        
            <p>Created by: {recipe.user?.username || 'Unknown'}</p>
            <p></p>


            <button onClick={generatePDF}>Générer le PDF</button>
           
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