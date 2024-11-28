import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import ComplexityIndicator from './ui/complexityIndicator';
import { Integration } from '../context/integrationsData';
import { parameterize } from '../lib/utils';

const costColors = {
  Gratis: 'text-green-600',
  Pago: 'text-red-600',
  Freemium: 'text-yellow-600',
};

const tagColor = 'bg-gray-200';

export function IntegrationListByCategory({integrations} : {integrations: Integration[]}) {

  if (integrations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron integraciones que coincidan con los filtros.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {integrations.map((integration) => (
        <Link
          key={integration.$id}
          to={`/integration/${parameterize(integration.name)}`}
          state= { integration }
          className="block group px-12"
        >
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <integration.icon className="h-6 w-6 text-indigo-600" /> */}
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                  <span className="inline-flex">{integration.name} {integration.recommended && ( <Award className="h-6 w-6 text-yellow-500"/>)}</span>
                    <div className='mt-1 text-xs text-gray-500'>
                    </div>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {integration.description}
                  </p>
                  <div className='flex gap-2'>
                    {integration.tags && (integration.tags.map((tag: string) => <span key={tag} className={`rounded-full mt-2 text-xs text-gray-500 p-1 px-4 ${tagColor}`}> {tag} </span>))}
                  </div>
                </div>
              </div>
              <div className="text-left">
                <span className="text-xs text-gray-500">
                  Pricing: <b className={costColors[integration.cost as keyof typeof costColors]}>{integration.cost}</b>
                </span>
                <div className="text-xs text-gray-500">
                  Complejidad: {integration.complexity}
                      <ComplexityIndicator value={integration.complexityLevel || 0}></ComplexityIndicator>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}