import React, { createContext, useContext, useState } from 'react';
import { latestIntegrations } from './appwriteProvider.js'

interface Integration {
  id: number;
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
  integrationDetails?: 
  {
    fullDescription: string;
    pros: string[];
    cons: string[];
    documentations: string;
    useCases: string[];
  };
}

interface IntegrationsContextType {
  integrations: Integration[];
  addIntegration: (integration: Integration) => void;
}




const initialIntegrations: Integration[] = latestIntegrations;

const IntegrationsContext = createContext<IntegrationsContextType | undefined>(undefined);

export const IntegrationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);

  const addIntegration = (integration: Integration) => {
    setIntegrations([...integrations, integration]);
  };

  return (
    <IntegrationsContext.Provider value={{ integrations, addIntegration }}>
      {children}
    </IntegrationsContext.Provider>
  );
};

export const useIntegrations = (): IntegrationsContextType => {
  const context = useContext(IntegrationsContext);
  console.log("here: ", context)
  if (!context) {
    throw new Error('useIntegrations must be used within an IntegrationsProvider');
  }
  return context;
};