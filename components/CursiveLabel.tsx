import React from 'react'
import Image from 'next/image';
 
// Définition de l'interface pour les props
interface Props {
    text: string;
  }

// Utilisation de l'interface dans le composant
const CursiveLabel = ({ text }: Props) => {

    return (
        <div className='w-80 mb-8 relative flex justify-center items-center'>
            <Image
            src="/img/paint_stroke.svg"
            alt="paint Stroke"
            width={200} 
            height={45}
            className="transform rotate-[-5deg]"
            />
            <p className='w-full text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursive font-cursive cursive-medium'>{text}</p>
        </div>
    )
}

export default CursiveLabel