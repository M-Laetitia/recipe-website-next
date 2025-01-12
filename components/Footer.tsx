'use client'
import React from 'react'
import { useState, useEffect} from 'react'; 
import Image from 'next/image';
import { Instagram, Youtube, Facebook, Twitter  } from 'lucide-react'
import Link from 'next/link';
import Button from '@/components/Button'

const Footer = () => {

    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
    // maj de l'année uniquement si l'année change
    const currentYearInEffect = new Date().getFullYear();
    if (currentYearInEffect !== currentYear) {
      setCurrentYear(currentYearInEffect);
    }
  }, [currentYear]); // déclenche l'effet uniquement si currentYear change

    return (
        <footer className=' bg-blackColor text-whiteColor font-josefin text-lg font-light '>
          <div className='w-[80%] m-auto  '>
            <div  className='flex gap-10'>
              <div className=' w-2/5 mr-24'>
                <Link href="/">
                  <div className="w-[120px] h-[70px] flex items-center justify-center">
                    <Image
                      src="/img/logo.svg"
                      alt="Just cook logo"
                      width={120}
                      height={70}
                    />
                  </div>
                </Link>

                <p className='pt-4 font-normal uppercase'>Discover <span className='text-accentColor font-bold text-3xl'>.</span> Cook <span className='text-accentColor font-bold text-3xl'>.</span>  Share </p>
                <p className='py-6'>
                  Bringing joy to your kitchen, one recipe at a time. Our curated collection of recipes and food stories celebrates the art of cooking, the warmth of sharing, and the pleasure of discovering new flavors.
                </p>
                <div className='flex gap-4'>
                  <Instagram size={24} />
                  <Youtube size={24} />
                  <Twitter size={24} />
                  <Facebook size={24} />
                </div>
              </div>

              <div className=' w-1/5'>
                <p className='uppercase font-normal text-xl text-accentColor mb-5'>EXPLORE</p>
                <ul className='space-y-4'>
                  <li>Home</li>
                  <li>Recipes</li>
                  <li>Blog</li>
                  <li>Categories</li>
                  <li>About Us</li>
                </ul>
              </div>

              <div className=' w-1/5'>
              <p className='uppercase font-normal text-xl text-accentColor mb-5'>SUPPORT</p>
                <ul className='space-y-4'>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>FAQ</li>
                </ul>
              </div>

              <div className=' w-1/5'>
                <p className='uppercase font-normal text-xl text-accentColor mb-5'>NEWSLETTER</p>
                <p>Stay inspired in the kitchen with our monthly newsletter for fresh recipes, cooking tips, and culinary stories delivered straight to your inbox.</p>
                <div className='mt-7'>
                  <p className='border-b border-solid border-gray-500'>Enter your email address</p>
                  <button className='mt-3 bg-accentColor p-2 rounded-lg font-normal'>SUBSCRIBE</button>
                </div>
              </div>

            </div>


            <div className='pt-40 flex flex-col items-center justify-between'>
              <div className='w-full border border-solid border-gray-700'></div>
              <p className='py-16 text-lg font-light'> &copy; {currentYear} All Rights Reserved -  <span className='text-accentColor font-normal'>Just Cook - Best Recipes.</span></p>
            </div>
          </div>


        </footer>
    )
}

export default Footer