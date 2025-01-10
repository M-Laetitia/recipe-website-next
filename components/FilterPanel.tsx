import React, { useState } from 'react'

interface FilterOption {
    id: string;
    name: string;
}

interface FilterPanelProps {
    title: string; // > Main category 
    options: FilterOption[]; // > list of options
    onFilterChange: (selectedId: string | null) => void; // Callback for when an option is selected
    // void : fonction qui ne retourne rien
}

const FilterPanel: React.FC<FilterPanelProps> = ({ title, options, onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const handleFilterClick = (name: string) => {
        const newFilter = selectedFilter === name ? null : name; // désélectionne si déjà sélectionné
        setSelectedFilter(newFilter);
        onFilterChange(newFilter);
      };


  return (
    <>
    <div>FILTERS : </div>
    <div>{title}</div>
    <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.name}
            className={`px-4 py-2 rounded text-black ${
              selectedFilter === option.name ? 'bg-orange-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleFilterClick(option.name)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default FilterPanel