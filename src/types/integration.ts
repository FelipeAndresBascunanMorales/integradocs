// types/integration.ts

import { Models } from 'appwrite';

// Base type for integration data
export type IntegrationData = {
  name: string;
  description: string;
  complexityLevel?: number;
  requireDev?: boolean;
  kindOf?: 'API' | 'LowCode' | 'NoCode' | 'Service' | 'Idontknow';
  complexity?: string;
  recommended?: boolean;
  tags?: string[];
  pricing?: string[];
  category?: string;
  implementationTimeEstimate?: "1-7 días" | "8-15 días" | "15-30 días" | "30+ días";
  categoryDetails?: {
    name?: string;
    description?: string;
    icon?: string;
    industry?: string;
    commonNeeds?: string[];
  };
  industry?: string;
  icon?: string;
  integrationDetails?: {
    fullDescription?: string;
    pros?: string[];
    cons?: string[];
    documentations?: string;
    useCases?: string[];
  };
};

// Full type for stored integrations (includes Appwrite fields)
export type Integration = IntegrationData & Models.Document;

// Type for creating new integrations
export type NewIntegration = IntegrationData;

// Type for updating integrations
export type UpdateIntegration = Partial<IntegrationData>;