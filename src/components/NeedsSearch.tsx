import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NeedsSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const SPELL = '✨'

  // This will handle both direct searches and AI-powered suggestions
  const handleSearch = async (input: string) => {
    if (!input.trim()) return;
    setIsSearching(true);
    try {
      const encodedQuery = encodeURIComponent(input.trim());
      navigate(`/oursuggestion/?prompt=${encodedQuery}`);
      // Process and display results
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">¿Qué necesitas resolver?</h2>
        <p className="text-gray-600">
          Cuéntanos tu necesidad y te ayudaremos a encontrar la mejor solución
        </p>
        
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            placeholder={`${ SPELL }Por ejemplo: Necesito controlar mi inventario...`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchInput)}
          />
          <button 
            className="absolute right-2 top-2 p-2 text-gray-400 hover:text-indigo-600"
            onClick={() => handleSearch(searchInput)}
          >
            {isSearching ? (
              <span className="loading">Buscando...</span>
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex gap-2 justify-center items-center text-sm text-gray-500">
          Búsquedas populares:
          <button 
            className="hover:text-indigo-600 text-sm font-semibold rounded-full border py-1 px-4 border-gray-300 hover:border-indigo-600"
            onClick={() => setSearchInput("Necesito procesar pagos online")}
          >
            procesar pagos
          </button>
          <button 
            className="hover:text-indigo-600 text-sm font-semibold rounded-full border py-1 px-4 border-gray-300 hover:border-indigo-600"
            onClick={() => setSearchInput("Quiero gestionar citas médicas")}
          >
            gestionar citas
          </button>
        </div>
      </div>
    </div>
  );
}