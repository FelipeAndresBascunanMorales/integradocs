import { useParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { IntegrationList } from '../components/IntegrationList';
import { FilterPanel } from '../components/FilterPanel';
import InnerCategory from '../components/InnerCategory';
import { useEffect } from 'react';
import { getIntegrationsByIndustry } from '../context/appwriteProvider.js';
import { useIntegrations } from '../context/integrationsData.js';

export function Industry() {
  const { id = 'unknown' } = useParams<{ id: string }>();
  const { addIntegrationByIndustry } = useIntegrations()

  useEffect(() => {
    const fetchIntegrations = async () => {
      const newIntegrations = await getIntegrationsByIndustry(id);
      addIntegrationByIndustry(id, newIntegrations.documents);
    };
    fetchIntegrations();
  }, [id]);

  const industryData = {
    ecommerce: {
      title: 'E-commerce',
      description: 'Integraciones para tiendas online',
      innerCategory: ['stock', 'payments', 'shipping'],
    },
    healthcare: {
      title: 'Salud',
      description: 'Soluciones para el sector salud',
      innerCategory: ['appointments', 'patient-records', 'billing'],
    },
    marketing: {
      title: 'Marketing',
      description: 'Herramientas de marketing digital',
      innerCategory: ['analytics', 'email-marketing', 'social-media'],
    },
    unknown: {
      title: 'Unknown industry',
      description: 'Try selecting an industry from the sidebar',
      innerCategory: ['unknown'],
    },
  }[id] || { title: 'Unknown industry',
    description: 'Try selecting an industry from the sidebar',
    innerCategory: ['unknown'],
  };


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
      <div>
        <InnerCategory industryId={id} >
        </InnerCategory>
      </div>
    </div>
  );
}