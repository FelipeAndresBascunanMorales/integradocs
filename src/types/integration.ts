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