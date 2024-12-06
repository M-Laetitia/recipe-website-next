import React from 'react'
import Image from 'next/image';
import { Clock4 } from 'lucide-react';
// import { Star } from 'lucide-react';
import { ChefHat } from 'lucide-react';
import { getCldImageUrl } from 'next-cloudinary';

const RecipeCard2:React.FC<any> = ({ recipe }) => {
  return (

    <div className='w-[330px] h-[450px] relative ' key={recipe.id}>
       
        <figure className="relative h-full cursor-pointer">
        <div className=" h-full w-full
                before:content-[''] before:absolute before:inset-0 
                before:bg-gradient-to-t before:from-[rgba(0,0,0,0.6)] before:from-0% before:via-[rgba(0,0,0,0.6)] before:via-35% before:to-[rgba(0,0,0,0.3)] before:to-35%
                group-hover:before:opacity-100
                ">
                {/* <Image
                src="/img/cinnamonRolls.jpg"
                alt="Cinnamon rolls"
                layout="responsive"
                width={600} 
                height={600}
                objectFit="contain"
                /> */}
                  <Image className='h-full w-full object-cover object-center'
                    src={getCldImageUrl({
                    src: recipe.image,
                    width: 960,
                    height: 600,
                    crop: 'fit'
                    })}
                    alt={recipe.name}
                />
            </div>
        </figure>

        <div className='absolute bottom-0'>
            <h2 className=''>{recipe.name}</h2>
            <div className=''>
                {recipe.categories.map((categoryRecipe: any) => (
                    <span 
                        className=''
                        key={categoryRecipe.category.id}
                    >
                        {categoryRecipe.category.name}
                    </span>
                ))}
            </div>

            <div>
                <p><Clock4 />{recipe.duration}</p>
                <p><ChefHat /><ChefHat /><ChefHat /><ChefHat /><ChefHat /></p>
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
