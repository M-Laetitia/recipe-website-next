// import React from 'react' 
'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [categories, setCategories] = useState([])

  useEffect (() => {
    const fetchCategories = async() => {
      const response = await fetch('/api/category')
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories();
  }, [])

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
              <Link href={`/category/${category.slug}`}>
                {category.name}
              </Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>

      {/* SECTION 1 - popular / latest recipes ? */}
      <section className="w-full flex-center h-screen flex-col">
            
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