"use client"

import React, { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import Tag from '@/components/Tag';
import CursiveLabel from '@/components/CursiveLabel';

// type Params = {
//     articleId: string;
//   };

type Article = {
    id: string;
    title: string;
    content: string;
    createdAt: Date; 
    image: string;
    user: User;
    tags:  {
        tag: {
            id: string;
            name: string;
        }
    }[];
};
type Tag = {
    id?: string;
    tag: {
      name: string;
    };
};

type Comment = {
    id: string;
    content: string;
    createdAt: Date;
    user : User;
};

type User = {
    id: string,
    username: string,
    imageUrl : string;
}


type Props = {
    params: Promise<{ articleId: string }>
}
  
  const ArticlePage = ({ params }: Props) => {
    const [article, setArticle] = useState<Article | null>(null); // Initialisation avec null
    // const { articleId } = params; 
    const [articleId, setArticleId] = useState<string | null>(null); // Ajouter un état pour articleId

    useEffect(() => {
        // Résoudre la promesse de params et extraire articleId
        const fetchArticleId = async () => {
          const resolvedParams = await params;
          setArticleId(resolvedParams.articleId); // Mettre à jour articleId
        };
        
        fetchArticleId();
      }, [params]); // Mettre à jour l'effet lorsque params change

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/article/${articleId}`);
            const data = await response.json();
            console.log(data); 
            setArticle(data);
            console.log('data article', data);
        };

        if (articleId) {
        fetchRecipe();
        }
        console.log(`/api/recipe/${articleId}`);
    }, [articleId]);
    // }, [params.recipeId]);


    if (!article) {
        return <p>Loading article...</p>;
    }

    return (
        <>
        <section className='bg-blackColor'>
            <div className='w-full h-[600px]'>
            <figure className="bg-blackColor w-full h-full relative">
                <Image
                    src={getCldImageUrl({
                        src: article.image,
                        width: 2000,
                        height: 1441,
                        crop: 'fit',
                    })}
                    alt={article.title}
                    fill
                    className="object-cover filter brightness-75"
                />
                {/* inset-0 positionne le div sur toute la surface de la figure */}
                {/* <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div> */}
            </figure>
            </div>

            <article className=' w-[65%] m-auto translate-y-[-100px] '>
                <div className='bg-[#162429]  py-12 px-14 '>
                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <h1 className='text-4xl font-light uppercase tracking-[3px]'>{article.title}</h1>
                        <Image 
                        src = "/img/zigzag.svg"
                        width={120}
                        height={30}
                        objectFit="contain"
                        alt= "zigzag icon"
                        />
                    </div>

                    <p className='text-lg uppercase font-light text-accentColor mt-10 mb-7'>{formatDate(article.createdAt)}</p>

                    <div className='text-xl font-light'>
                        <p>{article.content}</p><br />
                        <p>Et eveniet mollitia sit enim labore qui harum totam et minus nemo sed iste maxime. Cum accusantium consequuntur sed sapiente nobis est reiciendis eius. Non vitae quasi id nisi tempore et voluptatem error ut voluptatum temporibus id iusto omnis ut voluptatem dicta ab voluptas optio. Et corrupti delectus et consequuntur illum sit cumque commodi.vel sequi excepturi. In voluptatem eveniet sit aperiam praesentium ab internos corrupti quo nobis quibusdam est assumenda dignissimos qui maxime ullam est facere dolor.</p><br />
                        <p>Lorem ipsum dolor sit amet. Qui illo velit et ipsam dolor 33 cupiditate omnis et quos dolore. At reiciendis tempora non quod veniam ut galisum velit et vero nostrum sed dicta iusto vel voluptatem doloribus vel sequi excepturi. In voluptatem eveniet sit aperiam praesentium ab internos corrupti quo nobis quibusdam est assumenda dignissimos qui maxime ullam est facere dolor.Est saepe error vel incidunt corrupti ut expedita veritatis et saepe necessitatibus. In veritatis veritatis qui consequuntur animi At laboriosam eaque qui quisquam voluptate a voluptatum quibusdam? Ea quasi quia sed facilis quasi sit voluptatem delectus et voluptatem dolorem ut repudiandae maiores. Qui autem ullam ex quod quia sit quasi quia ut repellendus mollitia.</p><br />
                        <p>Ea consequatur maxime aut obcaecati libero vel nihil ipsum aut quasi iste qui recusandae earum non suscipit dolore. Aut fuga perspiciatis et voluptatum debitis et error voluptas est esse error!</p>
                    </div>

                    
                    <div className='flex gap-3 mt-12 mb-16'>
                        { article && article.tags.length > 0 ? (
                            article.tags.map((tag: Tag, index: number) => (
                            <Tag 
                                key={tag.id || index}
                                text={`#${tag.tag.name}`} 
                            />
                            ))
                        ) : (
                            <div >No tags available</div>
                        )}
                    </div>

                </div>

                <div className=' w-full mt-5 border-t pt-4 border-accentColor'>
                    <div>
                         <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                            <Image
                                src= {article.user.imageUrl}
                                alt="User avatar"
                                layout="responsive"
                                width={100} 
                                height={100}
                                objectFit="contain"
                            />
                        </div>

                        <div>
                            <div>{article.user.username}</div>
                            <div>description bio</div>
                        </div>
                    </div>
                </div>
                    
            </article>

            <div>
            <div className='w-[65%] m-auto flex flex-col justify-center items-center mt-7 '>
                <CursiveLabel text="Share your thoughts !" />

                <div className=' w-full  border-b border-accentColor'>
                    {/* <p className='text-2xl'> {reviewCount} Comments</p> */}
                </div>

           

            </div>


            </div>

        </section>


        <h1>ARTICLE</h1>

        <div>
                
                <p>Author: </p>

                
        </div>
        </>
    )
}

export default ArticlePage