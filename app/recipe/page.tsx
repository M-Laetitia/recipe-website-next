// tsrafce / tsrafc 

// rafce

"use client"


// import Button from '@/components/Button'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import RecipeCard2 from '@/components/RecipeCard2'
import FilterPanel from '@/components/FilterPanel'


type Category = {
    id: string;
    name: string;
};
  
type Recipe = {
    id: string;
    title: string;
    name: string;
    duration: number;
    image: string;
    categories: {
        category: Category;
    }[];
};


const RecipePage = () => {

    // VERSION 02 : HOOKS
    const [recipes, setRecipes] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredCategory, setFilteredCategory] = useState(null);


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

    useEffect (() => {
        const fetchCategories = async() => {
            const response = await fetch('/api/category?main=true')
            const data = await response.json()
            setCategories(data)
        }
        fetchCategories();
    }, [])

    const handleFilterChange = (selectedCateg: string | null) => {

        if (!selectedCateg) {
            setFilteredCategory(null); // Réinitialiser si aucun filtre n'est sélectionné
            return;
          }
    
        const fetchFilteredCategory = async() => {
            const response = await fetch(`/api/recipe?category=${selectedCateg}`);
            const data = await response.json()
            setFilteredCategory(data)
            console.log('filteredCategory', data)
        }
        fetchFilteredCategory();
        };

        // Les recettes à afficher (par défaut ou filtrées)
        const recipesToDisplay = filteredCategory || recipes;
        console.log('recipesToDisplay', recipesToDisplay)

    return (
        // fragments
        <>
        {/* <Button label='Contact' href='/contact' /> */}
            <h1 className='text-4xl font-bold mb-6'>RECIPES</h1>
            <FilterPanel
                title="Main Category"
                options={categories}
                onFilterChange={handleFilterChange}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {/* Liste des articles */}
                {/* boucle en js à travers React dans un composant  */}
                {/* articles > tableau  : article > 1 élément article de la BDD  / un document (mongoDB)*/}

                {recipesToDisplay.length === 0 ? (
                    <p>
                        No recipes found. Try adjusting your filters.
                    </p>
                ) : (
                    recipesToDisplay.map((recipe: Recipe, index: number) => (
                        <RecipeCard2 key={index} recipe={recipe} />
                    ))
                )}
            </div>

          
        </>
    )
}

export default RecipePage
