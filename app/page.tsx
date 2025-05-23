'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getCldImageUrl } from 'next-cloudinary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Button from '@/components/Button'
import CursiveLabel from '@/components/CursiveLabel'

type Category = {
  id: string;
  name: string;
  image: string;
  recipeCount : number; 
};

type Recipe = {
  id: string;
  name: string;
  image: string;
};



const Home = () => {
  const [categories, setCategories] = useState([])
  const [recipes, setRecipes] = useState([])
  const [themeRecipes, setThemeRecipes] = useState([])
  const colors = ['#D98341', '#EAEAEA', '#0B161A']
  const borderColors = ['#D98341', '#EAEAEA', '#D98341']
  const fontColors = ['#EAEAEA', '#D98341', '#EAEAEA']


  useEffect (() => {
    const fetchCategories = async() => {
      const response = await fetch('/api/category?main=true')
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories();
  }, [])

  useEffect (() => {
    const fetchRecipes = async() => {
      const response = await fetch('/api/recipe?limit=4')
      const data = await response.json()
      setRecipes(data)
    }
    fetchRecipes();
  }, [])

  useEffect (() => {
    const fetchThemeRecipes = async() => {
      const response = await fetch('/api/recipe?limit=2&category=Dessert')
      const data = await response.json()
      setThemeRecipes(data)
      console.log('christmas', data)
    }
    fetchThemeRecipes();
  }, [])



  // const url = getCldImageUrl({
  //   width: 960,
  //   height: 600,
  //   src: 'photo-1702355791694-e9cab84360aa_kavvpx'
  // });

  return (
    <>
      {/* SECTION 1 - HERO */}
      <section className="relative w-full flex items-center justify-center flex-col" style={{ height: 'calc(100vh - 96px)' }}>
        <div className='absolute z-20 flex flex-col items-center justify-normal'>
          <div className='w-[300px] h-auto flex items-center justify-center opacity-80'>
            <Image
              src="/img/logo-hero.png"
              alt="Logo of the website"
              // layout="responsive"
              width={522} 
              height={600}
              />
          </div>
          <p className='text-3xl font-thin m-8'><span className='text-accentColor font-normal'>Discover</span> new flavors. <span className='text-accentColor font-normal'>Cook</span> with passion. <span className='text-accentColor font-normal'>Share</span> joy.</p>
        </div>
        <div className='absolute w-full h-full bg-[#0B161A] opacity-80 z-10'></div>
        <figure className='w-full h-full relative overflow-hidden'>
            <Image
            src="/img/top-view-table-full-food.jpg"
            alt="A table seen from above with different dishes"
            // layout="responsive"
            width={2000} 
            height={1333}
            // objectFit="contain"
            style={{ objectFit: 'contain' }}
            />
        </figure>
      </section>

      {/* SECTION 1 - CATEGORIES */}
      <section className="w-full flex flex-col  items-center h-screen bg-blackColor">
        <div className='w-[80%] h-full pt-[5rem] px-10 flex flex-col items-center text-whiteColor'>
          <CursiveLabel text="Some words !" />
          <h2 className="title-medium mb-2">Recipes by category</h2>
          <p className='text-small w-[70%] mb-20 text-center'>
            Explore Recipes by Category - 
            from savory snacks to indulgent desserts, our recipes cover it all. Find inspiration for every meal of the day and every occasion !
          </p>

          <div className='w-full flex '>
            <div className='w-full flex flex-row justify-evenly'>
                {categories.length > 0 ? (
                  <Swiper
                    modules={[Navigation]}
                    navigation={{
                      prevEl: '.swiper-button-prev',
                      nextEl: '.swiper-button-next',
                    }}
                    spaceBetween={10}         // Espace entre les slides
                    slidesPerView={4}        // Affiche 3 slides à la fois
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >

                    <div className=' swiper-button-prev flex items-center rotate-180 '>
                      <Image
                      src="/img/right-arrow-sketch.svg"
                      alt="Previous"
                      width={50} 
                      height={50}
                      style={{ width: '50px', height: '50px', maxWidth: 'none' }}
                      />
                    </div>

                    <div className=' swiper-button-next flex items-center  w-[50px] h-[50px]'>
                      <Image
                      src="/img/right-arrow-sketch.svg"
                      alt="Next"
                      width={50} 
                      height={50}
                      style={{ width: '50px', height: '50px', maxWidth: 'none' }}
                      />
                    </div>
                    
                    {categories.map((category: Category,  index: number ) => (
                      <SwiperSlide key={category.id}>
                      <Link href={`/category/${category.id}`}>
                        <div 
                          style={{
                            backgroundColor: colors[index % colors.length],
                            borderColor: borderColors[index % borderColors.length],
                            borderWidth: '2px',
                            borderStyle: 'solid' 
                          }}
                          className='w-[215px] h-[270px] group'>

                          <div className='h-[80%] w-full p-4 '>
                            <Image className=''
                                src={getCldImageUrl({
                                src: category.image,
                                width: 400,
                                height: 400,
                                crop: 'fit'
                                })}
                                alt='test'
                                width={400}
                                height={400}
                            />
                          </div>

                          <div style={{ color: fontColors[index % fontColors.length] }}>
                          {/* pt-4 */}
                            <p className='h-[20%] title-small text-center pt-4 group-hover:pt-0 transition-all duration-300 '>
                                {category.name}
                            </p>
                            <p className='text-center pt-2 group-hover:pt-0 transition-all duration-400'>{category.recipeCount} recipes</p>
                          </div>
                        </div>
                      </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <p>Loading...</p>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 - latest recipes */}
      <section className="w-full flex-center h-screen flex justify-center">
        <div className='w-full'>
          <h1>Latest recipes :</h1>
          <div className='w-4/5 bg-slate-500 flex flex-row'>
            {recipes.length > 0 ? (
              <Swiper
                spaceBetween={20}         // Espace entre les slides
                slidesPerView={3}        // Affiche 3 slides à la fois
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                {recipes.map((recipe: Recipe) => (
                  <SwiperSlide key={recipe.id}>
                    <div className="w-[300px] h-[450px]">
                      <div>
                      <Image
                          className="h-full w-full object-cover object-center"
                          src={getCldImageUrl({
                            src: recipe.image,
                            width: 960,
                            height: 600,
                            crop: 'fit',
                          })}
                          alt={recipe.name}
                          width={960}  
                          height={600} 
                        />
                      </div>
                      <p>
                        <Link href={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>
      
      {/* <SECTION 1 - actual theme  ? */}
      <section className=" bg-blackColor w-full h-screen flex flex-center justify-center ">
        <div className= 'w-[80%] h-[full] pt-[5rem] px-10 flex flex-col items-center text-whiteColor'>
          <CursiveLabel text="Special moments" />
          <h2 className="title-medium mb-2 pb-10">All About Christmas</h2>
          <div className=' w-full h-[60%] flex flex-row items-center justify-center gap-6 px-10'>

          {themeRecipes.map((recipe: Recipe, index: number) => (
            <div 
                key={recipe.id} 
                className={`w-[33%] h-[100%] ${index === 0 ? 'order-first' : 'order-last'}`}
              >
                <Image
                  className="h-full w-full object-cover object-center"
                  src={getCldImageUrl({
                    src: recipe.image,
                    width: 640,
                    height: 800,
                    crop: 'fit',
                  })}
                  alt={recipe.name}
                  width={640}
                  height={800}
                />
              </div>
            ))}

            <div className='bg-darkGrey w-[33%] h-[100%]  flex-row border-b border-accentColor relative pt-14 px-8 order-2'>
              <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-0'>
                <Image
                src="/img/snowflake.svg"
                alt="snowflake logo"
                width={80} 
                height={80}
                />
              </div>
              <p className='cursive text-accentColor text-center text-4xl tracking-wide mb-10'>Christmas Spirit</p>
              <p className='text-2xl uppercase tracking-widest leading-tight text-center mb-12'>The holiday season has arrived ! </p>
              <p className='font-light text-xl text-center leading-tight mb-12'>It s the most wonderful time of the year ! Discover delicious, festive recipes that bring warmth and joy to your table.</p>
              <div className='flex items-center justify-center'>
                <Button text="DISCOVER" className="text-center" />
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* SECTION 1 - latest articles  */}
      {/* <section className="w-full flex-center flex-col h-screen bg-purple-900">
      </section> */}

    </>
  )
}

export default Home