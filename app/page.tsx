'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getCldImageUrl } from 'next-cloudinary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

type Category = {
  id: string;
  name: string;
};

type Recipe = {
  id: string;
  name: string;
  image: string;
};

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


  // const url = getCldImageUrl({
  //   width: 960,
  //   height: 600,
  //   src: 'photo-1702355791694-e9cab84360aa_kavvpx'
  // });

  return (
    <>
      {/* SECTION 1 - HERO */}
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
            //intrinsic / fill
            layout="responsive"
            width={2000} 
            height={1333}
            // cover
            objectFit="contain"
            />
        </figure>
      </section>

  

      {/* SECTION 1 - CATEGORIES */}
      <section className="w-full flex flex-col  items-center h-screen bg-blackColor">
        <div className='w-[80%] h-full pt-[8rem] px-10 flex flex-col items-center text-whiteColor'>
          <h2 className="title-medium mb-5" >Recipes by category</h2>
          <p className='text-small w-[70%] mb-24 text-center'>
            Explore Recipes by Category - 
            from savory snacks to indulgent desserts, our recipes cover it all. Find inspiration for every meal of the day and every occasion !
          </p>

          <div className='w-full flex '>
            <div className='transform scale-x-[-1] flex items-center'>
              <Image
              src="/img/right-arrow-sketch.svg"
              alt="A left arrow"
              width={40} 
              height={40}
              />
            </div>

            <div className='w-full flex flex-row justify-evenly'>

                {categories.length > 0 ? (
                  <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: '/img/right-arrow-sketch.svg',
                    nextEl: '/img/right-arrow-sketch.svg',
                  }}
                  spaceBetween={0}         // Espace entre les slides
                  slidesPerView={4}        // Affiche 3 slides à la fois
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                {categories.map((category: Category) => (
                  <SwiperSlide key={category.id}>
                <div className='bg-[#D98341] w-[215px] h-[270px]'>
                  <div className='h-[80%] w-full p-4'>
                    <Image className=''
                        src={getCldImageUrl({
                        src: 'starter_white_hlwzzf',
                        width: 400,
                        height: 400,
                        crop: 'fit'
                        })}
                        alt='test'
                        width={400}
                        height={400}
                    />
                  </div>
                  <p className='h-[20%] title-small text-center pt-4'>
                    <Link href={`/category/${category.id}`}>
                      {category.name}
                    </Link>
                  </p>
                </div>
                </SwiperSlide>
                ))}
                </Swiper>
              ) : (
                <p>Loading...</p>
              )}

            </div>
            
            <div className='flex items-center'>
              <Image
              src="/img/right-arrow-sketch.svg"
              alt="A left arrow"
              width={40} 
              height={40}
              />
            </div>

          </div>



          {categories.length > 0 ? (
            categories.map((category: Category) => (
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
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
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