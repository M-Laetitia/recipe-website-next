import React from 'react'
import Image from 'next/image';
import { Clock4 } from 'lucide-react';
import { getCldImageUrl } from 'next-cloudinary';
import Link from 'next/link';

import DifficultyRating from '@/components/DifficultyRating';
import FavoriteIcon from '@/components/FavoriteIcon';

type Category = {
    id: string;
    name: string;
  };
  
  type Recipe = {
    id: string;
    // title: string;
    name: string;
    duration: number;
    image: string;
    difficulty: number;
    categories: {
      category: Category;
    }[];
  };


const RecipeCard2:React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (

    <div className='w-[330px] h-[450px] relative flex items-center justify-center ' key={recipe.id}>
        <div className='absolute top-0 left-0 z-20 bg-accentColor px-4 py-1 rounded-r-2xl'> March 22, 2024</div>
        <div className='absolute top-0 right-0 z-20'> <FavoriteIcon/> </div>
        <figure className="relative w-full h-full ">
          <div className=" h-full w-full 
              before:content-[''] before:absolute before:inset-0 
              before:bg-gradient-to-t before:from-[rgba(0,0,0,0.6)] before:from-0% before:via-[rgba(0,0,0,0.6)] before:via-35% before:to-[rgba(0,0,0,0.3)] before:to-35%
              group-hover:before:opacity-100
              ">
                <Image className='h-full w-full object-cover object-center'
                  src={getCldImageUrl({
                  src: recipe.image,
                  width: 960,
                  height: 600,
                  crop: 'fit'
                  })}
                  alt={recipe.name}
                  width={500}
                  height={500}
              />
          </div>
        </figure>
        
        <div className='w-[60%] absolute text-accentColor translate-y-[68px] border border-solid border-accentColor'></div>

        <div className='absolute bottom-4  w-full px-7'>
            <h2 className='uppercase text-xl'>
            <Link
              href={`/recipe/${recipe.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
                {recipe.name}
              </Link>
              </h2>
            <div className='uppercase font-light text-sm mt-2'>
                {recipe.categories.map((categoryRecipe) => (
                    <span 
                        className=''
                        key={categoryRecipe.category.id}
                    >
                        {categoryRecipe.category.name} <span className='font-normal text-accentColor '> | </span>  
                    </span>
                ))}
            </div>

            <div className='flex items-center justify-between gap-5 mt-3'>
                <p className='flex gap-2 font-light'><Clock4 />{recipe.duration} min </p>
                {/* <p><ChefHat />{recipe.difficulty}</p> */}
                <div ><DifficultyRating difficulty= {recipe.difficulty} /></div>
            </div>
        </div>


        {/* { recipe.createdAt && (
            <p>{recipe.createdAt.toLocaleDateString()} - {recipe.createdAt.toLocaleTimeString()}</p>
        )} */}

        {/* <p className='text-sm text-slate-300'>{formatDate(recipe.createdAt)}</p> */}

    </div>
  )
}

export default RecipeCard2
