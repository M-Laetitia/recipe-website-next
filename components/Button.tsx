import React from 'react'
 
// Définition de l'interface pour les props
interface ButtonProps {
    text: string;
    className : string; 
  }

// Utilisation de l'interface dans le composant
const Button = ({ text , className }: ButtonProps) => {

    return (
        <div className={`btn ${className='bg-accentColor inline-block px-6 py-3.5 font-medium text-base tracking-widest cursor-pointer hover:bg-[#E59B62] transition ease-in-out delay-150'}`}>
            {text}
        </div>
    )
}

export default Button