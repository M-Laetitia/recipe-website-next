// import React from 'react' 
'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getCldImageUrl } from 'next-cloudinary';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const Home = () => {
  const [categories, setCategories] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect (() => {
    const fetchCategories = async() => {
      const response = await fetch('/api/category')
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


  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: 'photo-1702355791694-e9cab84360aa_kavvpx'
  });

  return (
    <>
      {/* SECTION 1 - image  */}
      <section className="relative w-full flex-center flex-col" style={{ height: 'calc(100vh - 96px)' }}>
          <div className='absolute z-20'>
            <div>LOGO</div>
            <p>NAME WEBSITE</p>
          </div>
          <div className='absolute w-full h-full bg-blackColor opacity-80 z-10'></div>
          <figure className='w-full h-full relative overflow-hidden'>
              <Image
              src="/img/top-view-table-full-food.jpg"
              alt="A table seen from above with different dishes"
              layout="responsive"
              width={1200} 
              height={800}
              objectFit="contain"
              />
          </figure>
      </section>

      {/* SECTION 1 - categories  */}
      <section className="w-full flex-center flex-col h-screen bg-purple-900">
        {categories.length > 0 ? (
          categories.map((category: any) => (
            // <div key={category.id}>{category.name}</div>
            <div key={category.id}>
              {/* Lien vers la page de la catégorie, avec l'id dans l'URL */}
              <Link href={`/category/${category.id}`}>
                {category.name}
              </Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>

      {/* SECTION 1 - latest recipes */}
      <section className="w-full flex-center h-screen flex justify-normal justify-center">

      <div className='w-full'>
        <h1>Latest recipes :</h1>
        <div className='w-4/5 bg-slate-500 flex flex-row'>

          
        {recipes.length > 0 ? (
        <Swiper
          spaceBetween={20}         // Espace entre les slides
          slidesPerView={3}        // Affiche 3 slides à la fois
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {recipes.map((recipe: any) => (
            <SwiperSlide key={recipe.id}>
              <div className="w-[300px] h-[450px]">
                <div>
                  <img
                    className="h-full w-full object-cover object-center"
                    src={getCldImageUrl({
                      src: recipe.image,
                      width: 960,
                      height: 600,
                      crop: 'fit',
                    })}
                    alt={recipe.name}
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

      
      {/* SECTION 1 - actual theme  ? */}
      <section className="w-full flex-center h-screen flex-col">
            
      </section>

      {/* SECTION 1 - latest articles  */}
      <section className="w-full flex-center flex-col h-screen bg-purple-900">
        
      </section>


    </>
  )
}

export default Home