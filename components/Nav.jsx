'use client'
import React from 'react'
import Link from 'next/link';
// afficher style différent pour liens actifs
import { usePathname } from 'next/navigation';



const Nav = () => {
    const currentPath = usePathname();

    return (
    <nav className='bg-blackColor w-full h-24 px-16 grid grid-cols-[auto_1fr_auto_auto] items-center justify-between josefin'>
        <div className=''>LOGO</div>

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

        <div className=''>SEARCH</div>

        <div className=''>LOGIN</div>
    </nav>
  )
}

export default Nav