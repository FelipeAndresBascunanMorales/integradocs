import { ShoppingCart, CreditCard, Calendar, BarChart2 } from 'lucide-react';
import { Models } from 'appwrite';

export interface CategoryData {
  id: string;               // e.g., "healthcare-appointments", "ecommerce-shipping"
  name: string;             // Display name
  description: string;
  icon: React.ComponentType; // Icon component
  industries: string[];     // Which industries this category is relevant for
}

export type Category = CategoryData & Models.Document;

export const CATEGORIES = [
  {
    id: 'ecommerce-payments',
    name: 'Pagos para E-commerce',
    description: 'Procesamiento de pagos online y transacciones electrónicas',
    icon: ShoppingCart,
    industries: ['ecommerce']
  },
  {
    id: 'ecommerce-shipping',
    name: 'Envíos para E-commerce',
    description: 'Gestión de envíos para tiendas online',
    icon: CreditCard,
    industries: ['ecommerce']
  },
  {
    id: 'healthcare-appointments',
    name: 'Agendamiento Médico',
    description: 'Sistema de agendamiento para servicios de salud',
    icon: Calendar,
    industries: ['healthcare']
  },
  {
    id: 'marketing-analytics',
    name: 'Analytics de Marketing',
    description: 'Análisis y métricas para marketing digital',
    icon: BarChart2,
    industries: ['marketing']
  }
];