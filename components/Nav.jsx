'use client'
import React from 'react'
import Link from 'next/link';
// afficher style différent pour liens actifs
import { useRouter } from 'next/navigation';



const Nav = () => {
    const router = useRouter();
    // fonction pour comparer la route actuelle avec la route du lien.
    const isActive = (path) => {
        console.log('Current path:', router.pathname);  // Débogage
        return router.pathname === path;
      };
  return (

    <nav className='bg-blackColor w-full h-24 px-16 grid grid-cols-[auto_1fr_auto_auto] items-center justify-between'>
        <div className=''>LOGO</div>

        <div className='flex items-center justify-end space-x-6 mx-16'>
            <Link
                href="/"
                className={`hover:text-accentColor ${isActive('/') ? 'text-accentColor' : 'text-whiteColor'}`}
                >
                HOME
            </Link>

            <Link
                href="/recipe"
                className={`hover:text-accentColor ${isActive('/recipe') ? 'text-accentColor' : 'text-whiteColor'}`}
                >
                RECIPE
            </Link>

            <p>BLOG</p>
        </div>

        <div className=''>SEARCH</div>

        <div className=''>LOGIN</div>
    </nav>
  )
}

export default Nav