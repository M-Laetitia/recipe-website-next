'use client'
import { redirect } from 'next/navigation';
import { formatDate } from '@/lib/utils'
import { db } from '@/lib/db'; // Import the database 
import { getCldImageUrl } from 'next-cloudinary';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';




// const RecipePage =  ({ params }: { params: { recipeId: string }}) => {
//     const [recipe, setRecipe] = useState<any | null>(null) 
// Initialisation avec null pour indiquer qu'il n'y a pas encore de recette

const RecipePage = ({ params }: { params: Promise<{ recipeId: string }> }) => {
    const [recipe, setRecipe] = useState<any | null>(null); // Initialisation avec null
    const { recipeId } = React.use(params); // Utilise `React.use` pour résoudre `params`

    console.log("Recipe ID clien:", recipeId);
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


    console.log('test', recipe)
    // if(!recipe) {
    //     redirect('/')
    // }

    if (!recipe) {
        return <p>Loading recipe...</p>;
    }

    return (
        <div>
            <h1>Recipe : {recipe.name}</h1>
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
            <p>Desciption: {recipe.instruction}</p>
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
                    recipe.categories.map((category: any, index: number) => (
                        <div key={category.id || index}>
                            <p>{category.category.name}</p>
                        </div>
                    ))
                ) : (
                    <div >No steps available</div>
                )}
            </div>

            </div>
            <h2>STEPS : </h2>
            <div>
                { recipe && recipe.steps.length > 0 ? (
                    recipe.steps.map((step: any, index: number) => (
                        <div key={step.id || index}>
                            <p>{step.number} - {step.description} - {step.duration}min</p>
                        </div>
                    ))
                ) : (
                    <div >No steps</div>
                )}
            </div>

            <h3>INGREDIENTS</h3>
            <div>
                { recipe && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient: any, index: number) => (
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
                    recipe.tools.map((tool: any, index: number) => (
                        <div key={tool.id || index}>
                            <p>{tool.tool.name} - </p>
                        </div>
                    ))
                ) : (
                    <div >No tools</div>
                )}
            </div>
            <h3>REVIEWS</h3>
            <div>
                { recipe && recipe.reviews.length > 0 ? (
                    recipe.reviews.map((review: any, index: number) => (
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

            
        </div>

        
    );
}

export default RecipePage;