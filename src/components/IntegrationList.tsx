import { Link } from 'react-router-dom';
import { CreditCard, Calendar, BarChart, Truck, Package } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const integrationsByIndustry = {
  ecommerce: [
    {
      id: 'transbank',
      name: 'Transbank',
      description: 'Procesa pagos con tarjetas de crédito y débito',
      icon: CreditCard,
      category: 'Pagos',
      complexity: 'Media',
      cost: 'Pago',
      developerRequired: true,
    },
    {
      id: 'chilexpress',
      name: 'Chilexpress',
      description: 'Integración con servicios de envío',
      icon: Truck,
      category: 'Envíos',
      complexity: 'Media',
      cost: 'Pago',
      developerRequired: true,
    },
    {
      id: 'bsale',
      name: 'Bsale',
      description: 'Gestión de inventario y facturación',
      icon: Package,
      category: 'Inventario',
      complexity: 'Alta',
      cost: 'Pago',
      developerRequired: true,
    },
  ],
  healthcare: [
    {
      id: 'agenda-pro',
      name: 'Agenda Pro',
      description: 'Sistema de agendamiento para profesionales',
      icon: Calendar,
      category: 'Agendamiento',
      complexity: 'Baja',
      cost: 'Freemium',
      developerRequired: false,
    },
  ],
  marketing: [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Análisis de tráfico y comportamiento',
      icon: BarChart,
      category: 'Analytics',
      complexity: 'Baja',
      cost: 'Gratis',
      developerRequired: false,
    },
  ],
};

export function IntegrationList({ industryId }: { industryId: string }) {
  const { query, filters } = useSearch();
  const integrations = integrationsByIndustry[industryId as keyof typeof integrationsByIndustry] || [];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesQuery = integration.name.toLowerCase().includes(query.toLowerCase()) ||
      integration.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesComplexity = filters.complexity.length === 0 ||
      filters.complexity.includes(integration.complexity);
    
    const matchesCost = filters.cost.length === 0 ||
      filters.cost.includes(integration.cost);
    
    const matchesDeveloper = filters.developerRequired === null ||
      filters.developerRequired === integration.developerRequired;

    return matchesQuery && matchesComplexity && matchesCost && matchesDeveloper;
  });

  if (filteredIntegrations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron integraciones que coincidan con los filtros.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredIntegrations.map((integration) => (
        <Link
          key={integration.id}
          to={`/integration/${integration.id}`}
          className="block group"
        >
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <integration.icon className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                    {integration.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-500">
                  {integration.category}
                </span>
                <div className="mt-1 text-xs text-gray-500">
                  Complejidad: {integration.complexity}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}