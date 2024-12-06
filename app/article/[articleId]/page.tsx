"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

const ArticlePage = ({ params }: { params: Promise<{ articleId: string }> }) => {
    const [article, setArticle] = useState<any | null>(null); // Initialisation avec null
    const { articleId } = React.use(params); // Utilise `React.use` pour résoudre `params`

    useEffect(() => {
        console.log('passe ici')
        const fetchRecipe = async () => {
            const response = await fetch(`/api/article/${articleId}`);
            const data = await response.json();
            console.log(data); 
            setArticle(data);
        };

        if (articleId) {
        fetchRecipe();
        }

    }, [articleId]);
    // }, [params.recipeId]);


    if (!article) {
        return <p>Loading article...</p>;
    }

    return (
        <>
        <h1>ARTICLE</h1>

        <div>
                <p>Title: {article.title}</p>
                <p>content: {article.content}</p>
                <p>Date: {formatDate(article.createdAt)}</p>
                <p>Author: {article.user.username}</p>

                <div>
                    <p>Tags:</p>
                    { article && article.tags.length > 0 ? (
                    article.tags.map((tag: any, index: number) => (
                        <div key={tag.id || index}>
                            <p>{tag.tag.name}</p>
                        </div>
                    ))
                    ) : (
                        <div >No tags</div>
                    )}

                </div>
        </div>
        </>
    )
}

export default ArticlePage