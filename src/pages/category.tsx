
import { useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES } from '../types/category';
import { useIntegrations } from '../context/integrationsData';
import { useEffect, useMemo } from 'react';
import IntegrationCardV2 from '../components/IntegrationCard_v2';

const CategoryPage = () => {  
  const { id = 'unknown' } = useParams<{ id: string }>();
  const { integrations } = useIntegrations();
  const navigate = useNavigate();
  const category = CATEGORIES.find((category) => category.id === id);
  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => integration.category?.toLowerCase() === category?.id);
  }, [integrations, category?.id]);

  useEffect(() => {
    document.title = `Integrations - ${category?.name}`;
  }
  , [category?.name]);

  useEffect(() => {
    if(!category) {
      navigate('/all'); // could i create a 404 page, or show a friendly message here.
    }
  },[category, navigate]);

  if(!category) {
    return null;
  }

  return (
    <div className="space-y-8">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-indigo-100 rounded-lg">
        <category.icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredIntegrations.map(integration => (
        <IntegrationCardV2
          key={integration.$id} 
          integration={integration} 
        />
      ))}
    </div>

    {filteredIntegrations.length === 0 && (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No hay integraciones disponibles en esta categoría.
        </p>
      </div>
    )}
  </div>
  );
};

export default CategoryPage;