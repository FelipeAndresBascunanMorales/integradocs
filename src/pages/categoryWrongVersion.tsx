import { Link, useParams } from 'react-router-dom';
import { createElement, ElementType, useEffect, useState } from 'react';
import appwriteProvider from '../context/appwriteProvider';
import IntegrationCardV2 from '../components/IntegrationCard_v2';
import { Category } from '../types/category';
import { Integration } from '../types/integration';
import { parameterize } from '../lib/utils';

//I will use the getCategories function because i havent the name parameterized in the db
const CategoryPage = () => {  
  const { name = 'unknown' } = useParams<{ name: string }>();
  const { getCategories } = appwriteProvider();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
      async function fetchData() {
        setLoading(true)
        try {
          const categoriesData = await getCategories();
          const filteredCategory = categoriesData.documents.find((category) => (parameterize(category.name) === name)) as Category;
          setCategory(filteredCategory);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        finally {
          setLoading(false)
        }    
      }
      fetchData();
  }, [name, getCategories]);

  // Update document title when category changes
  useEffect(() => {
    if (category?.name) {
      document.title = `Integrations - ${category.name}`;
    }
  }, [category]);

  if (loading) {
    return <div className='text-center'>
    <span>loading...</span>
    </div>
  }

  else if (!category) {
    return <>
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Integración no encontrada</h1>
        <p className="mt-2 text-gray-600">La integración que buscas no existe.</p>
        <Link to={-1 as unknown as string} className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
          Volver
        </Link>
      </div>
    </>;
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
        {category.integrations.map((integration: Integration) => (
          <IntegrationCardV2
            key={integration.$id} 
            integration={integration} 
          />
        ))}
      </div>

      {category.integrations.length === 0 && (
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