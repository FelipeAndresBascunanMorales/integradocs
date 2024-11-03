import React from 'react';

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
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState({
    complexity: [],
    cost: [],
    developerRequired: null,
  } as SearchContextType['filters']);

  return (
    <SearchContext.Provider value={{ query, setQuery, filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return React.useContext(SearchContext);
}