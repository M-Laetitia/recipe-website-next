'use client'

import React from 'react'
import { useEffect, useState } from "react";

const ThemeToggle = () => {

    const [theme, setTheme] = useState('dark'); // Valeur par défaut, mode sombre

    useEffect(() => {
      const storedTheme = localStorage.getItem('theme') || 'dark';
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
  
    const toggleTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
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