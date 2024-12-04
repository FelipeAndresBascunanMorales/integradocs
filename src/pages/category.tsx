
import { useNavigate, useParams } from 'react-router-dom';
import appwriteProvider from '../context/appwriteProvider'
import { useEffect, useMemo } from 'react';
import IntegrationCardV2 from '../components/IntegrationCard_v2';

const CategoryPage = () => {  
  const { name = 'unknown' } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { getIntegrationsByCategory, getCategory } = appwriteProvider();

  const filteredIntegrations = useMemo(() => {
    async function fetchIntegrations() {
      return await getIntegrationsByCategory(name)
    }
    fetchIntegrations();
  }, [name, getIntegrationsByCategory]);

  const category = useMemo(() => {
    async function fetchCategory() {
      return await getCategory(name);
    }
    fetchCategory();
  }, [name, getCategory]);
    
    useEffect(() => {
    async function fetchData() {
      document.title = `Integrations - ${(await category)?.name}`;
    }
    fetchData();
  }
  , [name, category]);

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