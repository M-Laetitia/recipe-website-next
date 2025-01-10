"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';  

type Recipe = {
  id: number;
  name: string;
};

type Article = {
  id: number;
  title: string;
};

type SearchResults = {
  recipes: Recipe[];
  articles: Article[];
};

// version formatée : 
// type SearchResults = {
//     recipes: Array<{ id: number; name: string }>;
//     articles: Array<{ id: number; title: string }>;
// };

type Props = {
    params: Promise<{ keyword: string }>
  }

const SearchPage = ({ params }: Props) => {
  const [results, setResults] = useState<SearchResults | null>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword'); 
  

    console.log("keyword", keyword);

    useEffect(() => {
        if (keyword) {
          const fetchResults = async () => {
            try {
              const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`); // encoder le composant d'URL
              const data = await response.json();
              setResults(data);
            } catch (error) {
              console.error("Error fetching search results:", error);
            }
          };
    
          fetchResults();
        }
      }, [keyword]); // Exécuter l'effet chaque fois que 'keyword' change

  return (
    <div>
      <h1>Results:</h1>
      <div>
        {results ? (
          <>
            <h2>RECIPES:</h2>
            <div>
              {results.recipes.length > 0 ? (
                results.recipes.map((recipe: Recipe, index: number) => (
                  <div key={index}>
                    <p>
                      <Link href={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                    </p>
                  </div>
                ))
              ) : (
                <p>No results found for recipes.</p>
              )}
            </div>

            <h2>ARTICLES:</h2>
            <div>
              {results.articles.length > 0 ? (
                results.articles.map((article: Article, index: number) => (
                  <div key={index}>
                    <p>
                      <Link href={`/article/${article.id}`}>
                        {article.title}
                      </Link>
                    </p>
                  </div>
                ))
              ) : (
                <p>No results found for articles.</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
