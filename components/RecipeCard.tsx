import React from 'react'
type Category = {
    id: string;
    name: string;
  };
  
  type Recipe = {
    id: string;
    title: string;
    name: string;
    categories: {
      category: Category;
    }[];
  };

const RecipeCard:React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    // chaque element de la boucle doit être identitié par une clef pour qu'il soit unique
    <div className='group border border-slate-500 p-6 rounded-md hover:bg-slate-700 cursor-pointer hover:-translate-y-3 duration-300' key={recipe.id}>
    <h2 className='text-2xl md:text-xl font-bold'>{recipe.title}</h2>

    {/* { recipe.createdAt && (
        <p>{recipe.createdAt.toLocaleDateString()} - {recipe.createdAt.toLocaleTimeString()}</p>
    )} */}

    <p className=''>{recipe.name}</p>
    
    <div className='flex flex-wrap gap-2 my-4'>
    {/* TypeScript peut inférer automatiquement le type à partir de la définition de recipe et de son type Recipe */}
    {/* type Recipe > categories > category > name */}
        {recipe.categories.map((categoryRecipe) => (
            <span 
                className=' px-3 py-2 text-xs rounded-full bg-slate-600 group-hover:bg-rose-600 duration-300'
                key={categoryRecipe.category.id}
            >
                {categoryRecipe.category.name}
            </span>
        ))}
    </div>

    </div>
  )
}

export default RecipeCard
