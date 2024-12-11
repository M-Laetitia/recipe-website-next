'use client'

import React from 'react'
import { useEffect, useState } from "react";

const ThemeToggle = () => {

    // useState('dark') : hook d'état qui crée une variable d'état appelée theme et une fonction setTheme pour la mettre à jour.
    const [theme, setTheme] = useState('dark'); // Valeur par défaut, mode sombre

    // useEffect(() => {...}, [])  hook d'effet s'exécute une seule fois, au moment où le composant est monté dans le DOM (grâce à l'array [] passé en deuxième argument).
    useEffect(() => {
      // récupérer la valeur du theme dans le local storage / si rien ne trouvé on utilise dark comme valeur de défaut
      const storedTheme = localStorage.getItem('theme') || 'dark';
      // la function setTheme est call avec la valeur récupérée (dark ou light) pour mettre à jour l'état du thème
      setTheme(storedTheme);
  
      // Appliquer la classe 'dark' ou 'light' à <html> pour changer les variables CSS
      if (storedTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    }, []);
  
    // permet de basculer entre les modes dark ou light
    const toggleTheme = () => {
      // opérateur ternaire pour vérifier l'état actuel du thème (theme).
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      // la fonction setTheme est appelée pour mettre à jour l'état theme.
      setTheme(newTheme);
      // save le theme choisi dans le local storage
      localStorage.setItem('theme', newTheme);
  
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    };

    return (
        <div onClick={toggleTheme} className='toggle-btn mr-6 h-full flex items-center '>
            <div className='bg-blackColor relative w-[45px] h-[23px] rounded-xl border-solid border border-accentColor flex items-center justify-start px-1 cursor-pointer'>
                <div
                    className={`bg-accentColor rounded-full w-[16px] h-[16px] transition-all 
                    ${theme === 'dark' ? 'translate-x-0' : 'translate-x-[22px]'}`}>
                </div>
                <div className=' absolute translate-x-[7px] bg-blackColor rounded-full w-[13px] h-[13px]'></div>
            </div>
        </div>
      
    )
  }
  
  export default ThemeToggle