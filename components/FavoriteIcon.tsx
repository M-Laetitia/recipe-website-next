import React from 'react'
 

// Utilisation de l'interface dans le composant
const FavoriteIcon = () => {

    return (
        <div className='bg-whiteColor w-11 h-11 flex rounded-full justify-center items-center border border-solid group hover:cursor-pointer'>
           <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="#BA9DA2" 
            stroke="#BA9DA2" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-heart group-hover:fill-[#D9415A] group-hover:stroke-[#D9415A]  group-hover:scale-110 transition duration-300 ease-out">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </div>
    )
}

export default FavoriteIcon

// BA9DA2