'use client'
import React from 'react'
import { useState, useEffect} from 'react'; 

const Footer = () => {

    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
    // maj de l'année uniquement si l'année change
    const currentYearInEffect = new Date().getFullYear();
    if (currentYearInEffect !== currentYear) {
      setCurrentYear(currentYearInEffect);
    }
  }, [currentYear]); // Le useEffect dépend de currentYear

    return (
        <footer className='w-full h-[300px] bg-blackColor text-whiteColor'>
            <p> &copy; {currentYear} All Rights Reserved. Website name</p>
        </footer>
    )
}

export default Footer