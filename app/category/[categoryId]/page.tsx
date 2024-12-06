'use client'
import React, { useEffect, useState } from 'react'

type Recipe = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  recipes: Recipe[]; // Liste des recettes liées à la catégorie
};

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
const [recipes, setRecipes] = useState<Category[]>([]);

// Utilisation de `React.use()` pour "unwrap" `params`
//   const { categoryId} = React.use(params);
const { categoryId } = params;
  useEffect(() => {
    const fetchRecipes = async () => {
      // Utiliser `categoryId` pour la requête
      const response = await fetch(`/api/category/${categoryId}`);
      const data = await response.json();
      console.log(data); 
      setRecipes(data);
    };

    if (categoryId) {
      fetchRecipes();
    }
  }, [categoryId]); // Recharger les recettes si le `categoryId` change

  if (recipes.length === 0) {
    return <p>No recipes for this category</p>;
  }

  return (
    <div>
    <h1>Recipe for this {categoryId}</h1>
    {recipes.length > 0 ? (
      recipes.map((recipe: Recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2> 

        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};
export default CategoryPage;