import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import appwriteProvider from '../context/appwriteProvider.js';
import { useIntegrations } from '../context/integrationsData.js';
import { SearchBar } from '../components/SearchBar';
import { IntegrationList } from '../components/IntegrationList';
import { FilterPanel } from '../components/FilterPanel';
import InnerCategory from '../components/InnerCategory';
import { Integration } from '../types/integration.js';
import { INDUSTRIES } from '../types/Industry.js';
import React from 'react';

export function Industry() {
  const { id: industryId = 'unknown' } = useParams<{ id: string }>();
  const { addIntegrationByIndustry } = useIntegrations();

  const industry = INDUSTRIES.find((industry) => industry.id === industryId);
  const industryCategories = industry?.categories || [];

  useEffect(() => {
    const fetchIntegrations = async () => {
      const newIntegrations = await appwriteProvider().getIntegrationsByIndustry(industryId);
      addIntegrationByIndustry(industryId, newIntegrations.documents as Integration[]);
    };
      fetchIntegrations();
    }, [industryId]);



  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{industry?.name}</h1>
        <p className="mt-2 text-gray-600">{industry?.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Categorías en {industry?.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industryCategories.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="p-4 bg-white rounded-lg border hover:border-indigo-200"
            >
              <div className="flex items-center gap-3">
                {/* a little weird solution */}
                {category.icon && React.createElement(category.icon as React.ElementType, { className: "w-5 h-5 text-indigo-600" })}
                <h3 className="font-medium">{category.name}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <FilterPanel />
        </div>
        <div className="flex-1">
          <SearchBar className="mb-6" />
          <IntegrationList industryId={industryId} />
        </div>
      </div>
      <div>
        <InnerCategory industryId={industryId} >
        </InnerCategory>
      </div>
    </div>
  );
}