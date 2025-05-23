'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Recipe = { id: number; name: string };
type Article = { id: number; title: string };
type SearchResults = { recipes: Recipe[]; articles: Article[] };

export default function SearchClient() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    if (!keyword) return;

    fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`)
      .then(res => res.json())
      .then(setResults)
      .catch(console.error);
  }, [keyword]);

  if (!keyword) return <p>Please provide a keyword.</p>;

  return (
    <div>
<h1>Search results for &quot;{keyword}&quot;</h1>

      {!results ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Recipes</h2>
          {results.recipes.length ? (
            results.recipes.map(r => (
              <p key={r.id}>
                <Link href={`/recipe/${r.id}`}>{r.name}</Link>
              </p>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
          <h2>Articles</h2>
          {results.articles.length ? (
            results.articles.map(a => (
              <p key={a.id}>
                <Link href={`/article/${a.id}`}>{a.title}</Link>
              </p>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </>
      )}
    </div>
  );
}
