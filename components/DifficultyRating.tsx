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
                className={`${isFilled ? 'text-orange-600' : 'text-white'}`}>
                    <ChefHat/>
                </div>

            ))}
        </div>
    )
}

export default DifficultyRating