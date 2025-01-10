"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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

const SearchPage = () => {
  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`/api/search?keyword=lasagna`);
      const data = await response.json();
      setResults(data);
    };
    fetchResults();
  }, []);

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
