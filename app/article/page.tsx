"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

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

        <div>

            {articles.map((article: any,  index: number) =>(
                    // 1° >nom de la proppriété (prop)   2°>la valeur (object article en entier récupéré dans mon tableau d'articles lui même alimenté par l'api et articles > tableau)
                    <div>
                        <p key={index}>
                        {/* <Link href={`/recipe/${recipe.id}`}> */}
                        <Link href={`/article/${article.id}`}>
                        {article.title} - {article.content} - {formatDate(article.createdAt)} - by {article.user.username}
                        </Link>
                        </p>
                        <p>tags : </p>
                       
                            { article && article.tags.length > 0 ? (
                            article.tags.map((tag: any, index: number) => (
                                <p key={tag.id || index}>
                                    {tag.tag.name}
                                </p>
                            ))
                            ) : (
                                <p >No steps available</p>
                            )}

                        
                        
                    </div>
                    
                ))}

        </div>
        </>
    )
}

export default ArticlesPage