import { Link } from 'react-router-dom';
import { CreditCard, Calendar, BarChart } from 'lucide-react';

const featuredIntegrations = [
  {
    id: 'transbank',
    name: 'Transbank',
    description: 'Procesa pagos con tarjetas de crédito y débito',
    icon: CreditCard,
    category: 'Pagos',
    complexity: 'Media',
  },
  {
    id: 'agenda-pro',
    name: 'Agenda Pro',
    description: 'Sistema de agendamiento para profesionales',
    icon: Calendar,
    category: 'Agendamiento',
    complexity: 'Baja',
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Análisis de tráfico y comportamiento',
    icon: BarChart,
    category: 'Analytics',
    complexity: 'Baja',
  },
];

export function FeaturedIntegrations() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {featuredIntegrations.map((integration) => (
        <Link
          key={integration.id}
          to={`/integration/${integration.id}`}
          className="block group"
        >
          <div className="h-full p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
            <div className="flex items-center mb-4">
              <integration.icon className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-sm font-medium text-gray-500">
                {integration.category}
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
              {integration.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{integration.description}</p>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium text-gray-500">
                Complejidad: {integration.complexity}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}