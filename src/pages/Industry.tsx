import React from 'react';
import { useParams } from '../components/Router';
import { SearchBar } from '../components/SearchBar';
import { IntegrationList } from '../components/IntegrationList';
import { FilterPanel } from '../components/FilterPanel';

export function Industry() {
  const { id } = useParams<{ id: string }>();

  const industryData = {
    ecommerce: {
      title: 'E-commerce',
      description: 'Integraciones para tiendas online',
    },
    healthcare: {
      title: 'Salud',
      description: 'Soluciones para el sector salud',
    },
    marketing: {
      title: 'Marketing',
      description: 'Herramientas de marketing digital',
    },
  }[id] || { title: 'Industria', description: 'Descripción' };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{industryData.title}</h1>
        <p className="mt-2 text-gray-600">{industryData.description}</p>
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <FilterPanel />
        </div>
        <div className="flex-1">
          <SearchBar className="mb-6" />
          <IntegrationList industryId={id} />
        </div>
      </div>
    </div>
  );
}