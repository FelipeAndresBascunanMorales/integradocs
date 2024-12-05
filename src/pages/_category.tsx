import { useNavigate, useParams } from 'react-router-dom';
import { createElement, ElementType, useEffect, useState } from 'react';
import appwriteProvider from '../context/appwriteProvider';
import IntegrationCardV2 from '../components/IntegrationCard_v2';
import { Category } from '../types/category';
import { Integration } from '../types/integration';

//I will use the getCategories function because i havent the name parameterized in the db
const CategoryPage = () => {  
  const { name = 'unknown' } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { getIntegrationsByCategory, getCategory } = appwriteProvider();
  
  // Use state to store the async data
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [categoryData, integrationsData] = await Promise.all([
          getCategory(name),
          getIntegrationsByCategory(name)
        ]);
        
        setCategory(categoryData as Category);
        setFilteredIntegrations(integrationsData.documents as Integration[] || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [name, getIntegrationsByCategory, getCategory]);

  // Update document title when category changes
  useEffect(() => {
    if (category?.name) {
      document.title = `Integrations - ${category.name}`;
    }
  }, [category]);

  // Navigate away if category doesn't exist
  
  if (!category) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-100 rounded-lg">
        {category.icon && createElement(category.icon as ElementType, { className: "w-5 h-5 text-indigo-600" })}
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