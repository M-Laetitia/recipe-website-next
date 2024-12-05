// tsrafce / tsrafc 

// rafce

"use client"

import RecipeCard2 from '@/components/RecipeCard2'
// import Button from '@/components/Button'
import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const RecipePage = () => {

    // VERSION 02 : HOOKS
    const [recipes, setRecipes] = useState([])

    useEffect (() => {
        // je consomme l'api et je stocke  dans articles les résultats obtenus dans l'api
        const fetchRecipes = async() => {
            const response = await fetch('/api/recipe')
            // récupérer les données brutes de l'api
            const data = await response.json()

            // Je set Articles avec les data - je mets dans articles le contenu récupéré avec les datas, j'hydrate mon objet articles avec les datas récupérées dans l'api
            setRecipes(data)
 
        }

        // j'appelle concrêtement mon fetchArticles
        fetchRecipes();

        // dans le useEffect possibilité de mettre des dépendances - conditions pour effectuer les changements - par exemple un argument avec l'heure, et en fonction de ce paramètes, on appliqeurait des changements 
        // différence entre tableau vide et ne rien mettre 
    }, [])

    return (
        // fragments
        <>
        {/* <Button label='Contact' href='/contact' /> */}
            <h1 className='text-4xl font-bold mb-6'>RECIPES</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {/* Liste des articles */}
                {/* boucle en js à travers React dans un composant  */}
                {/* articles > tableau  : article > 1 élément article de la BDD  / un document (mongoDB)*/}
                {recipes.map((recipe: any, index: number) =>(
                    // 1° >nom de la proppriété (prop)   2°>la valeur (object article en entier récupéré dans mon tableau d'articles lui même alimenté par l'api et articles > tableau)
                    <RecipeCard2 key={index} recipe={recipe}/>

                    
                    
                ))}
            </div>

            <div>
            {recipes.map((recipe: any,  index: number) =>(
                    // 1° >nom de la proppriété (prop)   2°>la valeur (object article en entier récupéré dans mon tableau d'articles lui même alimenté par l'api et articles > tableau)
                    <div>
                        

                        <p key={index}>
                        {/* <Link href={`/recipe/${recipe.id}`}> */}
                        <Link href={`/recipe/${recipe.id}`}>
                        {recipe.name}
                        </Link>
                        </p>
                        
                    </div>
                   
                ))}
            </div>
        </>
    )
}

export default RecipePage
