'use client'
// import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
  const [recipes, setRecipes] = useState<any[]>([]);

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
  }, [params.categoryId]); // Recharger les recettes si le `categoryId` change

  if (recipes.length === 0) {
    return <p>No recipes for this category</p>;
  }

  return (
    <div>
    <h1>Recipe for this {categoryId}</h1>
    {recipes.length > 0 ? (
      recipes.map((recipeObject: any) => (
        <div key={recipeObject.id}>
          <h2>{recipeObject.recipe.name}</h2> 

        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};
export default CategoryPage;