import { Zap, Code, DollarSign } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { IndustryGrid } from '../components/IndustryGrid';
import { FeaturedIntegrations } from '../components/FeaturedIntegrations';

export function Home() {
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
      </div>

      {/* Features */}
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