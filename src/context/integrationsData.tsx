import React, { createContext, useContext, useState } from 'react';
import { latestIntegrations } from './appwriteProvider.js'
import { Integration } from '../types/integration.js';
import { Category } from '../types/category.js';


interface IntegrationsByIndustry {
  [key: string]: Integration[];
}

interface IntegrationsContextType {
  integrations: Integration[];
  addIntegration: (integration: Integration) => void;
  integrationsByIndustry: IntegrationsByIndustry;
  addIntegrationByIndustry: (industry: string, integration: Integration[]) => void;
  categories: Category[];
  addCategories: (category: Category[]) => void;
}

const initialIntegrations: Integration[] = latestIntegrations;

const IntegrationsContext = createContext<IntegrationsContextType | undefined>(undefined);

export const IntegrationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [integrationsByIndustry, setIntegrationsByIndustry] = useState<IntegrationsByIndustry>({});
  const [categories, setCategories] = useState<Category[]>([]);

  const addIntegration = (integration: Integration) => {
    setIntegrations([...integrations, integration]);
  };

  const addIntegrationByIndustry = (industry: string, integration: Integration[]) => {
    setIntegrationsByIndustry({ ...integrationsByIndustry, [industry]: integration });
  };

  const addCategories = (category: Category[]) => {
    setCategories(category);
  };

  return (
    <IntegrationsContext.Provider value={{ integrations, addIntegration, integrationsByIndustry, addIntegrationByIndustry, addCategories, categories }}>
      {children}
    </IntegrationsContext.Provider>
  );
};

export const useIntegrations = (): IntegrationsContextType => {
  const context = useContext(IntegrationsContext);
  if (!context) {
    throw new Error('useIntegrations must be used within an IntegrationsProvider');
  }
  return context;
};