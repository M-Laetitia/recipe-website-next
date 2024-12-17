import React from 'react';
import {ChefHat  } from 'lucide-react';;
 
// Définition de l'interface pour les props
interface DifficultyProps {
    difficulty: number;
  }

// Utilisation de l'interface dans le composant
const DifficultyRating = ({ difficulty }: DifficultyProps) => {

    const filledHats = difficulty;
    // on crée un array vide (5), qu'on remplit toutes les el de la valeur false, ensuite le map itère sur chaque el du tableau, avec _ comme argument pour ignorer la valeur actuelle (car on ne l'utilise pas) et index pour l'index de chaque el du tableau. On vérifie si l'index est inférieur à filledHats, si c'est le cas on remplace la valeur par true
    const hats = Array(5).fill(false).map((_, index) => index < filledHats);

    return (
        <div className='flex gap-1'>
            {hats.map((isFilled, index) => (
                <div 
                    key={index}
                    className="flex items-center justify-center"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="30" 
                        height="30" 
                        viewBox="0 0 24 24" 
                        fill={isFilled ? 'var(--accentColor)' : 'var(--blackColor)'} 
                        stroke={isFilled ? 'var(--whiteColor)' : 'var(--whiteColor)'} 
                        strokeWidth="1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="lucide lucide-chef-hat"
                    >
                        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/>
                        <path d="M6 17h12"/>
                    </svg>
                </div>
            ))}
        </div>
    )
}

export default DifficultyRating

