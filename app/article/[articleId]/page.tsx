"use client"

import React, { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';

type Params = {
    articleId: string;
  };

type Article = {
    id: string;
    title: string;
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
  
  const ArticlePage = ({ params }: { params: Params }) => {
    const [article, setArticle] = useState<Article | null>(null); // Initialisation avec null
    const { articleId } = params; 

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
                    article.tags.map((tag: Tag, index: number) => (
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