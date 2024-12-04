import { useSearch } from '../context/SearchContext';
import { cn } from '../lib/utils';
import { LucideFolderCheck, DollarSign as Freemium, CreditCard as Os } from 'lucide-react';

export function FilterPanel({className = ''}: {className?: string}) {
  const { filters, setFilters } = useSearch();
  
  const complexityLevels = [
    { value: "Baja", label: "Baja", description: "Integración simple y directa" },
    { value: "Media", label: "Media", description: "Requiere configuración moderada" },
    { value: "Alta", label: "Alta", description: "Configuración y desarrollo avanzado" }
  ];
  

  const pricingTypes = [
    { value: "Gratis", label: "Gratis", icon: LucideFolderCheck },
    { value: "Freemium", label: "Freemium", icon: Freemium },
    { value: "Pago", label: "Pago", icon: Os }
  ];

  // Handler for changing multiple filters
  const handleFilterChange = (filterType: 'complexity' | 'pricing', value: string, checked: boolean) => {
    setFilters(current => ({
      ...current,
      [filterType]: checked 
        ? [...current[filterType], value]
        : current[filterType].filter((item: string) => item !== value)
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      complexity: [],
      pricing: [],
      requireDev: null
    });
  };

  return (
    <div className={cn(className, "bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4")}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Complexity Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium text-gray-900">Complejidad</h3>
        {complexityLevels.map(({ value, label, description }) => (
          <label key={value} className="flex items-start gap-3 group cursor-pointer">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={filters.complexity.includes(value)}
                onChange={(e) => handleFilterChange('complexity', value, e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {label}
              </span>
              <span className="text-xs text-gray-500">
                {description}
              </span>
            </div>
          </label>
        ))}
      </div>

      {/* pricing Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-medium text-gray-900">pricing</h3>
        {pricingTypes.map(({ value, label, icon: Icon }) => (
          <label key={value} className="flex items-center gap-3 group cursor-pointer">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={filters.pricing.includes(value)}
                onChange={(e) => handleFilterChange('pricing', value, e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {label}
              </span>
            </div>
          </label>
        ))}
      </div>

      {/* Developer Required Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Requiere Desarrollador</h3>
        <select
          value={filters.requireDev === null ? "" : filters.requireDev.toString()}
          onChange={(e) => {
            const value = e.target.value;
            setFilters(current => ({
              ...current,
              requireDev: value === "" ? null : value === "true"
            }));
          }}
          className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Todos</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  );
}