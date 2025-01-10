'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import FilterPanel from '@/components/FilterPanel';

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
  };
  tags: Tag[];
};

type Tag = {
  id: string;
  name: string;

  tag: {
    id: string;
    name: string;
  };
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]); // Articles filtrés par tag

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('api/article');
      const data = await response.json();

      setArticles(data);
      setFilteredArticles(data); // Par défaut, tous les articles sont affichés
      console.log('articles', data);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/tag');
      const data = await response.json();
      setTags(data);
    };
    fetchTags();
  }, []);

  const handleFilterChange = (selectedTag: string | null) => {
    console.log('selectedTag', selectedTag);
    if (!selectedTag) {
      setFilteredArticles(articles); // Si aucun tag n'est sélectionné, réinitialiser à tous les articles
    } else {
      // Filtrer les articles en fonction du tag sélectionné
      const filtered = articles.filter((article: Article) =>
        article.tags.some((tag) => tag.tag.name === selectedTag),
      );
      setFilteredArticles(filtered); // Mettre à jour les articles filtrés
    }
  };

  // Les recettes à afficher (par défaut ou filtrées)
  const articlesToDisplay = filteredArticles || articles;
  console.log('articlesToDisplay', articlesToDisplay);

  return (
    <>
      <h1>BLOG - ARTICLES</h1>

      <h2>Filters</h2>
      <FilterPanel
        title="Tags"
        options={tags}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-4 gap-12">
        {articlesToDisplay.length === 0 ? (
          <p>No articles found. Try adjusting your filters.</p>
        ) : (
          articlesToDisplay.map((article: Article, index: number) => (
            <ArticleCard key={index} article={article} />
          ))
        )}
      </div>

      <div>
        {articlesToDisplay.map((article: Article, index: number) => (
          // 1° >nom de la proppriété (prop)   2°>la valeur (object article en entier récupéré dans mon tableau d'articles lui même alimenté par l'api et articles > tableau)
          <div key={article.id || index}>
            <p>
              {/* <Link href={`/recipe/${recipe.id}`}> */}
              <Link href={`/article/${article.id}`}>
                {article.title} - {article.content} -{' '}
                {formatDate(article.createdAt)} - by {article.user.username}
              </Link>
            </p>
            <p>tags : </p>

            {article && article.tags.length > 0 ? (
              article.tags.map((tag: Tag, index: number) => (
                <p key={tag.id || index}>{tag.tag.name}</p>
              ))
            ) : (
              <p>No tags available</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticlesPage;
