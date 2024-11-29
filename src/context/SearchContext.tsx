import React from 'react';
import { Integration } from '../types/integration';

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  filters: {
    complexity: string[];
    cost: string[];
    developerRequired: boolean | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      complexity: string[];
      cost: string[];
      developerRequired: boolean | null;
    }>
  >;
  applyFilters: (integrations: Integration[]) => Integration[];
};

const SearchContext = React.createContext<SearchContextType>({
  query: '',
  setQuery: () => {},
  filters: {
    complexity: [],
    cost: [],
    developerRequired: null,
  },
  setFilters: () => {},
  applyFilters: () => [],
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState({
    complexity: [],
    cost: [],
    developerRequired: null,
  } as SearchContextType['filters']);

  function applyFilters(integrations: Integration[]) {
    return integrations.filter(e => {
      const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesComplexity = filters.complexity.length === 0 ||
        e.complexity && filters.complexity.includes(e.complexity);
      
      const matchesCost = filters.cost.length === 0 ||
        filters.cost.includes(e.cost);
      
      const matchesDeveloper = filters.developerRequired === null ||
        filters.developerRequired === e.developerRequired;

      return matchesQuery && matchesComplexity && matchesCost && matchesDeveloper;
    });
  }

  return (
    <SearchContext.Provider value={{ query, setQuery, filters, setFilters, applyFilters }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return React.useContext(SearchContext);
}