import { formatDate } from '@/lib/utils'
import React from 'react'


const RecipeCard:React.FC<any> = ({ recipe }) => {
  return (
    // chaque element de la boucle doit être identitié par une clef pour qu'il soit unique
    <div className='group border border-slate-500 p-6 rounded-md hover:bg-slate-700 cursor-pointer hover:-translate-y-3 duration-300' key={recipe.id}>
    <h2 className='text-2xl md:text-xl font-bold'>{recipe.title}</h2>

    {/* { recipe.createdAt && (
        <p>{recipe.createdAt.toLocaleDateString()} - {recipe.createdAt.toLocaleTimeString()}</p>
    )} */}

    <p className=''>{recipe.name}</p>
    {/* <p className='text-sm text-slate-300'>{formatDate(recipe.createdAt)}</p> */}
    
    <div className='flex flex-wrap gap-2 my-4'>
        {recipe.categories.map((categoryRecipe: any) => (
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
