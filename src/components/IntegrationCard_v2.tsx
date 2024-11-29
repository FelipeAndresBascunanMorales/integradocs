import { Link } from 'react-router-dom';
import { Award, Package } from 'lucide-react';
import ComplexityIndicator from './ui/complexityIndicator';
import { Integration } from '../types/integration';

const costColors = {
  Gratis: 'text-green-600',
  Pago: 'text-red-600',
  Freemium: 'text-yellow-600',
};

export default function IntegrationCardV2({integration} : { integration: Integration }) {
  return (
    <>
      {(integration) && (
        <Link
          key={integration.id}
          to={`/integration/${integration.id}`}
          className="block group"
        >
          <div className="h-full p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
            <div className='flex justify-between'>
              <div className="flex items-center mb-4">
                {(integration.icon) ? (
                  <img 
                  src={integration.icon} 
                  alt="integration icon" 
                  className="h-auto w-6 "
                  onError={(e) => { e.currentTarget.src = '/workflow.svg'; }} 
                  />
                ) : (
                  <Package className="h-6 w-6 text-indigo-600" />
                )}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {integration.name}
                </span>
              </div>
              {integration.recommended && ( <Award className="h-6 w-6 text-yellow-500"/>)}
            </div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
              {integration.category}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{integration.description}</p>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium text-gray-500">
                Complejidad: {integration.complexity}
              </span>
            </div>
            {(integration.complexityLevel) && (<ComplexityIndicator value={integration.complexityLevel}></ComplexityIndicator>)}
            <div className="text-right">
              <span className="text-xs text-gray-500">
                Pricing: {integration.pricing && <b className={costColors[integration.pricing[0] as keyof typeof costColors]}>{integration.pricing[0]}</b>}
              </span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}