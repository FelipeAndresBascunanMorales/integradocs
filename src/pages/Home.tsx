import { Zap, Code, DollarSign, Sparkles } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { IndustryGrid } from '../components/IndustryGrid';
import { FeaturedIntegrations } from '../components/FeaturedIntegrations';
import { useSearch } from '../context/SearchContext';
import { useEffect, useState } from 'react';
import { useIntegrations } from '../context/integrationsData';
import { Integration } from '../types/integration';
import IntegrationCardV2 from '../components/IntegrationCard_v2';
import { Switch } from '../components/Switch';
import { Link } from 'react-router-dom';

export function Home() {
  const { query, applyFilters, setQuery } = useSearch();
  const { integrations } = useIntegrations();
  const [renderSearchResult, setRenderSearchresult] = useState(false);
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);

  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setQuery('');
}, []);

  useEffect(() => {
      const filteredIntegrations = applyFilters(integrations);
    setFilteredIntegrations(filteredIntegrations.slice(0, 3));
  }, [query]);
  
  useEffect(() => {
      setRenderSearchresult(query.length !== 0);
  }, [query]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Documentación de Integraciones para Chile
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Encuentra guías detalladas para integrar servicios y APIs en tu negocio
        </p>
        <SearchBar className="max-w-2xl mx-auto" />
        <div className='flex justify-center space-x-1   place-content-center'>
          <Switch checked={isEnabled} onChange={setIsEnabled} />
          <span className='font-semibold'>Búsqueda con IA</span><Sparkles className=' text-fuchsia-600 p-1 mr-1' />
        </div>
      </div>

      <div className=' min-h-64'>
        <div className={`transition-all duration-1000 ${renderSearchResult ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1/4'}`}>
          {(renderSearchResult) && (
            <div className={`min-h-60 transition-all duration-1000`}>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {filteredIntegrations.map((integration) => (
                  <IntegrationCardV2 integration={integration} key={integration.$id} />
                ))}
              </div>
              {(filteredIntegrations.length >= 3) &&
            <div className="flex justify-end">
              <Link className='text-blue-500 hover:underline' to={'/all'}>ver todo</Link>
            </div>}
            </div>
          )}

        </div>

          {(!renderSearchResult) && (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: 'Fácil de Implementar',
                  description: 'Guías paso a paso para cada integración',
                },
                {
                  icon: Code,
                  title: 'Para Todos los Niveles',
                  description: 'Con o sin experiencia en desarrollo',
                },
                {
                  icon: DollarSign,
                  title: 'Información de Costos',
                  description: 'Detalles de precios y planes disponibles',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="text-center p-6 bg-white rounded-lg shadow-sm"
                >
                  <feature.icon className="h-8 w-8 mx-auto text-indigo-600" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
        )}
      </div>

      {/* Industries Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Explora por Industria
        </h2>
        <IndustryGrid />
      </div>

      {/* Featured Integrations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Integraciones Destacadas
        </h2>
        <FeaturedIntegrations />
      </div>
    </div>
  );
}