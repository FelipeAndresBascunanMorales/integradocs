import React from 'react';
import { Integration } from '../types/integration';

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  filters: {
    complexity: string[];
    pricing: string[];
    requireDev: boolean | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      complexity: string[];
      pricing: string[];
      requireDev: boolean | null;
    }>
  >;
  applyFilters: (integrations: Integration[]) => Integration[];
};

const SearchContext = React.createContext<SearchContextType>({
  query: '',
  setQuery: () => {},
  filters: {
    complexity: [],
    pricing: [],
    requireDev: null,
  },
  setFilters: () => {},
  applyFilters: () => [],
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState({
    complexity: [],
    pricing: [],
    requireDev: null,
  } as SearchContextType['filters']);

  function applyFilters(integrations: Integration[]) {
    return integrations.filter(e => {
      const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesComplexity = filters.complexity.length === 0 ||
        e.complexity && filters.complexity.includes(e.complexity);
      
      const matchespricing = filters.pricing.length === 0 ||
        filters.pricing.includes(e.pricing?.[0] || 'Gratis');
      
      const matchesDeveloper = filters.requireDev === null ||
        filters.requireDev === e.requireDev;

      return matchesQuery && matchesComplexity && matchespricing && matchesDeveloper;
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