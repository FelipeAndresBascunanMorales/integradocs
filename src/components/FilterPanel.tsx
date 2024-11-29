import { useSearch } from '../context/SearchContext';
import { cn } from '../lib/utils';

export function FilterPanel({className = ''}: {className?: string}) {
  const { filters, setFilters } = useSearch();

  const complexityOptions = ['Baja', 'Media', 'Alta'];
  const costOptions = ['Gratis', 'Freemium', 'Pago'];

  return (
    <div className={cn(className, "bg-white p-6 rounded-lg shadow-sm border border-gray-200")}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>

      {/* Complexity Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Complejidad</h3>
        {complexityOptions.map((option) => (
          <label key={option} className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={filters.complexity.includes(option)}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  complexity: e.target.checked
                    ? [...prev.complexity, option]
                    : prev.complexity.filter((c) => c !== option),
                }));
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </div>

      {/* Cost Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Costo</h3>
        {costOptions.map((option) => (
          <label key={option} className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={filters.cost.includes(option)}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  cost: e.target.checked
                    ? [...prev.cost, option]
                    : prev.cost.filter((c) => c !== option),
                }));
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </div>

      {/* Developer Required Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Requiere Desarrollador
        </h3>
        <select
          value={filters.developerRequired === null ? '' : filters.developerRequired.toString()}
          onChange={(e) => {
            const value = e.target.value;
            setFilters((prev) => ({
              ...prev,
              developerRequired:
                value === '' ? null : value === 'true',
            }));
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Todos</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  );
}