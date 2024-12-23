import React from 'react'
import Image from 'next/image';
import { getCldImageUrl } from 'next-cloudinary';
import { formatDate } from '@/lib/utils'

type Tag = {
    id: string;
    name: string;
  };
  
  type Article = {
    id: string;
    title: string;
    content: string;
    createdAt : Date;
    image: string;
    tags: Tag[];
  };

const previewLength = 100;

const ArticleCard:React.FC<{ article: Article }> = ({ article }) => {
  return (


        <div className='w-[330px] h-[450px]' key={article.id}>
        
            <figure className=" h-[65%] cursor-pointer">
                <div className=" h-full w-full">
                    <Image className='h-full w-full object-cover object-center'
                        src={getCldImageUrl({
                        src: article.image,
                        width: 500,
                        height: 500,
                        crop: 'fit'
                        })}
                        alt={article.title}
                        width={500}
                        height={500}
                    />
                </div>
            </figure>

            <div className=' bg-blackColor w-full bottom-0 h-[35%] p-4'>
                <h2 className='text-[22px] font-light uppercase'>{article.title}</h2>
                <p className='text-accentColor text-sm uppercase'>{formatDate(article.createdAt)}</p>
                <p>

                    {article.content.length > previewLength
                        ? `${article.content.substring(0, previewLength)} [...]` 
                        : article.content}

                </p>
                <div className=''>
                    {article.tags.map((tag : Tag) => (
                        <span 
                            className=''
                            key={tag.id}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>


            {/* { recipe.createdAt && (
                <p>{recipe.createdAt.toLocaleDateString()} - {recipe.createdAt.toLocaleTimeString()}</p>
            )} */}

            {/* <p className='text-sm text-slate-300'>{formatDate(recipe.createdAt)}</p> */}

        </div>
 

  )
}

export default ArticleCard
