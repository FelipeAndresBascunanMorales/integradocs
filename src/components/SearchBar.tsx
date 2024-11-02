import React from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

export function SearchBar({ className = '' }: { className?: string }) {
  const { query, setQuery } = useSearch();

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Buscar integraciones..."
      />
    </div>
  );
}