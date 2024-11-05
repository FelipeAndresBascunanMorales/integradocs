import { Link } from 'react-router-dom';
import { CreditCard, Calendar, BarChart, Award, Package, Truck } from 'lucide-react';
import ComplexityIndicator from './ui/complexityIndicator';

const featuredIntegrations =   [
  {
    industry: 'ecommerce',
    id: 'transbank',
    name: 'Transbank',
    description: 'Procesa pagos con tarjetas de crédito y débito',
    icon: CreditCard,
    category: 'Pagos',
    complexity: 'Media',
    cost: 'Pago',
    developerRequired: true,
    complexityLevel: 50,
    recommended: true,
    tags: [
      {
        name: 'Pagos',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        name: 'Transbank',
        color: 'bg-green-100 text-green-800',
      }
    ]
  },
  {
    industry: 'ecommerce',
    id: 'chilexpress',
    name: 'Chilexpress',
    description: 'Integración con servicios de envío',
    icon: Truck,
    category: 'Envíos',
    complexity: 'Media',
    cost: 'Pago',
    developerRequired: true,
    complexityLevel: 70,
    recommended: true,
    tags: [
      {
        name: 'Envíos',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        name: 'Chilexpress',
        color: 'bg-green-100 text-green-800',
      }
    ]
  },
  {
    industry: 'ecommerce',
    id: 'bsale',
    name: 'Bsale',
    description: 'Gestión de inventario y facturación',
    icon: Package,
    category: 'Inventario',
    complexity: 'Alta',
    cost: 'Pago',
    developerRequired: true,
    complexityLevel: 60,
    recommended: true,
    tags: [
      {
        name: 'Inventario',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        name: 'Bsale',
        color: 'bg-green-100 text-green-800',
      },
    ]
  },
    {
    industry: 'healthcare',
    id: 'agenda-pro',
    name: 'Agenda Pro',
    description: 'Sistema de agendamiento para profesionales',
    icon: Calendar,
    category: 'Agendamiento',
    complexity: 'Baja',
    cost: 'Freemium',
    developerRequired: false,
    complexityLevel: 40,
    recommended: false,
    tags: [
      {
        name: 'Agendamiento',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        name: 'Agenda Pro',
        color: 'bg-green-100 text-green-800',
      }
    ]
  },
  {
    industry: 'marketing',
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Análisis de tráfico y comportamiento',
    icon: BarChart,
    category: 'Analytics',
    complexity: 'Baja',
    cost: 'Gratis',
    developerRequired: false,
    complexityLevel: 80,
    recommended: false,
    tags: [
      {
        name: 'Analytics',
        color: 'bg-blue-100 text-blue-800',
      },
      {
        name: 'Google Analytics',
        color: 'bg-green-100 text-green-800',
      }
    ]
  },
]

const costColors = {
  Gratis: 'text-green-600',
  Pago: 'text-red-600',
  Freemium: 'text-yellow-600',
};

export function IntegrationCard({integrations} = {integrations: featuredIntegrations}) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <Link
          key={integration.id}
          to={`/integration/${integration.id}`}
          className="block group"
        >
          <div className="h-full p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
            <div className='flex justify-between'>
              <div className="flex items-center mb-4">
                <integration.icon className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {integration.category}
                </span>
              </div>
              {integration.recommended && ( <Award className="h-6 w-6 text-yellow-500"/>)}
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
            <ComplexityIndicator value={integration.complexityLevel}></ComplexityIndicator>
            <div className="text-right">
              <span className="text-xs text-gray-500">
                Pricing: <b className={costColors[integration.cost as keyof typeof costColors]}>{integration.cost}</b>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}