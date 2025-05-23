'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useState, useEffect } from 'react';
// afficher style différent pour liens actifs
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

import SearchSuggestions from "./SearchSuggestions";

const Nav = () => {
  const currentPath = usePathname();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const links = [
  //   { title: 'Profile', url: '/profile' },
  //   { title: 'Dashboard', url: '/user' },
  //   { title: 'Admin Dashboard', url: '/admin', role: 'admin' },
  // ];

  useEffect(() => {
    // Vider l'input à chaque changement de route
    setSearchKeyword('');
  }, [currentPath]); // Utiliser pathname comme dépendance

  // Effet pour gérer le refresh de la page
  useEffect(() => {
    const clearInput = () => {
      setSearchKeyword('');
    };

    window.addEventListener('beforeunload', clearInput);

    return () => {
      window.removeEventListener('beforeunload', clearInput);
    };
  }, []);


    const handleSearch = async (event) => {
      const keyword = event.target.value;
      setSearchKeyword(keyword);
  
      if (keyword.length >= 3) {
        setIsLoading(true); // Commencer le chargement
  
        try {
          // Effectuer la requête à l'API pour récupérer les suggestions
          const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
          const data = await response.json();
  
          setSuggestions(data); 
          console.log('suggestions', data);
        } catch (error) {
          console.error("Error fetching search suggestions:", error);
        } finally {
          setIsLoading(false); // Fin du chargement
        }
      } else {
        setSuggestions([]); // Réinitialiser les suggestions si moins de 3 caractères
      }
    };

   

  const handleSubmit  = (event) => {
    event.preventDefault();
    if (searchKeyword.trim()) {
      router.push(
        `/search?keyword=${encodeURIComponent(searchKeyword.trim())}`,
      );
    }
  };

  return (
    <nav className="bg-blackColor w-full h-24 px-16 grid grid-cols-[auto_1fr_auto_auto] items-center justify-between josefin">
      <Link href="/">
        <div className="w-[105px] h-[70px] flex items-center justify-center">
          <Image
            src="/img/logo.svg"
            alt="Just cook logo"
            width={105}
            height={70}
          />
        </div>
      </Link>

      {/* user panel */}
      {/* <div className='text-white'>
            <Link href='/profile'>
            <div className='mr-5 cursor-pointer hover:text-gray-900'>
              Profile
            </div>
          </Link>
          <Link href='/user'>
            <div className='mr-5 cursor-pointer hover:text-gray-900'>
              Dashboard
            </div>
          </Link>
          <Link href='/admin'>
            <div className='mr-5 cursor-pointer hover:text-gray-900'>
              Admin Dashboard
            </div>
          </Link>
        </div> */}

      {/* login / sign up */}
      {/* <div className='md:flex items-center'>
          <a href='/sign-in'>
            <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mr-4'>
              Login
            </button>
          </a>
          <a href='/sign-up'>
            <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base'>
              Sign Up
            </button>
          </a>
        </div> */}

      <div className="flex items-center justify-end space-x-6 mx-16">
        <Link
          href="/"
          className={`${
            currentPath === '/' ? 'text-accentColor' : 'text-whiteColor'
          } relative pb-1.5 hover:text-accentColor hover:duration-300 after:transition-all`}
        >
          <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-accentColor after:transition-all after:duration-300 hover:after:w-full">
            HOME
          </span>
        </Link>

        <Link
          href="/recipe"
          className={`${
            currentPath === '/recipe' ? 'text-accentColor' : 'text-whiteColor'
          } relative pb-1.5  hover:text-accentColor hover:duration-300 after:transition-all`}
        >
          <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-accentColor after:transition-all after:duration-300 hover:after:w-full">
            RECIPE
          </span>
        </Link>

        <Link
          href="/article"
          className={`${
            currentPath === '/blog' ? 'text-accentColor' : 'text-whiteColor'
          } relative pb-1.5  hover:text-accentColor hover:duration-300 after:transition-all`}
        >
          <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-accentColor after:transition-all after:duration-300 hover:after:w-full">
            BLOG
          </span>
        </Link>
      </div>

      <div className="text-blue-600">
        <p>Search :</p>
        <form onSubmit={handleSubmit }>
          <input
            type="text"
            value={searchKeyword} // Lier la valeur du champ à l'état
            onChange={handleSearch}// Mettre à jour l'état à chaque changement
            placeholder="Search recipes or articles"
            className="border border-gray-300 p-2"
          />
        </form>
        {searchKeyword.length >= 3 && (
        <SearchSuggestions suggestions={suggestions} isLoading={isLoading} />
        )}
      </div>

      {/* Dark / Light theme */}
      <ThemeToggle />

      <div>
        {/* <div className=''>SEARCH</div> */}

        <div className="">LOGIN</div>
      </div>
    </nav>
  );
};

export default Nav;
