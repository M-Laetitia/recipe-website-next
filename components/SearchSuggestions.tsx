import React from "react";
import Link from "next/link";

interface SearchSuggestionsProps {
    suggestions: { recipes: { id: string; name: string }[]; articles: { id: string; title: string }[] }; 
    isLoading: boolean;
}

// const SearchSuggestions = ( suggestions , isLoading : SearchSuggestionsProps) => {
    const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, isLoading }) => {

    if (isLoading) return <p>Loading...</p>;
    if (suggestions.recipes.length === 0 && suggestions.articles.length === 0) return <p>No results found</p>;

    return (
        <div className="absolute bg-white border mt-1 w-full max-w-xs shadow-lg z-50">
          {suggestions.recipes.length > 0 && suggestions.recipes.map((suggestion) => (
            <div key={suggestion.id} className="p-2">
                <Link 
                href={`/recipe/${suggestion.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                >
                {suggestion.name}
                </Link>
              
            </div>
          ))}
    
          {suggestions.articles.length > 0 && suggestions.articles.map((suggestion) => (
            <div key={suggestion.id} className="p-2">
                <Link 
                    href={`/article/${suggestion.id}`}
                    target="_blank" 
                    rel="noopener noreferrer">
                    {suggestion.title}
                </Link>
            
          </div>
          ))}
        </div>
      );
    }

export default SearchSuggestions