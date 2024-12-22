'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
// import { useState, useEffect } from 'react';
// afficher style différent pour liens actifs
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';


const Nav = () => {
    const currentPath = usePathname();
    const links = [
        { title: 'Profile', url: '/profile' },
        { title: 'Dashboard', url: '/user' },
        { title: 'Admin Dashboard', url: '/admin', role: 'admin' },
        // Add more placeholder links as needed
      ];

    return (
    <nav className='bg-blackColor w-full h-24 px-16 grid grid-cols-[auto_1fr_auto_auto] items-center justify-between josefin'>

        <Link
            href="/"
            >
            <div className= 'w-[105px] h-[70px] flex items-center justify-center'>
            
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

        <div className='flex items-center justify-end space-x-6 mx-16'>
            <Link
                href="/"
                className= {`${
                    currentPath === "/" ? "text-accentColor" : "text-whiteColor"
                  } relative pb-1.5 hover:text-accentColor hover:duration-300 after:transition-all`}
                >
                <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-accentColor after:transition-all after:duration-300 hover:after:w-full">
                    HOME
                </span>
            </Link>

            <Link
                href="/recipe"
                className= {`${
                    currentPath === "/recipe" ? "text-accentColor" : "text-whiteColor"
                  } relative pb-1.5  hover:text-accentColor hover:duration-300 after:transition-all`}
                >
                 <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-accentColor after:transition-all after:duration-300 hover:after:w-full">
                    RECIPE
                </span>
            </Link>

            <Link
                href="/article"
                className= {`${
                    currentPath === "/blog" ? "text-accentColor" : "text-whiteColor"
                  } relative pb-1.5  hover:text-accentColor hover:duration-300 after:transition-all`}
                >
                 <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-accentColor after:transition-all after:duration-300 hover:after:w-full">
                    BLOG
                </span>
            </Link>

        </div>

        {/* Dark / Light theme */}
        <ThemeToggle />

        <div>
            {/* <div className=''>SEARCH</div> */}

            <div className=''>LOGIN</div>
        </div>
    </nav>
  )
}

export default Nav