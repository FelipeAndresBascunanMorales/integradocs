
import { useParams } from 'react-router-dom';
import { IntegrationCard } from '../components/IntegrationCard';
import { CreditCard, Truck, Package, Calendar, BarChart } from 'lucide-react';

const integrations = 
[
  {
    industry: 'ecommerce',
      id: 'transbank',
      name: 'Transbank',
      description: 'Procesa pagos con tarjetas de crédito y débito',
      icon: CreditCard,
      category: 'Pagos',
      complexity: 'Media',
      cost: 'Pago',
      developerRequired: true,
      complexityLevel: 50,
      recommended: true,
      tags: [
        {
          name: 'Pagos',
          color: 'bg-blue-100 text-blue-800',
        },
        {
          name: 'Transbank',
          color: 'bg-green-100 text-green-800',
        }
      ]
    },
    {
      industry: 'ecommerce',
      id: 'chilexpress',
      name: 'Chilexpress',
      description: 'Integración con servicios de envío',
      icon: Truck,
      category: 'Envíos',
      complexity: 'Media',
      cost: 'Pago',
      developerRequired: true,
      complexityLevel: 70,
      recommended: true,
      tags: [
        {
          name: 'Envíos',
          color: 'bg-blue-100 text-blue-800',
        },
        {
          name: 'Chilexpress',
          color: 'bg-green-100 text-green-800',
        }
      ]
    },
    {
      industry: 'ecommerce',
      id: 'bsale',
      name: 'Bsale',
      description: 'Gestión de inventario y facturación',
      icon: Package,
      category: 'Inventario',
      complexity: 'Alta',
      cost: 'Pago',
      developerRequired: true,
      complexityLevel: 60,
      recommended: true,
      tags: [
        {
          name: 'Inventario',
          color: 'bg-blue-100 text-blue-800',
        },
        {
          name: 'Bsale',
          color: 'bg-green-100 text-green-800',
        },
      ]
    },
      {
      industry: 'healthcare',
      id: 'agenda-pro',
      name: 'Agenda Pro',
      description: 'Sistema de agendamiento para profesionales',
      icon: Calendar,
      category: 'Agendamiento',
      complexity: 'Baja',
      cost: 'Freemium',
      developerRequired: false,
      complexityLevel: 40,
      recommended: false,
      tags: [
        {
          name: 'Agendamiento',
          color: 'bg-blue-100 text-blue-800',
        },
        {
          name: 'Agenda Pro',
          color: 'bg-green-100 text-green-800',
        }
      ]
    },
    {
      industry: 'marketing',
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Análisis de tráfico y comportamiento',
      icon: BarChart,
      category: 'Analytics',
      complexity: 'Baja',
      cost: 'Gratis',
      developerRequired: false,
      complexityLevel: 80,
      recommended: false,
      tags: [
        {
          name: 'Analytics',
          color: 'bg-blue-100 text-blue-800',
        },
        {
          name: 'Google Analytics',
          color: 'bg-green-100 text-green-800',
        }
      ]
    },
  ]
  
  

const CategoryPage = () => {  
  const { category = 'unknown' } = useParams<{ category: string }>();

  const categoryData = {
    Pagos: {
      title: 'Pagos',
      description: '',
    },
    Envíos: {
      title: 'Envíos',
      description: '',
    },
  }[category] || { title: 'Unknown category',
    description: 'Try selecting a different category',
  };

  const filteredIntegrations = integrations.filter((integration) => integration.category === category);

  return (
    <div>
    <div>
    <h1 className="text-3xl font-bold text-gray-900">{categoryData.title}</h1>
    <p className="mt-2 text-gray-600">{categoryData.description}</p>
  </div>
            <IntegrationCard integrations={filteredIntegrations}/>
    </div>
  );
};

export default CategoryPage;