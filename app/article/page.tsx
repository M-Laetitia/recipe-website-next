"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard'

import { formatDate } from '@/lib/utils';

type Article = {
    id: string;
    title: string;
    image: string;
    content: string;
    createdAt: Date; 
    user: { 
        id: string;
        username: string;
    }
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

const ArticlesPage = () => {
    const [articles, setArticles ] = useState ([])

    useEffect (()=> {
        const fetchArticles = async() => {
            const response = await fetch('api/article')
            const data = await response.json()

            setArticles(data)
        }

        fetchArticles();
    }, [])

    return (
        <>
        <h1>BLOG - ARTICLES</h1>

        <div className='grid grid-cols-4 gap-12'>
        {articles.map((article: Article, index: number) =>(
                    <ArticleCard key={index} article={article}/>
                ))}
        </div>

        <div>

            {articles.map((article: Article,  index: number) =>(
                    // 1° >nom de la proppriété (prop)   2°>la valeur (object article en entier récupéré dans mon tableau d'articles lui même alimenté par l'api et articles > tableau)
                    <div key={article.id || index}>
                        <p>
                        {/* <Link href={`/recipe/${recipe.id}`}> */}
                        <Link href={`/article/${article.id}`}>
                        {article.title} - {article.content} - {formatDate(article.createdAt)} - by {article.user.username}
                        </Link>
                        </p>
                        <p>tags : </p>
                       
                            { article && article.tags.length > 0 ? (
                            article.tags.map((tag: Tag, index: number) => (
                                <p key={tag.id || index}>
                                    {tag.tag.name}
                                </p>
                            ))
                            ) : (
                                <p >No tags available</p>
                            )}

                        
                        
                    </div>
                    
                ))}

        </div>
        </>
    )
}

export default ArticlesPage