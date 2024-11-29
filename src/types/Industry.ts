import { ShoppingCart, CreditCard, Truck, Package, Heart, Calendar, BookOpen, DollarSign, Megaphone, ChartBar, Lamp, Sparkles } from 'lucide-react';
import React from 'react';

interface Industry {
  id: string;          // Unique identifier
  name: string;        // Display name
  description: string; // Description of the industry
  icon: React.ComponentType;          // Icon component always a factory
  categories: {       // Categories specific to this industry
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType;
  }[];
  commonNeeds: string[]; // Common problems/needs in this industry
}

const INDUSTRIES: Industry[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Soluciones para tiendas online y comercio electrónico',
    icon: ShoppingCart, // ShoppingCart icon
    categories: [
      {
        id: 'ecommerce-payments',
        name: 'Pagos',
        description: 'Procesamiento de pagos y transacciones',
        icon: CreditCard // CreditCard icon
      },
      {
        id: 'ecommerce-shipping',
        name: 'Envíos',
        description: 'Gestión y tracking de envíos',
        icon: Truck // Truck icon
      },
      {
        id: 'ecommerce-inventory',
        name: 'Inventario',
        description: 'Control y gestión de stock',
        icon: Package // Package icon
      }
    ],
    commonNeeds: [
      'Procesar pagos online',
      'Gestionar envíos',
      'Control de inventario',
      'Facturación electrónica',
      'Marketing digital'
    ]
  },
  {
    id: 'healthcare',
    name: 'Salud',
    description: 'Soluciones para clínicas, consultorios y servicios de salud',
    icon: Heart, // Heart icon
    categories: [
      {
        id: 'healthcare-appointments',
        name: 'Agendamiento',
        description: 'Gestión de citas y agenda médica',
        icon: Calendar // Calendar icon
      },
      {
        id: 'healthcare-records',
        name: 'Fichas Clínicas',
        description: 'Gestión de fichas e historiales médicos',
        icon: BookOpen // BookOpen icon
      },
      {
        id: 'healthcare-billing',
        name: 'Facturación',
        description: 'Facturación y cobros médicos',
        icon: DollarSign // DollarSign icon
      }
    ],
    commonNeeds: [
      'Agendar citas médicas',
      'Gestionar fichas clínicas',
      'Facturación de consultas',
      'Telemedicina',
      'Comunicación con pacientes'
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Soluciones para marketing digital y análisis',
    icon: Megaphone, // Megaphone icon
    categories: [
      {
        id: 'marketing-analytics',
        name: 'Analytics',
        description: 'Análisis y métricas de marketing',
        icon: ChartBar // ChartBar icon
      },
      {
        id: 'marketing-automation',
        name: 'Automatización',
        description: 'Automatización de marketing',
        icon: Lamp // Lamp icon
      },
      {
        id: 'marketing-social',
        name: 'Redes Sociales',
        description: 'Gestión de redes sociales',
        icon: Sparkles // Sparkles icon
      }
    ],
    commonNeeds: [
      'Analizar métricas de marketing',
      'Automatizar campañas',
      'Gestionar redes sociales',
      'Email marketing',
      'SEO y posicionamiento'
    ]
  }
];

export function getIndustryById(id: string): Industry | undefined {
  return INDUSTRIES.find(industry => industry.id === id);
}

export function getCategoryById(id: string): Industry['categories'][0] | undefined {
  for (const industry of INDUSTRIES) {
    const category = industry.categories.find(cat => cat.id === id);
    if (category) return category;
  }
  return undefined;
}

export function getIndustryByCategory(categoryId: string): Industry | undefined {
  return INDUSTRIES.find(industry => 
    industry.categories.some(cat => cat.id === categoryId)
  );
}

export type { Industry };
export { INDUSTRIES };