import React, { createContext, useContext, useState } from 'react';
import { latestIntegrations, Document } from './appwriteProvider.js'

export type Integration = Document

interface IntegrationsByIndustry {
  [key: string]: Integration[];
}

interface IntegrationsContextType {
  integrations: Integration[];
  addIntegration: (integration: Integration) => void;
  integrationsByIndustry: IntegrationsByIndustry;
  addIntegrationByIndustry: (industry: string, integration: Integration[]) => void;
}

const initialIntegrations: Integration[] = latestIntegrations;

const IntegrationsContext = createContext<IntegrationsContextType | undefined>(undefined);

export const IntegrationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [integrationsByIndustry, setIntegrationsByIndustry] = useState<IntegrationsByIndustry>({});

  const addIntegration = (integration: Integration) => {
    setIntegrations([...integrations, integration]);
  };

  const addIntegrationByIndustry = (industry: string, integration: Integration[]) => {
    setIntegrationsByIndustry({ ...integrationsByIndustry, [industry]: integration });
  };

  return (
    <IntegrationsContext.Provider value={{ integrations, addIntegration, integrationsByIndustry, addIntegrationByIndustry }}>
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