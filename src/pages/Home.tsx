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
import NeedsSearch from '../components/NeedsSearch';

export function Home() {
  const { query, applyFilters, setQuery } = useSearch();
  const { integrations } = useIntegrations();
  const [renderSearchResult, setRenderSearchresult] = useState(false);
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);
  const [SearchWithAi, setSearchWithAi] = useState(false);


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

        <div className='flex justify-center space-x-1   place-content-center'>
          <Switch checked={SearchWithAi} onChange={setSearchWithAi} />
          <span className='font-semibold'>Búsqueda con IA</span><Sparkles className=' text-fuchsia-600 p-1 mr-1' />
        </div>


        <div className="h-44 relative">
          <div 
            className={`absolute w-full transition-all duration-700 transform ${
              SearchWithAi 
                ? 'opacity-100 translate-x-0' 
                : `opacity-0 translate-x-20 pointer-events-none`
            }`}
          >
            <NeedsSearch />
          </div>

          <div 
            className={`absolute w-full transition-all duration-700 transform ${
              SearchWithAi 
                ? 'opacity-0 -translate-x-20 pointer-events-none' 
                : 'opacity-100 translate-x-0'
            }`}
          >
            <div className='my-auto text-center space-y-4'>
              <h2 className="text-2xl font-bold">¿Buscas un integración?</h2>
              <p className='text-gray-600'>Encuéntrala aquí o activa la búsqueda con AI</p>
              <SearchBar className="max-w-2xl mx-auto" />
            </div>
          </div>
        </div>

      </div>

      <div className=' min-h-64'>
        <div className={`transition-all duration-1000 ${renderSearchResult ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1/4'}`}>
          {(renderSearchResult) && (
            <div className={`transition-all duration-1000`}>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {filteredIntegrations.map((integration) => (
                  <IntegrationCardV2 integration={integration} key={integration.$id} />
                ))}
              </div>
              {(filteredIntegrations.length >= 3) &&
            <div className="flex justify-end">
              <Link className='text-blue-500 hover:underline' to={'/all'}>ver todo</Link>
            </div>}
            {(filteredIntegrations.length === 0) && (
                <div className='text-center py-6'>
                  <h4 className="text-2xl font-bold text-gray-900">Integración no encontrada</h4>
                  <p className="mt-2 text-gray-600">Activa la búsqueda con IA.</p>
                </div>
              )}
            </div>
          )}

        </div>

          {(!renderSearchResult) && (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: 'Te ayudamos a Implementar',
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