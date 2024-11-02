import React from 'react';
import { Link } from './Router';
import { ShoppingCart, Heart, Megaphone } from 'lucide-react';

const industries = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Pagos, envíos, y gestión de inventario',
    icon: ShoppingCart,
    color: 'bg-blue-500',
  },
  {
    id: 'healthcare',
    name: 'Salud',
    description: 'Agendamiento y expedientes médicos',
    icon: Heart,
    color: 'bg-green-500',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Publicidad y análisis de datos',
    icon: Megaphone,
    color: 'bg-purple-500',
  },
];

export function IndustryGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {industries.map((industry) => (
        <Link
          key={industry.id}
          to={`/industry/${industry.id}`}
          className="block group"
        >
          <div className="h-full p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
            <div
              className={`${industry.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <industry.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
              {industry.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{industry.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}